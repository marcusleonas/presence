import Link from "next/link";
import { Button } from "./ui/button";
import { auth, signOut } from "~/server/auth";

const navLinks: { link: string; content: string }[] = [
  {
    link: "/",
    content: "home",
  },
  {
    link: "/about",
    content: "about",
  },
];

export async function Navbar() {
  const session = await auth();

  return (
    <header className="flex flex-row items-center justify-between py-2">
      <nav className="flex flex-col md:flex-row md:gap-2">
        <Link href="/" className="font-semibold hover:underline">
          fluffy<span className="font-medium italic">presence</span>
        </Link>
        {navLinks.map((link) => (
          <Link href={link.link} key={link.link} className="hover:underline">
            {link.content}
          </Link>
        ))}
        {session && (
          <Link
            href={`/users/${session.user.name}`}
            className="hover:underline"
          >
            me
          </Link>
        )}
      </nav>
      {session && (
        <div>
          <Button
            size="sm"
            onClick={async () => {
              "use server";
              await signOut();
            }}
          >
            Sign Out
          </Button>
        </div>
      )}
    </header>
  );
}
