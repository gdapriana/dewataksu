import { ReactNode } from "react";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");
  if (session.user.role !== "ADMIN") return redirect("/");
  return <main>{children}</main>;
}
