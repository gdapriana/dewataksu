import Comments from "@/app/(root)/(client)/_components/comment/comment";
import StoryContent from "@/app/(root)/(client)/stories/[slug]/_components/body/content";
import PopularStoriesSection from "@/app/(root)/(client)/stories/[slug]/_components/body/popular";
import StoryTypography from "@/app/(root)/(client)/stories/[slug]/_components/body/typography";
import StoryHero from "@/app/(root)/(client)/stories/[slug]/_components/hero/hero";
import { auth, Session } from "@/utils/auth";
import { BookmarkServerRequests } from "@/utils/request/bookmark.server.request";
import { CommentRequests } from "@/utils/request/comment.request";
import { LikeServerRequests } from "@/utils/request/like.server.request";
import { StoryRequests } from "@/utils/request/story.request";
import { ViewRequests } from "@/utils/request/view.request";
import { NestedComment, Pagination, StoryRelation } from "@/utils/types";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session: Session | null = await auth.api.getSession({
    headers: await headers(),
  });

  const story: {
    success: boolean;
    result: StoryRelation;
    message: string;
  } = await StoryRequests.GET(slug);

  if (!story) return notFound();
  if (story && !story.success) return notFound();

  const isLiked = await LikeServerRequests.GET("stories", story.result.id);

  const isBookmarked = await BookmarkServerRequests.GET(
    "stories",
    story.result.id
  );

  const comments: {
    success: boolean;
    result: { comments: NestedComment[] };
    message: string;
  } = await CommentRequests.GETs("stories", story.result.id);

  const popularStories: {
    success: boolean;
    result: { stories: StoryRelation[]; pagination: Pagination };
    message: string;
  } = await StoryRequests.GETs(`sortBy=liked&limit=5`);

  if (session) {
    await ViewRequests.POST({
      schema: "stories",
      schemaId: story.result.id,
    });
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col justify-start items-stretch gap-6 max-w-7xl px-4 py-2 md:py-4">
        <div className="flex flex-col justify-start gap-8 items-stretch md:flex-row">
          <div className="md:w-2/3">
            <StoryHero item={story.result} />
            <StoryContent
              item={story.result}
              session={session}
              isBookmarked={isBookmarked.result}
              isLiked={isLiked.result}
            />
            {story.result.content && (
              <StoryTypography body={story.result.content} />
            )}

            <Comments
              comments={comments.result.comments}
              schema="stories"
              schemaId={story.result.id}
              session={session}
            />
          </div>
          <div className="md:w-1/3 flex flex-col justify-start items-stretch gap-8">
            <PopularStoriesSection
              currentStories={story.result}
              items={popularStories.result.stories}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
