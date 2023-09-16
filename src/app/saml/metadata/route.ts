import { NextResponse } from "next/server";
import { sp } from "../../../lib/saml";

export async function GET() {
  const metadata = sp.create_metadata();
  return new NextResponse(metadata, {
    headers: { "content-type": "application/xml" },
  });
}
