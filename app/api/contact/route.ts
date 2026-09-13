import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "tarynfukuji@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { name: 200, email: 254, msg: 5000 };

export async function POST(req: Request) {
  let body: { name?: string; email?: string; msg?: string; honeypot?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const msg = (body.msg ?? "").trim();
  const honeypot = (body.honeypot ?? "").trim();

  // Bots fill hidden fields; pretend success so they don't learn to skip it.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !msg) {
    return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }
  if (name.length > MAX_LEN.name || email.length > MAX_LEN.email || msg.length > MAX_LEN.msg) {
    return NextResponse.json({ ok: false, error: "One of the fields is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json({ ok: false, error: "Email is not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Typewriter Contact <contact@tarynfukuji.com>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `New letter from ${name}`,
      text: `From: ${name} <${email}>\n\n${msg}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send message." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending email:", err);
    return NextResponse.json({ ok: false, error: "Failed to send message." }, { status: 500 });
  }
}
