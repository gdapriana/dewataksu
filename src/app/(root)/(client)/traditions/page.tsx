import PageHero from "@/app/(root)/(client)/_components/pages/hero/hero";
import TraditionItems from "@/app/(root)/(client)/traditions/_components/items/items";
import { DistrictRequests } from "@/utils/request/district.request";
import { TraditionRequests } from "@/utils/request/tradition.request";
import { DistrictRelation, Pagination, TraditionRelation } from "@/utils/types";

export default async function Page() {
  const mostViewedTraditions: {
    success: boolean;
    result: { traditions: TraditionRelation[]; pagination: Pagination };
    message: string;
  } = await TraditionRequests.GETs("sortBy=viewed&limit=4");

  const districts: {
    success: boolean;
    result: { districts: DistrictRelation[]; pagination: Pagination };
    message: string;
  } = await DistrictRequests.GETs("sortBy=popular");

  return (
    <main className="flex flex-col justify-start items-stretch">
      <PageHero
        schema="traditions"
        text={{
          title: "Traditions",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod odio minus quo unde nostrum hic molestiae facere aperiam",
        }}
        items={{ traditions: mostViewedTraditions.result.traditions }}
      />

      <TraditionItems districts={districts.result.districts} />
    </main>
  );
}
