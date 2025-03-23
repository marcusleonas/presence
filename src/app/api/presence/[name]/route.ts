import { formatDistanceToNow } from "date-fns";
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
        author: name,
        date: Date.now(),
        prettyDate: formatDistanceToNow(Date.now()),
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
      author: name,
      date: presence.createdAt,
      prettyDate: formatDistanceToNow(presence.createdAt),
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
