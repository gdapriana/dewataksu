import DestinationsTable from "@/app/(root)/admin/destinations/_components/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CategoryRequests } from "@/utils/request/category.request";
import { DistrictRequests } from "@/utils/request/district.request";

const pageInfo = {
  name: "Destinations",
};

export default async function Page() {
  const [categories, districts] = await Promise.all([
    CategoryRequests.GETs("sortBy=most_destinations"),
    DistrictRequests.GETs("sortBy=popular"),
  ]);

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
        <DestinationsTable
          categories={categories.result.categories}
          districts={districts.result.districts}
        />
      </div>
    </main>
  );
}
