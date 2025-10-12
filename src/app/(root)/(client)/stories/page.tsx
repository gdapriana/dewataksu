import PageHero from "@/app/(root)/(client)/_components/pages/hero/hero";
import StoryItems from "@/app/(root)/(client)/stories/_components/items/items";
import { StoryRequests } from "@/utils/request/story.request";
import { Pagination, StoryRelation } from "@/utils/types";

export default async function Page() {
  const mostViewedStories: {
    success: boolean;
    result: { stories: StoryRelation[]; pagination: Pagination };
    message: string;
  } = await StoryRequests.GETs("sortBy=viewed&limit=4");

  return (
    <main className="flex flex-col justify-start items-stretch">
      <PageHero
        schema="stories"
        text={{
          title: "Stories",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod odio minus quo unde nostrum hic molestiae facere aperiam",
        }}
        items={{ stories: mostViewedStories.result.stories }}
      />

      <StoryItems />
    </main>
  );
}
