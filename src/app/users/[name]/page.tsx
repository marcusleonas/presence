import { formatDistanceToNow } from "date-fns";
import { notFound } from "next/navigation";
import { auth } from "~/server/auth";
import { DB } from "~/server/db/queries";
import { Info } from "lucide-react";
import { DeleteButton } from "~/components/delete-button";
import { UpdatePresence } from "~/components/update-presence";
import { Input } from "~/components/ui/input";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const session = await auth();
  const user = await DB.user.getUserFromName(name);

  if (!user) {
    return notFound();
  }

  const canEdit = session?.user.name === name;

  const presences = await DB.presence.getUserPresences(user.id);

  return (
    <div>
      {canEdit && (
        <div className="mb-4 flex w-full flex-row items-center gap-2 rounded-lg bg-blue-500/20 px-4 py-2">
          <Info size={16} />
          This is your profile
        </div>
      )}

      <h1 className="text-2xl font-semibold">{user.name}</h1>

      {canEdit && (
        <>
          <h2 className="py-2 text-lg font-semibold">api url</h2>
          <a
            href="https://codepen.io/flvffywvffy/pen/ogNyWVg"
            target="_blank"
            className="text-sm hover:underline"
          >
            view how to implement this on your website here
          </a>
          <Input
            readOnly
            value={`https://presence.flvffy.top/api/presence/${user.name}`}
          />

          <h2 className="py-2 text-lg font-semibold">update presence</h2>
          <UpdatePresence />
        </>
      )}

      <h2 className="pt-4 text-lg font-semibold">all updates</h2>
      <ul className="flex flex-col gap-2 pt-2">
        {presences.map((presence) => (
          <li key={presence.id}>
            <p>{presence.content}</p>
            <div className="flex flex-row gap-1 text-sm">
              <p>
                {formatDistanceToNow(new Date(presence.createdAt), {
                  addSuffix: true,
                })}
              </p>
              {canEdit && (
                <>
                  <p>&bull;</p>
                  <DeleteButton id={presence.id} />
                </>
              )}
            </div>
          </li>
        ))}

        {presences.length <= 0 && <p>no presences found.</p>}
      </ul>
    </div>
  );
}
