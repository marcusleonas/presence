"use server";

import { DB } from "~/server/db/queries";

export async function deleteAction(id: string) {
  await DB.presence.deletePresence(id);
}
