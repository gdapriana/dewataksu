import { StoryCard } from "@/app/(root)/(client)/_components/card/story";
import Empty from "@/app/(root)/(client)/_components/empty/item";
import { UserServerRequests } from "@/utils/request/user.server.request";
import { StoryRelation } from "@/utils/types";
import { Palmtree } from "lucide-react";

export default async function Stories({ userId }: { userId?: string }) {
  const stories = await UserServerRequests.GETUserStories(
    new AbortController(),
    userId
  );

  if (
    stories &&
    stories.result.stories &&
    stories.result.stories.length === 0
  ) {
    return (
      <div className="w-full mt-8 flex justify-center items-center">
        <Empty Icon={Palmtree} item="Story" className="h-[400px]" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 gap-y-8 pt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {stories &&
        stories.result.stories &&
        stories.result.stories.length > 0 &&
        stories.result.stories.map((item: StoryRelation) => (
          <StoryCard userId={userId} key={item.id} item={item} />
        ))}
    </div>
  );
}
