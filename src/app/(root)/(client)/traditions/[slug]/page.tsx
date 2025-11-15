import Comments from "@/app/(root)/(client)/_components/comment/comment";
import TraditionContent from "@/app/(root)/(client)/traditions/[slug]/_components/body/content";
import PopularTraditionsSection from "@/app/(root)/(client)/traditions/[slug]/_components/body/popular";
import TraditionTypography from "@/app/(root)/(client)/traditions/[slug]/_components/body/typography";
import TraditionHero from "@/app/(root)/(client)/traditions/[slug]/_components/hero/hero";
import { auth, Session } from "@/utils/auth";
import { BookmarkServerRequests } from "@/utils/request/bookmark.server.request";
import { CommentRequests } from "@/utils/request/comment.request";
import { LikeServerRequests } from "@/utils/request/like.server.request";
import { TraditionRequests } from "@/utils/request/tradition.request";
import { ViewRequests } from "@/utils/request/view.request";
import { NestedComment, Pagination, TraditionRelation } from "@/utils/types";
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

  const tradition: {
    success: boolean;
    result: TraditionRelation;
    message: string;
  } = await TraditionRequests.GETSlug(slug);

  if (!tradition) return notFound();
  if (tradition && !tradition.success) return notFound();

  const isLiked = await LikeServerRequests.GET(
    "traditions",
    tradition.result.id
  );

  const isBookmarked = await BookmarkServerRequests.GET(
    "traditions",
    tradition.result.id
  );

  const comments: {
    success: boolean;
    result: { comments: NestedComment[] };
    message: string;
  } = await CommentRequests.GETs("traditions", tradition.result.id);

  const popularTraditions: {
    success: boolean;
    result: { traditions: TraditionRelation[]; pagination: Pagination };
    message: string;
  } = await TraditionRequests.GETs(`sortBy=liked&limit=4`);

  if (session) {
    await ViewRequests.POST({
      schema: "traditions",
      schemaId: tradition.result.id,
    });
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col justify-start items-stretch gap-6 max-w-7xl px-4 py-2 md:py-4">
        <div className="flex flex-col justify-start gap-8 items-stretch md:flex-row">
          <div className="md:w-2/3">
            <TraditionHero item={tradition.result} />
            <TraditionContent
              item={tradition.result}
              session={session}
              isBookmarked={isBookmarked.result}
              isLiked={isLiked.result}
            />

            {tradition.result.content && (
              <TraditionTypography body={tradition.result.content} />
            )}

            <Comments
              schema="traditions"
              schemaId={tradition.result.id}
              session={session}
              comments={comments.result.comments}
            />
          </div>
          <div className="md:w-1/3 flex flex-col justify-start items-stretch gap-8">
            <PopularTraditionsSection
              currentTradition={tradition.result}
              items={popularTraditions.result.traditions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
