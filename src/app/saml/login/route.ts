import { NextResponse } from "next/server";
import { idp, sp } from "../../../lib/saml";
import { promisify } from "util";

export async function GET() {
  const loginUrl = await promisify(sp.create_login_request_url.bind(sp))(
    idp,
    {}
  );
  return NextResponse.redirect(loginUrl);
}
