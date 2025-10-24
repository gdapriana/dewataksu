import PopularCategories from "@/app/(root)/(client)/_components/category/popular";
import PopularDesinations from "@/app/(root)/(client)/_components/destination/popular";
import Hero from "@/app/(root)/(client)/_components/hero/hero";
import PopularStories from "@/app/(root)/(client)/_components/story/popular";
import PopularTraditions from "@/app/(root)/(client)/_components/tradition/popular";
import { CategoryRequests } from "@/utils/request/category.request";
import { DestinationRequests } from "@/utils/request/destination.request";
import { StoryRequests } from "@/utils/request/story.request";
import { TraditionRequests } from "@/utils/request/tradition.request";

export default async function Home() {
  const [
    popularDestinations,
    popularCategories,
    popularTraditions,
    popularStories,
  ] = await Promise.all([
    DestinationRequests.GETs("sortBy=liked&limit=4"),
    CategoryRequests.GETs("sortBy=most_destinations&limit=3"),
    TraditionRequests.GETs("sortBy=liked&limit=4"),
    StoryRequests.GETs("sortBy=liked&limit=4"),
  ]);

  return (
    <main suppressHydrationWarning>
      <Hero />
      <PopularDesinations
        destinations={popularDestinations.result.destinations}
      />
      <PopularCategories categories={popularCategories.result.categories} />
      <PopularTraditions traditions={popularTraditions.result.traditions} />
      <PopularStories stories={popularStories.result.stories} />
    </main>
  );
}
