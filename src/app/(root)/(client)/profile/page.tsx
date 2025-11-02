import Highlight from "@/app/(root)/(client)/profile/_components/highlight/highlight";
import Items from "@/app/(root)/(client)/profile/_components/items/items";
import ProfileItemsSkeleton from "@/components/skeleton/profile-items";
import { auth } from "@/utils/auth";
import { UserServerRequests } from "@/utils/request/user.server.request";
import { UserRelation } from "@/utils/types";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user: { success: boolean; result: UserRelation; message: string } =
    await UserServerRequests.GET(session?.user.id);

  return (
    <div className="flex w-full flex-col justify-start items-stretch">
      <Highlight profile={user.result} />

      <Suspense fallback={<ProfileItemsSkeleton />}>
        <Items userId={session?.user.id} />
      </Suspense>
    </div>
  );
}
