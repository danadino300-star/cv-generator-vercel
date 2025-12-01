import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    email: text("email").notNull().unique(),
    cvCount: integer("cv_count").notNull().default(0),
    hasPaid: boolean("has_paid").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const cvs = pgTable("cvs", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: varchar("user_id").notNull().references(() => users.id),
    name: text("name").notNull(),
    role: text("role").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    location: text("location").notNull(),
    summary: text("summary").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
    id: true,
    createdAt: true,
});

export const insertCVSchema = createInsertSchema(cvs).omit({
    id: true,
    createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCV = z.infer<typeof insertCVSchema>;
export type CV = typeof cvs.$inferSelect;
