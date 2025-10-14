import DistrictHero from "@/app/(root)/(client)/districts/[slug]/_components/hero/hero";
import Items from "@/app/(root)/(client)/districts/[slug]/_components/items/items";
import Sidebar from "@/app/(root)/(client)/districts/[slug]/_components/side/side";
import { CategoryRequests } from "@/utils/request/category.request";
import { DestinationRequests } from "@/utils/request/destination.request";
import { DistrictRequests } from "@/utils/request/district.request";
import {
  CategoryRelation,
  DestinationRelation,
  DistrictRelation,
  Pagination,
} from "@/utils/types";
import { District } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const district: {
    success: boolean;
    result: DistrictRelation;
    message: string;
  } = await DistrictRequests.GET(slug);

  if (!district) return notFound();
  if (district && !district.success) return notFound();

  const [popularDestinations, categories] = await Promise.all([
    DestinationRequests.GETs(
      `district=${district.result.slug}&sortBy=viewed&limit=4`
    ),
    CategoryRequests.GETs("sortBy=most_destinations"),
  ]);

  return (
    <div className="w-full py-8 flex justify-center items-center flex-col">
      <div className="w-full flex flex-col justify-start items-stretch gap-12 max-w-7xl px-4 py-2 md:py-4">
        <div className="flex justify-center gap-8 items-start">
          <div className="w-full md:w-2/3">
            <DistrictHero district={district.result} />
          </div>
          <div className="hidden md:flex md:w-1/3">
            <Sidebar
              title={`Popular destinations in ${district.result.name}`}
              items={popularDestinations.result.destinations}
            />
          </div>
        </div>
        <Items
          categories={categories.result.categories}
          district={district.result}
        />
      </div>
    </div>
  );
}
