import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { idp, sp } from "../../../lib/saml";
import { promisify } from "util";

/**
 * Handles the case where user initiates a logout
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  const session = JSON.parse(
    req.cookies.get(process.env.SAML_COOKIE_NAME).value
  );
  const logoutUrl = await promisify(sp.create_logout_request_url.bind(sp))(
    idp,
    {
      allow_unencrypted_assertion: true,
      name_id: session.name_id,
      session_index: session.session_index,
      relay_state: `relay_${uuid()}`,
    }
  );
  return NextResponse.redirect(logoutUrl);
}
