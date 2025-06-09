import { char, pgTable, varchar } from "drizzle-orm/pg-core";

export const versionsTable = pgTable("versions", {
  id: char({ length: 3 }).primaryKey(),
  en: varchar({ length: 31 }).notNull(),
  kr: varchar({ length: 31 }).notNull(),
});

export type SelectVersion = typeof versionsTable.$inferSelect;
