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
import { DestinationRequests } from "@/utils/request/destination.request";
import DestinationForm from "@/app/(root)/admin/destinations/_components/form";
import { CategoryRequests } from "@/utils/request/category.request";

const pageInfo = {
  name: "Destinations",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await DestinationRequests.GETId(id);

  if (!destination) return notFound();
  if (destination && !destination.success) return notFound();

  const [districts, categories] = await Promise.all([
    DistrictRequests.GETs(),
    CategoryRequests.GETs(),
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
        <DestinationForm
          districts={districts.result.districts}
          categories={categories.result.categories}
          mode="patch"
          currentDestination={destination.result}
        />
      </div>
    </main>
  );
}
