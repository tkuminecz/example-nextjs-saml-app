import zlib from "zlib";
import { NextRequest, NextResponse } from "next/server";
import { idp, sp } from "../../../../lib/saml";
import { promisify } from "util";

/**
 * IdP-initiated logout flow
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  console.log("->idp logout", Array.from(req.headers.entries()), req.url);
  const params = new URL(req.url).searchParams;

  const samlResponse = (
    await promisify(zlib.inflateRaw.bind(zlib))(
      Buffer.from(params.get("SAMLResponse"), "base64")
    )
  ).toString();

  console.log("->saml response", samlResponse);

  const relayState = params.get("RelayState");
  const responseUrl = await promisify(sp.create_logout_response_url.bind(sp))(
    idp,
    {
      // in_response_to: requestId,
      relay_state: relayState,
    }
  );
  // here we could actually log the user out on our end
  console.log("->responseUrl", responseUrl);
  return NextResponse.redirect(responseUrl);
}
