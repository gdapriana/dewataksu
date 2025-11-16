import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { notFound } from "next/navigation";
import { DistrictRequests } from "@/utils/request/district.request";
import { TraditionRequests } from "@/utils/request/tradition.request";
import { DistrictRelation, Pagination } from "@/utils/types";
import TraditionForm from "@/app/(root)/admin/traditions/_components/form";

const pageInfo = {
  name: "Traditions",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tradition = await TraditionRequests.GETId(id);

  if (!tradition) return notFound();
  if (tradition && !tradition.success) return notFound();

  const districts: {
    success: boolean;
    result: { districts: DistrictRelation[]; pagination: Pagination };
    message: string;
  } = await DistrictRequests.GETs("sortBy=popular");

  return (
    <main className="flex flex-col justify-start items-stretch h-dvh">
      <header className="flex h-[10%] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">{pageInfo.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex h-[90%] flex-1 justify-start items-stretch flex-col gap-4 p-4 pt-0">
        <TraditionForm
          districts={districts.result.districts}
          mode="patch"
          currentTradition={tradition.result}
        />
      </div>
    </main>
  );
}
