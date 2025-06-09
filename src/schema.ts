import { char, pgTable, varchar } from "drizzle-orm/pg-core";

export const versions = pgTable("versions", {
  id: char({ length: 3 }).primaryKey(),
  en: varchar({ length: 31 }).notNull(),
  kr: varchar({ length: 31 }).notNull(),
});

export type SelectVersion = typeof versions.$inferSelect;
