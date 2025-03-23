import { DB } from "~/server/db/queries";

export async function GET(
  req: Request,
  { params }: { params: { name: string } },
) {
  const user = await DB.user.getUserFromName(params.name);
  if (!user) {
    return Response.json(
      { success: false, message: "User Not Found" },
      { status: 404 },
    );
  }

  const [presence] = await DB.presence.getUsersLatestPresence(user.id);

  if (!presence) {
    return Response.json(
      {
        success: true,
        presence: "No presence set",
        lastUpdated: Date.now(),
      },
      { status: 200 },
    );
  }

  return Response.json(
    {
      success: true,
      presence: presence?.content,
      lastUpdated: presence.createdAt,
    },
    { status: 200 },
  );
}
