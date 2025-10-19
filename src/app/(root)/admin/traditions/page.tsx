import TraditionItems from "@/app/(root)/admin/traditions/_components/items/items";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DistrictRequests } from "@/utils/request/district.request";
import { DistrictRelation, Pagination } from "@/utils/types";
import { Separator } from "@radix-ui/react-separator";
const pageInfo = {
  name: "Traditions",
};
export default async function Page() {
  const districts: {
    success: boolean;
    result: { districts: DistrictRelation[]; pagination: Pagination };
    message: string;
  } = await DistrictRequests.GETs("sortBy=popular");

  return (
    <main className="flex flex-col justify-start items-stretch h-dvh">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
      <div className="flex overflow-auto flex-1 flex-col gap-4 p-4 pt-0">
        <TraditionItems districts={districts.result.districts} />
      </div>
    </main>
  );
}
