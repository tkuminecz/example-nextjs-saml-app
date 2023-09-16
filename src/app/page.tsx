import React from "react";

export default function Page() {
  return (
    <div>
      <h1>Hello world!</h1>
      <ul>
        <li>
          <a href="/saml/login">Login</a>
        </li>
        <li>
          <a href="/saml/logout">Logout</a>
        </li>
      </ul>
    </div>
  );
}
