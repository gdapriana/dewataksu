import { CategoryRequests } from "@/utils/request/category.request";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import CategoryForm from "@/app/(root)/admin/categories/_components/form";
import { notFound } from "next/navigation";
import { DistrictRequests } from "@/utils/request/district.request";
import DistrictForm from "@/app/(root)/admin/districts/_components/form";

const pageInfo = {
  name: "Districts",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const district = await DistrictRequests.GETId(id);

  if (!district) return notFound();
  if (district && !district.success) return notFound();

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
        <DistrictForm mode="patch" currentDistrict={district.result} />
      </div>
    </main>
  );
}
