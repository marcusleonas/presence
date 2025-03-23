import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { UpdatePresence } from "~/components/update-presence";
import { DB } from "~/server/db/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const latestUpdates = await DB.presence.getLatestWithUsers();

  return (
    <div className="flex flex-col gap-2">
      <UpdatePresence />
      <section>
        <h2 className="text-xl font-semibold">latest updates</h2>
        <ul className="flex flex-col gap-2 pt-2">
          {latestUpdates.map((presence) => (
            <li key={presence.presence.id}>
              <p>{presence.presence.content}</p>
              <div className="flex flex-row gap-1 text-sm">
                <Link
                  href={`/users/${presence.user.name}`}
                  className="hover:underline"
                >
                  {presence.user.name}
                </Link>
                <p>&bull;</p>
                <p>
                  {formatDistanceToNow(new Date(presence.presence.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </li>
          ))}

          {latestUpdates.length <= 0 && <p>no presences found.</p>}
        </ul>
      </section>
    </div>
  );
}
