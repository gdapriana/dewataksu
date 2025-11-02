import { auth } from "@/utils/auth";
import { UserServerRequests } from "@/utils/request/user.server.request";
import { UserRelation } from "@/utils/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");

  const user: { success: boolean; result: UserRelation; message: string } =
    await UserServerRequests.GET(session?.user.id);
  return <div>Hello</div>;
}
