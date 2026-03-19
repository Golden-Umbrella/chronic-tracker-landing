import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM_EMAIL = "waitlist@updates.chronictracker.app";
const REPLY_TO = "hello@chronictracker.app";

export async function POST(req: NextRequest) {
  const { name, email, condition } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  // Check for duplicate email
  const { data: existing } = await supabase
    .from("waitlist")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    return NextResponse.json({ error: "You're already on the list!" }, { status: 409 });
  }

  // Insert into waitlist
  const { error: insertError } = await supabase
    .from("waitlist")
    .insert({ name, email, condition: condition || null });

  if (insertError) {
    console.error("[waitlist] insert error:", insertError);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  // Send confirmation email
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: REPLY_TO,
      to: email,
      subject: "You're on the list 🌿",
      html: confirmationEmail(name),
    });
  } catch (e) {
    console.error("[waitlist] confirmation email error:", e);
    // Non-fatal — still a success if the DB insert worked
  }

  // Schedule 24h follow-up via Resend scheduled send
  try {
    const sendAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: REPLY_TO,
      to: email,
      subject: "Quick question about your experience 🌿",
      html: followUpEmail(name),
      scheduledAt: sendAt.toISOString(),
    });
  } catch (e) {
    console.error("[waitlist] follow-up email error:", e);
    // Non-fatal
  }

  return NextResponse.json({ ok: true });
}

function confirmationEmail(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { background: #faf9f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; color: #1a1a1a; }
    .container { max-width: 560px; margin: 40px auto; padding: 40px 32px; background: #ffffff; border-radius: 12px; }
    h1 { font-size: 22px; font-weight: 700; margin: 0 0 16px; }
    p { font-size: 16px; line-height: 1.6; color: #444; margin: 0 0 16px; }
    .tag { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 24px; }
    .footer { font-size: 13px; color: #999; margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="tag">You're on the list ✓</div>
    <h1>Hi ${name},</h1>
    <p>We've saved your spot. When we're ready to onboard the first users, you'll be among the first we reach out to.</p>
    <p>We're building something we wish existed — a way to finally understand what your body is actually responding to, without the guesswork.</p>
    <p>No spam. No noise. Just a message when it matters.</p>
    <p style="color: #1a1a1a; font-weight: 600;">— The Chronic Tracker team</p>
    <div class="footer">
      You're receiving this because you signed up at chronictracker.app.<br>
      Your health data never leaves your device without your permission. We will never sell it.
    </div>
  </div>
</body>
</html>`;
}

function followUpEmail(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { background: #faf9f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; color: #1a1a1a; }
    .container { max-width: 560px; margin: 40px auto; padding: 40px 32px; background: #ffffff; border-radius: 12px; }
    h1 { font-size: 22px; font-weight: 700; margin: 0 0 16px; }
    p { font-size: 16px; line-height: 1.6; color: #444; margin: 0 0 16px; }
    .question { background: #f5f5f3; border-left: 3px solid #2e7d32; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 20px 0; }
    .question p { margin: 0; color: #1a1a1a; font-weight: 500; }
    .footer { font-size: 13px; color: #999; margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hi ${name} — quick question</h1>
    <p>We're still in early days, and the people on this waitlist are shaping what we build. We'd love to hear from you — just hit reply.</p>

    <div class="question">
      <p>1. What's the hardest part of managing your condition day-to-day — tracking symptoms, figuring out triggers, or something else?</p>
    </div>

    <div class="question">
      <p>2. Have you tried any apps or tools to help track your health? What worked, what didn't?</p>
    </div>

    <p>No pressure, no form. Just reply to this email. We read every response.</p>
    <p style="color: #1a1a1a; font-weight: 600;">— The Chronic Tracker team</p>
    <div class="footer">
      You're receiving this because you signed up at chronictracker.app.<br>
      Your health data never leaves your device without your permission. We will never sell it.
    </div>
  </div>
</body>
</html>`;
}
