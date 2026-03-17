/**
 * Google Calendar helpers – server-side only.
 *
 * Architecture: The calendar OWNER authenticates once (via /api/booking/setup),
 * their refresh token is stored in GOOGLE_REFRESH_TOKEN env var.
 * Visitors NEVER see any Google screen — they just pick a slot and fill a form.
 */
import { google } from 'googleapis';

// ─── Config helpers ─────────────────────────────────────────────────────────

export function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!,
  );
}

/**
 * Returns an authenticated OAuth client using the owner's stored refresh token.
 * Throws a clear error if GOOGLE_REFRESH_TOKEN is not configured.
 */
export function getOwnerAuth() {
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!refreshToken || refreshToken === 'PASTE_REFRESH_TOKEN_HERE') {
    throw new Error('GOOGLE_REFRESH_TOKEN is not configured. Visit /api/booking/setup to complete one-time owner authentication.');
  }
  const auth = getOAuthClient();
  auth.setCredentials({ refresh_token: refreshToken });
  return auth;
}

export const CALENDAR_ID = () => process.env.GOOGLE_CALENDAR_ID ?? 'primary';
export const TIMEZONE    = () => process.env.BOOKING_TIMEZONE ?? 'UTC';
export const HOUR_START  = () => Number(process.env.BOOKING_HOUR_START ?? 9);
export const HOUR_END    = () => Number(process.env.BOOKING_HOUR_END ?? 18);
export const DURATION    = () => Number(process.env.BOOKING_DEFAULT_DURATION_MINUTES ?? 30);
export const MAX_DAYS    = () => Number(process.env.BOOKING_MAX_DAYS_AHEAD ?? 30);

// ─── Types ──────────────────────────────────────────────────────────────────

export interface BusySlot {
  start: string; // ISO
  end: string;   // ISO
}

export interface TimeSlot {
  start: string; // ISO
  end: string;   // ISO
  label: string; // "09:00 AM"
}

// ─── Busy periods from freebusy API ─────────────────────────────────────────

export async function getBusySlots(
  dateISO: string, // "YYYY-MM-DD"
): Promise<BusySlot[]> {
  const auth = getOwnerAuth();
  const calendar = google.calendar({ version: 'v3', auth });

  const tz   = TIMEZONE();
  const start = new Date(`${dateISO}T00:00:00`);
  const end   = new Date(`${dateISO}T23:59:59`);

  const resp = await calendar.freebusy.query({
    requestBody: {
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      timeZone: tz,
      items: [{ id: CALENDAR_ID() }],
    },
  });

  const busy = resp.data.calendars?.[CALENDAR_ID()]?.busy ?? [];
  return busy
    .filter((b) => b.start && b.end)
    .map((b) => ({ start: b.start!, end: b.end! }));
}

// ─── Generate slots for a given day ─────────────────────────────────────────

export function generateSlots(dateISO: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const dur  = DURATION();
  const hStart = HOUR_START();
  const hEnd   = HOUR_END();

  let cursor = new Date(`${dateISO}T${String(hStart).padStart(2, '0')}:00:00`);
  const dayEnd = new Date(`${dateISO}T${String(hEnd).padStart(2, '0')}:00:00`);

  while (cursor < dayEnd) {
    const slotEnd = new Date(cursor.getTime() + dur * 60_000);
    if (slotEnd > dayEnd) break;

    const fmt = (d: Date) =>
      d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: TIMEZONE(),
      });

    slots.push({
      start: cursor.toISOString(),
      end: slotEnd.toISOString(),
      label: fmt(cursor),
    });
    cursor = slotEnd;
  }
  return slots;
}

// ─── Filter out busy slots ───────────────────────────────────────────────────

export function filterAvailable(slots: TimeSlot[], busy: BusySlot[]): TimeSlot[] {
  return slots.filter((slot) => {
    const s = new Date(slot.start).getTime();
    const e = new Date(slot.end).getTime();
    return !busy.some((b) => {
      const bs = new Date(b.start).getTime();
      const be = new Date(b.end).getTime();
      return s < be && e > bs; // overlap check
    });
  });
}

// ─── Create calendar event ───────────────────────────────────────────────────

export interface BookingPayload {
  summary: string;
  description?: string;
  attendeeEmail: string;
  attendeeName: string;
  start: string; // ISO
  end: string;   // ISO
}

export async function createCalendarEvent(payload: BookingPayload) {
  const auth = getOwnerAuth();
  const calendar = google.calendar({ version: 'v3', auth });

  const event = await calendar.events.insert({
    calendarId: CALENDAR_ID(),
    sendUpdates: 'all',
    requestBody: {
      summary: payload.summary,
      description: payload.description,
      start: { dateTime: payload.start, timeZone: TIMEZONE() },
      end:   { dateTime: payload.end,   timeZone: TIMEZONE() },
      attendees: [
        { email: payload.attendeeEmail, displayName: payload.attendeeName },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email',  minutes: 24 * 60 },
          { method: 'popup',  minutes: 10 },
        ],
      },
      conferenceData: undefined, // can enable Meet here in future
    },
  });

  return event.data;
}
