"use server";

import type { z } from "zod";
import type { formSchema } from ".";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { presence } from "~/server/db/schema";

export async function updatePresence(values: z.infer<typeof formSchema>) {
  try {
    const session = await auth();

    if (!session)
      return {
        success: false,
        message: "Unauthorised",
      };

    const res = await fetch("https://vector.profanity.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: values.content }),
    });
    const json: { isProfanity: boolean; score: number } = await res.json();

    if (json.isProfanity === true) {
      return {
        success: false,
        message: "Contains profanity.",
      };
    }

    await db.insert(presence).values({
      content: values.content,
      userId: session.user.id,
    });

    return {
      success: true,
      message: "Updated presence successfully!",
    };
  } catch (error) {
    console.log("[UPDATE]:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
