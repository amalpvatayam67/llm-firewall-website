/**
 * GET /api/booking/slots?date=YYYY-MM-DD
 * Returns available time slots for the given date, excluding busy periods
 * from the OWNER's Google Calendar. Visitors need zero authentication.
 */
import { NextRequest, NextResponse } from 'next/server';
import {
  getBusySlots,
  generateSlots,
  filterAvailable,
  MAX_DAYS,
} from '@/lib/googleCalendar';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date format. Expected YYYY-MM-DD.' }, { status: 400 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const requested = new Date(date + 'T00:00:00');
  if (requested < today) {
    return NextResponse.json({ error: 'Cannot book in the past.' }, { status: 400 });
  }

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + MAX_DAYS());
  if (requested > maxDate) {
    return NextResponse.json({ error: `Bookings only available up to ${MAX_DAYS()} days ahead.` }, { status: 400 });
  }

  const allSlots = generateSlots(date);

  try {
    const busy = await getBusySlots(date);
    const available = filterAvailable(allSlots, busy);
    return NextResponse.json({ slots: available });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('GOOGLE_REFRESH_TOKEN')) {
      return NextResponse.json({ slots: allSlots, warning: 'Calendar not connected yet ??? showing all potential slots.' });
    }
    console.error('[booking/slots]', err);
    return NextResponse.json({ slots: allSlots, warning: 'Could not load live availability.' });
  }
}
