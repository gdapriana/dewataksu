import DestinationContent from "@/app/(root)/(client)/destinations/[slug]/_components/body/content";
import Map from "@/app/(root)/(client)/destinations/[slug]/_components/body/map";
import RelatedDestinations from "@/app/(root)/(client)/destinations/[slug]/_components/body/related";
import Comments from "@/app/(root)/(client)/_components/comment/comment";
import DestinationHero from "@/app/(root)/(client)/destinations/[slug]/_components/hero/hero";
import { auth, Session } from "@/utils/auth";
import { CommentRequests } from "@/utils/request/comment.request";
import { DestinationRequests } from "@/utils/request/destination.request";
import { DestinationRelation, NestedComment, Pagination } from "@/utils/types";
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

  const destination: {
    success: boolean;
    result: DestinationRelation;
    message: string;
  } = await DestinationRequests.GET(slug);

  if (!destination) return notFound();
  if (destination && !destination.success) return notFound();

  const comments: {
    success: boolean;
    result: { comments: NestedComment[] };
    message: string;
  } = await CommentRequests.GETs("destinations", destination.result.id);

  const relatedDestinations: {
    success: boolean;
    result: { destinations: DestinationRelation[]; pagination: Pagination };
    message: string;
  } = await DestinationRequests.GETs(
    `search=${destination.result.category.name}&sortBy=liked&limit=4`
  );

  if (session) {
    await fetch(`${process.env.BETTER_AUTH_URL}/api/view`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: (await headers()).get("cookie") ?? "",
      },
      body: JSON.stringify({
        schema: "destinations",
        schemaId: destination.result.id,
      }),
    });
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col justify-start items-stretch gap-6 max-w-7xl px-4 py-2 md:py-4">
        <div className="flex flex-col justify-start gap-8 items-stretch md:flex-row">
          <div className="md:w-2/3">
            <DestinationHero item={destination.result} />
            <DestinationContent item={destination.result} />
            <Map url={destination.result.mapUrl} />
            <Comments session={session} comments={comments.result.comments} />
          </div>
          <div className="md:w-1/3">
            <RelatedDestinations
              items={relatedDestinations.result.destinations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
