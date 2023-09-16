import querystring from "node:querystring";
import { promisify } from "node:util";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { idp, sp } from "../../../lib/saml";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const parsed = querystring.parse(body);

  const response = await promisify(sp.post_assert.bind(sp))(idp, {
    allow_unencrypted_assertion: true,
    request_body: parsed,
  });

  const attributes = response.user.attributes;

  // create a session or handle app-specific user logic
  console.log("->response", response);

  const redirectUrl = `https://3000-${process.env.HOSTNAME}.${process.env.GITPOD_WORKSPACE_CLUSTER_HOST}`;

  const res = new NextResponse(undefined, {
    status: 302,
    headers: { location: redirectUrl },
  });

  const cookieData = JSON.stringify({
    name_id: response.user.name_id,
    session_index: response.user.session_index,
  });

  res.cookies.set(process.env.SAML_COOKIE_NAME, cookieData, {
    expires: dayjs().add(1, "day").toDate(),
  });

  return res;
}
