import PopularCategories from "@/app/(root)/(client)/_components/category/popular";
import PopularDesinationss from "@/app/(root)/(client)/_components/destination/popular";
import Hero from "@/app/(root)/(client)/_components/hero/hero";
import { CategoryRequests } from "@/utils/request/category.request";
import { DestinationRequests } from "@/utils/request/destination.request";
import {
  CategoryRelation,
  DestinationRelation,
  Pagination,
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

  return (
    <main>
      <Hero />
      <PopularDesinationss
        destinations={popularDestinations.result.destinations}
      />

      <PopularCategories categories={popularCategories.result.categories} />
    </main>
  );
}
