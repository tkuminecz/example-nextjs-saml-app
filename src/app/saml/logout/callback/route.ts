import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();

  // redirect to main app page
  return new NextResponse(undefined, {
    status: 302,
    headers: {
      location: "",
    },
  });
}
