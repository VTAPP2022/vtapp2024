import {
  mysqlTable,
  bigint,
  uniqueIndex,
  datetime,
  varchar,
  boolean,
  index,
  int,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const qrcodes = mysqlTable(
  "qrcodes",
  {
    id: varchar("id", { length: 24 })
      .primaryKey()
      .$defaultFn(() => createId()),
    applicantEmail: varchar("applicant_email", { length: 255 }).notNull(),
    applicantName: varchar("applicant_name", { length: 255 }).notNull(),
    applicantPhoneNo: bigint("applicant_phone_no", {
      mode: "number",
    }).notNull(),
    applicationNo: varchar("application_no", { length: 30 }).notNull(),
    dateOfBirth: varchar("date_of_birth", { length: 10 }).notNull(),
    eventId: int("event_id").notNull(),
    qrcodeExpired: boolean("qrcode_expired").notNull().default(false),
    scannedBy: varchar("scanned_by", { length: 255 }),
    scannedAt: datetime("scanned_at"),
    createdAt: datetime("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: datetime("updated_at")
      .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      appNoAndDateOfBirthIndex: index("appno_dob_index").on(
        table.applicationNo,
        table.dateOfBirth
      ),
      idAndeventIdIndex: index("id_event_index").on(table.id, table.eventId),
      appNoEventIndex: uniqueIndex("appno_event_index").on(
        table.applicationNo,
        table.eventId
      ),
    };
  }
);
