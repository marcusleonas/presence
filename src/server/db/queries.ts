import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { presence, users } from "./schema";

export const DB = {
  presence: {
    getLatestWithUsers: async () => {
      // return await db.query.presence.findMany({
      //   orderBy: (presences, { asc }) => [asc(presences.createdAt)],
      // });
      return await db
        .select()
        .from(presence)
        .orderBy(desc(presence.createdAt))
        .innerJoin(users, eq(presence.userId, users.id))
        .limit(15);
    },
    getUserPresences: async (userId: string) => {
      return await db
        .select()
        .from(presence)
        .where(eq(presence.userId, userId))
        .orderBy(desc(presence.createdAt));
    },
    deletePresence: async (id: string) => {
      await db.delete(presence).where(eq(presence.id, id));
    },
    getUsersLatestPresence: async (id: string) => {
      return await db
        .select()
        .from(presence)
        .where(eq(presence.userId, id))
        .orderBy(desc(presence.createdAt))
        .limit(1);
    },
  },
  user: {
    getUserFromName: async (name: string) => {
      return await db.query.users.findFirst({
        where: (t, { eq }) => eq(t.name, name),
      });
    },
  },
};
