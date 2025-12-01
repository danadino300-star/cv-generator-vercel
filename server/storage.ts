import { drizzle } from "drizzle-orm/neon-serverless";
import { neonConfig, Pool } from "@neondatabase/serverless";
import ws from "ws";
import { eq } from "drizzle-orm";
import { type User, type InsertUser, type CV, type InsertCV, users, cvs } from "./schema.ts";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool });

export interface IStorage {
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPaymentStatus(email: string, hasPaid: boolean): Promise<void>;
  incrementUserCVCount(email: string): Promise<void>;
  createCV(cv: InsertCV): Promise<CV>;
  getUserCVs(userId: string): Promise<CV[]>;
}

export class DatabaseStorage implements IStorage {
  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUserPaymentStatus(email: string, hasPaid: boolean): Promise<void> {
    await db.update(users).set({ hasPaid }).where(eq(users.email, email));
  }

  async incrementUserCVCount(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (user) {
      await db.update(users).set({ cvCount: user.cvCount + 1 }).where(eq(users.email, email));
    }
  }

  async createCV(insertCV: InsertCV): Promise<CV> {
    const result = await db.insert(cvs).values(insertCV).returning();
    return result[0];
  }

  async getUserCVs(userId: string): Promise<CV[]> {
    return await db.select().from(cvs).where(eq(cvs.userId, userId));
  }
}

export const storage = new DatabaseStorage();
