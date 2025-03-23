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
        .innerJoin(users, eq(presence.userId, users.id));
    },
  },
};
