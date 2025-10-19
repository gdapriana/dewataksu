import { DestinationCard } from "@/app/(root)/(client)/_components/card/destination";
import { StoryCard } from "@/app/(root)/(client)/_components/card/story";
import { TraditionCard } from "@/app/(root)/(client)/_components/card/tradition";
import { UserServerRequests } from "@/utils/request/user.server.request";
import {
  DestinationRelation,
  MainSchema,
  StoryRelation,
  TraditionRelation,
} from "@/utils/types";

export default async function Liked({
  schema,
  userId,
}: {
  schema: MainSchema;
  userId?: string;
}) {
  const likes = await UserServerRequests.GETUserLikes(
    schema,
    new AbortController(),
    userId
  );

  return (
    <div className="grid gap-3 pt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {schema === "destinations" &&
        likes.result.destinations &&
        likes.result.destinations.length > 0 &&
        likes.result.destinations.map((item: DestinationRelation) => (
          <DestinationCard item={item} key={item.id} />
        ))}
      {schema === "traditions" &&
        likes.result.traditions &&
        likes.result.traditions.length > 0 &&
        likes.result.traditions.map((item: TraditionRelation) => (
          <TraditionCard item={item} key={item.id} />
        ))}
      {schema === "stories" &&
        likes.result.stories &&
        likes.result.stories.length > 0 &&
        likes.result.stories.map((item: StoryRelation) => (
          <StoryCard item={item} key={item.id} />
        ))}
    </div>
  );
}
