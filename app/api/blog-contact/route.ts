import { NextResponse } from "next/server";
import { sendForm } from "@/forms";

type BlogContactPayload = {
  full_name: string;
  email: string;
  phone?: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<BlogContactPayload>;

    if (!body) {
      return NextResponse.json({ error: "Missing body" }, { status: 400 });
    }

    const { full_name: fullName, email, phone, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // New webhook endpoint for blog contact form
    const endpoint = process.env.CONTACT_FORM_ENDPOINT_ALTERNATIVE || '';
    const secret = process.env.NS_SHARED_SECRET;
    const siteSlug = "nickspanos.com";

    if (!endpoint || !secret) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const payload: BlogContactPayload = {
      full_name: fullName,
      email,
      phone: phone || "",
      message,
    };

    const response = await sendForm<BlogContactPayload, { ok: true }>(
      payload,
      siteSlug,
      endpoint,
      secret
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Blog contact error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}


