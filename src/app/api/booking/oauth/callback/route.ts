/**
 * GET /api/booking/oauth/callback
 * Used ONLY by the owner one-time setup flow (/api/booking/setup?key=…).
 * Extracts the setup key from the `state` param and forwards the code back
 * to the setup handler — so the key never has to appear in the redirect URI.
 */
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code  = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state') ?? '';

  // Decode state = base64url(hmac:setupKey)
  let setupKey = '';
  try {
    const decoded = Buffer.from(state, 'base64url').toString('utf-8');
    // format: "<hmac>:<setupKey>"
    const colonIdx = decoded.indexOf(':');
    if (colonIdx !== -1) setupKey = decoded.slice(colonIdx + 1);
  } catch {
    // malformed state — key stays empty, setup route will return 404
  }

  const keyParam = setupKey ? `&key=${encodeURIComponent(setupKey)}` : '';

  if (error || !code) {
    return NextResponse.redirect(
      new URL(`/api/booking/setup?error=${error ?? 'no_code'}${keyParam}`, req.url),
    );
  }

  // Forward the code + key to the setup handler which shows the refresh token
  return NextResponse.redirect(
    new URL(`/api/booking/setup?code=${encodeURIComponent(code)}${keyParam}`, req.url),
  );
}
