import DestinationContent from "@/app/(root)/(client)/destinations/[slug]/_components/body/content";
import Map from "@/app/(root)/(client)/destinations/[slug]/_components/body/map";
import RelatedDestinations from "@/app/(root)/(client)/destinations/[slug]/_components/body/related";
import Comments from "@/app/(root)/(client)/_components/comment/comment";
import DestinationHero from "@/app/(root)/(client)/destinations/[slug]/_components/hero/hero";
import { auth, Session } from "@/utils/auth";
import { CommentRequests } from "@/utils/request/comment.request";
import { DestinationRequests } from "@/utils/request/destination.request";
import {
  CategoryRelation,
  DestinationRelation,
  NestedComment,
  Pagination,
} from "@/utils/types";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ViewRequests } from "@/utils/request/view.request";
import { LikeServerRequests } from "@/utils/request/like.server.request";
import { BookmarkServerRequests } from "@/utils/request/bookmark.server.request";
import { CategoryRequests } from "@/utils/request/category.request";
import PopularCategories from "@/app/(root)/(client)/destinations/[slug]/_components/body/category";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session: Session | null = await auth.api.getSession({
    headers: await headers(),
  });

  const destination: {
    success: boolean;
    result: DestinationRelation;
    message: string;
  } = await DestinationRequests.GET(slug);

  if (!destination) return notFound();
  if (destination && !destination.success) return notFound();

  const [
    isBookmarked,
    isLiked,
    comments,
    relatedDestinations,
    popularCategories,
  ] = await Promise.all([
    BookmarkServerRequests.GET("destinations", destination.result.id),
    LikeServerRequests.GET("destinations", destination.result.id),
    CommentRequests.GETs("destinations", destination.result.id),
    DestinationRequests.GETs(
      `search=${destination.result.category.name}&sortBy=liked&limit=4`
    ),
    CategoryRequests.GETs("sortBy=most_destinations&limit=10"),
  ]);

  if (session) {
    await ViewRequests.POST({
      schema: "destinations",
      schemaId: destination.result.id,
    });
  }

  console.log({ isBookmarked });
  console.log({ isLiked });

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col justify-start items-stretch gap-6 max-w-7xl px-4 py-2 md:py-4">
        <div className="flex flex-col justify-start gap-8 items-stretch md:flex-row">
          <div className="md:w-2/3">
            <DestinationHero item={destination.result} />
            <DestinationContent
              session={session}
              isBookmarked={isBookmarked.result}
              isLiked={isLiked.result}
              item={destination.result}
            />
            <Map url={destination.result.mapUrl} />
            <Comments
              schema="destinations"
              schemaId={destination.result.id}
              session={session}
              comments={comments.result.comments}
            />
          </div>
          <div className="md:w-1/3 flex flex-col justify-start items-stretch gap-8">
            <RelatedDestinations
              currentDestination={destination.result}
              items={relatedDestinations.result.destinations}
            />
            <PopularCategories items={popularCategories.result.categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
