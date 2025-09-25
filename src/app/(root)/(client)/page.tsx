import PopularCategories from "@/app/(root)/(client)/_components/category/popular";
import PopularDesinations from "@/app/(root)/(client)/_components/destination/popular";
import Hero from "@/app/(root)/(client)/_components/hero/hero";
import PopularStories from "@/app/(root)/(client)/_components/story/popular";
import PopularTraditions from "@/app/(root)/(client)/_components/tradition/popular";
import { CategoryRequests } from "@/utils/request/category.request";
import { DestinationRequests } from "@/utils/request/destination.request";
import { StoryRequests } from "@/utils/request/story.request";
import { TraditionRequests } from "@/utils/request/tradition.request";
import {
  CategoryRelation,
  DestinationRelation,
  Pagination,
  StoryRelation,
  TraditionRelation,
} from "@/utils/types";

export default async function Home() {
  const popularDestinations: {
    success: boolean;
    result: { destinations: DestinationRelation[]; pagination: Pagination };
    message: string;
  } = await DestinationRequests.GETs("sortBy=liked&limit=4");

  const popularCategories: {
    success: boolean;
    result: { categories: CategoryRelation[]; pagination: Pagination };
    message: string;
  } = await CategoryRequests.GETs("sortBy=most_destinations&limit=3");

  const popularTraditions: {
    success: boolean;
    result: { traditions: TraditionRelation[]; pagination: Pagination };
    message: string;
  } = await TraditionRequests.GETs("sortBy=liked&limit=4");

  const popularStories: {
    success: boolean;
    result: { stories: StoryRelation[]; pagination: Pagination };
    message: string;
  } = await StoryRequests.GETs("sortBy=liked&limit=4");

  return (
    <main>
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
