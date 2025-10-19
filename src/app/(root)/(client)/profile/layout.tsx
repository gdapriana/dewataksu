import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");
  return (
    <main className="w-full">
      <div className="w-full relative flex justify-center items-center">
        <div className="w-full flex flex-col justify-start items-stretch gap-6 max-w-7xl px-4 py-2 md:py-4">
          {children}
        </div>
      </div>
    </main>
  );
}
