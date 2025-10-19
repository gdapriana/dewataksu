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

export default async function Bookmarked({
  schema,
  userId,
}: {
  schema: MainSchema;
  userId?: string;
}) {
  const bookmarks = await UserServerRequests.GETUserBookmarks(
    schema,
    new AbortController(),
    userId
  );

  return (
    <div className="grid gap-3 pt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {schema === "destinations" &&
        bookmarks.result.destinations &&
        bookmarks.result.destinations.length > 0 &&
        bookmarks.result.destinations.map((item: DestinationRelation) => (
          <DestinationCard item={item} key={item.id} />
        ))}
      {schema === "traditions" &&
        bookmarks.result.traditions &&
        bookmarks.result.traditions.length > 0 &&
        bookmarks.result.traditions.map((item: TraditionRelation) => (
          <TraditionCard item={item} key={item.id} />
        ))}
      {schema === "stories" &&
        bookmarks.result.stories &&
        bookmarks.result.stories.length > 0 &&
        bookmarks.result.stories.map((item: StoryRelation) => (
          <StoryCard item={item} key={item.id} />
        ))}
    </div>
  );
}
