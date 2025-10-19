import { StoryCard } from "@/app/(root)/(client)/_components/card/story";
import { UserServerRequests } from "@/utils/request/user.server.request";
import { StoryRelation } from "@/utils/types";

export default async function Stories({ userId }: { userId?: string }) {
  const stories = await UserServerRequests.GETUserStories(
    new AbortController(),
    userId
  );

  return (
    <div className="grid gap-3 pt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {stories.result.stories &&
        stories.result.stories.length > 0 &&
        stories.result.stories.map((item: StoryRelation) => (
          <StoryCard key={item.id} item={item} />
        ))}
    </div>
  );
}
