import PageHero from "@/app/(root)/(client)/_components/pages/hero/hero";
import DestinationItems from "@/app/(root)/(client)/destinations/_components/items/items";
import { CategoryRequests } from "@/utils/request/category.request";
import { DestinationRequests } from "@/utils/request/destination.request";
import { DistrictRequests } from "@/utils/request/district.request";
import {
  CategoryRelation,
  DestinationRelation,
  DistrictRelation,
  Pagination,
} from "@/utils/types";

export default async function Page() {
  const mostViewedDestinations: {
    success: boolean;
    result: { destinations: DestinationRelation[]; pagination: Pagination };
    message: string;
  } = await DestinationRequests.GETs("sortBy=viewed&limit=4");

  const categories: {
    success: boolean;
    result: { categories: CategoryRelation[]; pagination: Pagination };
    message: string;
  } = await CategoryRequests.GETs("sortBy=most_destinations");

  const districts: {
    success: boolean;
    result: { districts: DistrictRelation[]; pagination: Pagination };
    message: string;
  } = await DistrictRequests.GETs("sortBy=popular");

  return (
    <main className="flex flex-col justify-start items-stretch">
      <PageHero
        schema="destinations"
        text={{
          title: "Destinations",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod odio minus quo unde nostrum hic molestiae facere aperiam",
        }}
        items={{ destinations: mostViewedDestinations.result.destinations }}
      />

      <DestinationItems
        categories={categories.result.categories}
        districts={districts.result.districts}
      />
    </main>
  );
}
