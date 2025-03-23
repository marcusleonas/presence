import { DB } from "~/server/db/queries";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  const user = await DB.user.getUserFromName(name);
  if (!user) {
    return Response.json(
      { success: false, message: "User Not Found" },
      {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
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
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  return Response.json(
    {
      success: true,
      presence: presence?.content,
      lastUpdated: presence.createdAt,
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
