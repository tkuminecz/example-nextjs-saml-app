import { readFileSync } from "node:fs";
import { IdentityProvider, ServiceProvider } from "saml2-js";

const privateKey = readFileSync(process.env.SAML_SP_PRIVATE_KEY_PATH).toString(
  "utf-8"
);
const certificate = readFileSync(process.env.SAML_SP_CERT_PATH).toString(
  "utf-8"
);

// console.log("->private key", privateKey);
// console.log("->certificate", certificate);

export const sp = new ServiceProvider({
  entity_id: process.env.SAML_SP_ENTITY_ID,
  private_key: privateKey,
  certificate,
  assert_endpoint: process.env.SAML_SP_ASSERT_ENDPOINT,
});

export const idp = new IdentityProvider({
  sso_login_url:
    "https://8080-tkuminecz-examplenextjs-swr5rxjopru.ws-us104.gitpod.io/simplesaml/saml2/idp/SSOService.php",
  sso_logout_url:
    "https://8080-tkuminecz-examplenextjs-swr5rxjopru.ws-us104.gitpod.io/simplesaml/saml2/idp/SingleLogoutService.php",
  certificates: [
    `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJALmVVuDWu4NYMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTYxMjMxMTQzNDQ3WhcNNDgwNjI1MTQzNDQ3WjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEAzUCFozgNb1h1M0jzNRSCjhOBnR+uVbVpaWfXYIR+AhWDdEe5ryY+Cgav
Og8bfLybyzFdehlYdDRgkedEB/GjG8aJw06l0qF4jDOAw0kEygWCu2mcH7XOxRt+
YAH3TVHa/Hu1W3WjzkobqqqLQ8gkKWWM27fOgAZ6GieaJBN6VBSMMcPey3HWLBmc
+TYJmv1dbaO2jHhKh8pfKw0W12VM8P1PIO8gv4Phu/uuJYieBWKixBEyy0lHjyix
YFCR12xdh4CA47q958ZRGnnDUGFVE1QhgRacJCOZ9bd5t9mr8KLaVBYTCJo5ERE8
jymab5dPqe5qKfJsCZiqWglbjUo9twIDAQABo1AwTjAdBgNVHQ4EFgQUxpuwcs/C
YQOyui+r1G+3KxBNhxkwHwYDVR0jBBgwFoAUxpuwcs/CYQOyui+r1G+3KxBNhxkw
DAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAAiWUKs/2x/viNCKi3Y6b
lEuCtAGhzOOZ9EjrvJ8+COH3Rag3tVBWrcBZ3/uhhPq5gy9lqw4OkvEws99/5jFs
X1FJ6MKBgqfuy7yh5s1YfM0ANHYczMmYpZeAcQf2CGAaVfwTTfSlzNLsF2lW/ly7
yapFzlYSJLGoVE+OHEu8g5SlNACUEfkXw+5Eghh+KzlIN7R6Q7r2ixWNFBC/jWf7
NKUfJyX8qIG5md1YUeT6GBW9Bm2/1/RiO24JTaYlfLdKK9TYb8sG5B+OLab2DImG
99CJ25RkAcSobWNF5zD0O6lgOo3cEdB/ksCq3hmtlC/DlLZ/D8CJ+7VuZnS1rR2n
aQ==
-----END CERTIFICATE-----`,
  ],
});
