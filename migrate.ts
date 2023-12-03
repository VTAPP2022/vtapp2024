import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import * as schema from "./src/db/schema";

dotenv.config({
  path: ".env.local",
});

async function main() {
  console.log("Running migrations...");

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    multipleStatements: true,
    ssl: {
      rejectUnauthorized: true,
    },
  });

  const db = drizzle(connection, { schema, mode: "planetscale" });

  await migrate(db, { migrationsFolder: "./drizzle/migrations" });

  await connection.end();
}

main()
  .then(() => console.log("Done!"))
  .catch(console.error);
