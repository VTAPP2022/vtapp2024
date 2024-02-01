import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

export const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const connection = connect(config);

export const db = drizzle(connection);
export type DbClient = typeof db;

export * from "./schema";
