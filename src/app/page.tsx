import Link from "next/link";
import { Button } from "~/components/ui/button";
import { auth, signIn } from "~/server/auth";
import { DB } from "~/server/db/queries";

export default async function HomePage() {
  const latestUpdates = await DB.presence.getLatestWithUsers();

  return (
    <main className="flex flex-col gap-2">
      <p>signed in</p>
      <section>
        <h2 className="text-xl font-semibold">latest updates</h2>
        <ul className="flex flex-col gap-2">
          {latestUpdates.map((presence) => (
            <li>
              <p>{presence.presence.content}</p>
              <p>{presence.user.name}</p>
            </li>
          ))}

          {latestUpdates.length >= 0 && <p>no presences found.</p>}
        </ul>
      </section>
    </main>
  );
}
