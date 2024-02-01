# VTAPP - [Live Demo](https://vtapp.pages.dev)

VTAPP is a user-friendly web platform developed for the technical fest at our college, designed to deliver a dynamic and efficient user experience using React, Tailwind CSS, and Firebase. The platform features an integrated ticketing system with QR scanning capabilities, ensuring streamlined event entry and management.

## Features

- Dynamic, responsive user interface
- Powered by TypeScript, NextJS, Tailwind CSS, MYSQL and Airtable
- Integrated ticketing system
- QR scanning capabilities for efficient event management

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js v18.17+ and pnpm (it is recommended to use nvm)

### Install requirements

```bash
❯ pnpm install
```

### Setup env variables

- Create a `.env.local` file in root of the project. Check out [.env.example](./.env.example) to know what values are required.

### Run in dev mode

```bash
❯ pnpm dev

> vtapp@0.1.0 dev /Projects/vtapp
> next dev

   ▲ Next.js 14.0.3
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 5.4s
```

### (Optional) Generate SQL migrations

```bash
❯ pnpm migration:generate

> vtapp@0.1.0 migration:generate /Projects/vtapp
> drizzle-kit generate:mysql

drizzle-kit: v0.20.6
drizzle-orm: v0.29.1

No config path provided, using default 'drizzle.config.ts'
Reading config file '/Projects/vtapp/drizzle.config.ts'
Reading schema files:
/Projects/vtapp/src/db/schema.ts

1 tables
qrcodes 10 columns 2 indexes 0 fks

No schema changes, nothing to migrate 😴
```

### (Optional) Apply SQL migrations

```bash
❯ pnpm migration:run
```

### Build for production

```bash
❯ pnpm build
```

### Build to deploy on cf-pages

```bash
❯ pnpx @cloudflare/next-on-pages@1
```

## Built With

- [TypeScript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MySQL/Planetscale](https://planetscale.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Airtable](https://airtable.com/)

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to improve the project.
