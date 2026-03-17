/**
 * POST /api/booking/create
 * Creates a Google Calendar event on the OWNER's calendar.
 * Visitors provide their name/email ??? no Google login required from them.
 */
import { NextRequest, NextResponse } from 'next/server';
import {
  createCalendarEvent,
  getBusySlots,
  filterAvailable,
  generateSlots,
} from '@/lib/googleCalendar';

interface BookingBody {
  name: string;
  email: string;
  company?: string;
  message?: string;
  start: string;
  end: string;
  date: string;
}

export async function POST(req: NextRequest) {
  let body: BookingBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, company, message, start, end, date } = body;

  if (!name?.trim() || !email?.trim() || !start || !end || !date) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  // Conflict check
  try {
    const busy = await getBusySlots(date);
    const available = filterAvailable(generateSlots(date), busy);
    const isStillAvailable = available.some((s) => s.start === start && s.end === end);
    if (!isStillAvailable) {
      return NextResponse.json(
        { error: 'This time slot is no longer available. Please choose another.' },
        { status: 409 },
      );
    }
  } catch {
    // Non-fatal ??? proceed even if conflict check fails
  }

  // Create event
  try {
    const descParts: string[] = [];
    if (company?.trim()) descParts.push(`Company: ${company.trim()}`);
    if (message?.trim()) descParts.push(`\nNotes:\n${message.trim()}`);
    descParts.push('\n\nBooked via LaroGuard website.');

    const event = await createCalendarEvent({
      summary: `Demo with ${name.trim()} ??? LaroGuard`,
      description: descParts.join('\n'),
      attendeeEmail: email.trim(),
      attendeeName: name.trim(),
      start,
      end,
    });

    return NextResponse.json({ success: true, eventId: event.id, htmlLink: event.htmlLink, summary: event.summary });
  } catch (err: unknown) {
    console.error('[booking/create]', err);
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('GOOGLE_REFRESH_TOKEN')) {
      return NextResponse.json({ error: 'Booking system not configured. Please contact us directly.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to create the booking. Please try again.' }, { status: 500 });
  }
}
