"use client";

import { Turnstile } from "@marsidev/react-turnstile";

export default function Captcha() {
  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEKEY}
      options={{ theme: "dark" }}
    />
  );
}
