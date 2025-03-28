import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Navbar } from "~/components/navbar";
import { auth, signIn } from "~/server/auth";
import { Button } from "~/components/ui/button";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "FluffyPresence",
  description: "FluffyPresence",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="px-2 py-2 md:mx-auto md:max-w-2xl">
        <Navbar />
        <main>
          {session ? (
            <>{children}</>
          ) : (
            <main className="flex flex-col items-center justify-center gap-2 py-40">
              <h1 className="text-4xl font-semibold">FluffyPresence</h1>
              <Button
                onClick={async () => {
                  "use server";
                  await signIn("discord");
                }}
              >
                Sign in with Discord
              </Button>
            </main>
          )}
        </main>

        <Toaster />
      </body>
    </html>
  );
}
