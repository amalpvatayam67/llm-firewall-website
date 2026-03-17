/**
 * /api/booking/auth-url is no longer used by visitors.
 * Owner setup is handled via /api/booking/setup instead.
 */
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Use /api/booking/setup for owner authentication.' }, { status: 410 });
}
