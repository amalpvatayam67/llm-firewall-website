/**
 * GET /api/booking/setup?key=<BOOKING_SETUP_KEY>
 *
 * ONE-TIME owner authentication route.
 * Only YOU (the site owner) visit this URL once to authorise the app.
 * After that, the refresh token is stored in .env.local and visitors
 * never see any Google screen.
 *
 * SECURITY: Requires ?key=<BOOKING_SETUP_KEY> in every request.
 * Without it the route returns 404 — as if it doesn't exist.
 * Set BOOKING_SETUP_KEY to a long random secret in .env.local.
 * Generate one with: openssl rand -hex 32
 */
import { NextRequest, NextResponse } from 'next/server';
import { getOAuthClient } from '@/lib/googleCalendar';
import crypto from 'crypto';

const SETUP_SECRET = () => process.env.BOOKING_STATE_SECRET ?? 'dev_secret';
const SETUP_KEY    = () => process.env.BOOKING_SETUP_KEY ?? '';

/** Return 404 so scanners learn nothing about this route. */
function notFound() {
  return new NextResponse(null, { status: 404 });
}

export async function GET(req: NextRequest) {
  // ── Guard: must supply the correct setup key ──────────────────────────────
  const setupKey = SETUP_KEY();
  if (!setupKey) {
    // Key not configured at all → block until owner adds it
    return new NextResponse(
      'BOOKING_SETUP_KEY is not set in .env.local. Add it before using this route.',
      { status: 503, headers: { 'Content-Type': 'text/plain' } },
    );
  }

  const { searchParams } = new URL(req.url);
  const providedKey = searchParams.get('key') ?? '';

  // Constant-time comparison to prevent timing attacks
  const expected = Buffer.from(setupKey);
  const provided = Buffer.from(providedKey);
  const keysMatch =
    expected.length === provided.length &&
    crypto.timingSafeEqual(expected, provided);

  if (!keysMatch) return notFound();

  const code  = searchParams.get('code');

  // ── Step 2: Exchange code for tokens (callback from Google) ──────────────
  if (code) {
    try {
      const oAuth2 = getOAuthClient();
      const { tokens } = await oAuth2.getToken(code);

      const refreshToken = tokens.refresh_token;
      if (!refreshToken) {
        return new NextResponse(html(`
          <h2 style="color:#ef4444">⚠️ No refresh token returned</h2>
          <p>This usually means the app was already authorised without <code>prompt=consent</code>.</p>
          <p>Go to <a href="https://myaccount.google.com/permissions" target="_blank">Google Account Permissions</a>,
          revoke access for <strong>webapplication</strong>, then visit
          <a href="/api/booking/setup?key=${providedKey}">/api/booking/setup?key=…</a> again.</p>
        `), { headers: { 'Content-Type': 'text/html' } });
      }

      return new NextResponse(html(`
        <h2 style="color:#10b981">✅ Success! Copy your refresh token below</h2>
        <p>Add this line to your <strong>.env.local</strong> file, then <strong>restart the dev server</strong>:</p>
        <pre style="background:#1a1a1a;padding:16px;border-radius:8px;overflow-x:auto;font-size:13px;border:1px solid #333">GOOGLE_REFRESH_TOKEN=${refreshToken}</pre>
        <p style="color:#888;font-size:13px">Keep this token secret. Once added to .env.local you will never need to visit this page again.</p>
        <hr style="border-color:#333;margin:24px 0"/>
        <p style="color:#666;font-size:12px">You can delete the <code>/api/booking/setup</code> route after completing setup.</p>
      `), { headers: { 'Content-Type': 'text/html' } });
    } catch (err) {
      console.error('[booking/setup] token exchange failed', err);
      return new NextResponse(html(`
        <h2 style="color:#ef4444">❌ Token exchange failed</h2>
        <pre>${String(err)}</pre>
        <a href="/api/booking/setup?key=${providedKey}">Try again</a>
      `), { status: 500, headers: { 'Content-Type': 'text/html' } });
    }
  }

  // ── Step 1: Redirect to Google consent screen ────────────────────────────
  const nonce = crypto.randomBytes(16).toString('hex');
  // Embed the setup key inside state so the callback can reconstruct the
  // redirect back to /api/booking/setup?key=… without exposing it in the URL.
  const hmac  = crypto.createHmac('sha256', SETUP_SECRET()).update(nonce).digest('hex');
  // state = base64(hmac + ':' + setupKey)  — decoded only server-side in callback
  const state = Buffer.from(`${hmac}:${providedKey}`).toString('base64url');

  const oAuth2 = getOAuthClient();
  const url = oAuth2.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar.events',
      'https://www.googleapis.com/auth/calendar.readonly',
    ],
    prompt: 'consent',
    state,
  });

  return NextResponse.redirect(url);
}

// ─── Minimal HTML shell ───────────────────────────────────────────────────────
function html(body: string) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>LaroGuard – Calendar Setup</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0a0a0a; color: #ededed;
           max-width: 720px; margin: 80px auto; padding: 0 24px; line-height: 1.6; }
    a { color: #10b981; }
    code, pre { font-family: monospace; }
  </style>
</head>
<body>
  <h1 style="color:#10b981">LaroGuard · Calendar Setup</h1>
  ${body}
</body>
</html>`;
}
