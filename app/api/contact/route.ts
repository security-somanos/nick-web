import { NextResponse } from "next/server";
import { sendForm } from "@/forms";

type ContactPayload = {
  fullName: string;
  company?: string;
  email: string;
  phoneOrHandle?: string;
  proposalType: string;
  subject: string;
  message: string;
  relevantLinks?: string[];
  metBefore?: "yes" | "no";
  consentConfirmed: boolean;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;

    if (!body) {
      return NextResponse.json({ error: "Missing body" }, { status: 400 });
    }

    const {
      fullName,
      company,
      email,
      phoneOrHandle,
      proposalType,
      subject,
      message,
      relevantLinks,
      metBefore,
      consentConfirmed
    } = body;

    if (!fullName || !email || !proposalType || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!consentConfirmed) {
      return NextResponse.json({ error: "Consent not confirmed" }, { status: 400 });
    }

    const endpoint = process.env.CONTACT_FORM_ENDPOINT;
    const secret = process.env.NS_SHARED_SECRET;
    const siteSlug = "nickspanos.com";

    if (!endpoint || !secret) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const payload: ContactPayload = {
      fullName,
      company: company || "",
      email,
      phoneOrHandle: phoneOrHandle || "",
      proposalType,
      subject,
      message,
      relevantLinks: (relevantLinks || []).filter(Boolean),
      metBefore: metBefore === "yes" ? "yes" : "no",
      consentConfirmed: Boolean(consentConfirmed)
    };

    console.log(endpoint)

    const response = await sendForm<ContactPayload, { ok: true }>(
      payload,
      siteSlug,
      endpoint,
      secret
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}


