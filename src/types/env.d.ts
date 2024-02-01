declare namespace NodeJS {
  interface ProcessEnv {
    AIRTABLE_BASE_URL: string;
    AIRTABLE_BASE_ID: string;
    AIRTABLE_PERSONAL_ACCESS_TOKEN: string;
    DATABASE_HOST: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    EVENTS_ADMIN_API_KEY: string;
    CLOUDFLARE_TURNSTILE_SECRET: string;
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEKEY: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_SECRET: string;
  }
}
