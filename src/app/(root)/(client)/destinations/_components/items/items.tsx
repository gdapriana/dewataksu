"use client";

import { DestinationCard } from "@/app/(root)/(client)/_components/card/destination";
import Empty from "@/app/(root)/(client)/_components/empty/item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CategoryRelation,
  DestinationRelation,
  DistrictRelation,
  Pagination,
} from "@/utils/types";
import { Palmtree } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function DestinationItems({
  categories,
  districts,
}: {
  categories: CategoryRelation[];
  districts: DistrictRelation[];
}) {
  const defaultLimit = 8;
  const [destinations, setDestinations] = useState<DestinationRelation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>();

  const [limit, setLimit] = useState(defaultLimit);
  const [search, setSearch] = useState<string>();
  const [categorySlug, setCategorySlug] = useState<string>();
  const [districtSlug, setDistrictSlug] = useState<string>();
  const [sortBy, setSortBy] = useState<
    "price" | "liked" | "viewed" | "bookmarked"
  >();
  const [orderBy, setOrderBy] = useState<"asc" | "desc">();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const category = searchParams.get("category");
    const district = searchParams.get("district");
    const searchQuery = searchParams.get("search");
    const sort = searchParams.get("sortBy") as
      | "price"
      | "liked"
      | "viewed"
      | "bookmarked"
      | null;
    const order = searchParams.get("orderBy") as "asc" | "desc" | null;

    if (category) setCategorySlug(category);
    if (district) setDistrictSlug(district);
    if (searchQuery) setSearch(searchQuery);
    if (sort) setSortBy(sort);
    if (order) setOrderBy(order);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (categorySlug) params.set("category", categorySlug);
    else params.delete("category");

    if (districtSlug) params.set("district", districtSlug);
    else params.delete("district");

    if (search) params.set("search", search);
    else params.delete("search");

    if (sortBy) params.set("sortBy", sortBy);
    else params.delete("sortBy");

    if (orderBy) params.set("orderBy", orderBy);
    else params.delete("orderBy");

    router.replace(`${pathname}?${params.toString()}`);
  }, [categorySlug, districtSlug, search, sortBy, orderBy]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchDestinations() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (districtSlug && districtSlug !== "all")
          params.set("district", districtSlug);
        if (limit) params.set("limit", limit.toString());
        if (categorySlug && categorySlug !== "all")
          params.set("category", categorySlug);
        if (search) params.set("search", search);
        if (sortBy) params.set("sortBy", sortBy);
        if (orderBy) params.set("orderBy", orderBy);

        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_BETTER_AUTH_URL
          }/api/destinations?${params.toString()}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setDestinations(data.result.destinations);
        setPagination(data.result.pagination);
      } catch (err) {
        if ((err as Error).name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
    return () => controller.abort();
  }, [districtSlug, search, sortBy, orderBy, limit, categorySlug]);

  return (
    <div className="w-full mt-[400px] md:mt-auto relative flex justify-center items-center">
      <div className="w-full flex flex-col justify-start items-stretch gap-6 max-w-7xl px-4 py-2 md:py-4">
        <div className="mt-4 gap-8 w-full flex flex-col justify-start items-stretch">
          <div className="flex gap-4 justify-between items-center flex-wrap">
            <h3 className="font-bold text-lg">All Destinations</h3>
            <div className="flex gap-2 flex-wrap justify-end items-center">
              <Input
                placeholder="Search destinations..."
                value={search || ""}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[200px]"
              />

              <Select
                value={districtSlug}
                onValueChange={(val: string) => setDistrictSlug(val)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Districts" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((item: DistrictRelation) => (
                    <SelectItem key={item.id} value={item.slug}>
                      {item.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={categorySlug}
                onValueChange={(val: string) => setCategorySlug(val)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item: CategoryRelation) => (
                    <SelectItem key={item.id} value={item.slug}>
                      {item.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={(
                  val: "price" | "liked" | "viewed" | "bookmarked"
                ) => setSortBy(val)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="liked">Liked</SelectItem>
                  <SelectItem value="viewed">Viewed</SelectItem>
                  <SelectItem value="bookmarked">Bookmarked</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={orderBy}
                onValueChange={(val: "asc" | "desc") => setOrderBy(val)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading && <div>Loading...</div>}

          {!loading && destinations.length === 0 && (
            <Empty className="h-[400px]" Icon={Palmtree} item="Destinations" />
          )}

          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {destinations.map((item: DestinationRelation) => (
              <DestinationCard item={item} key={item.id} />
            ))}
          </div>

          {pagination && pagination.total > limit && (
            <div className="w-full flex justify-center items-center">
              <Button onClick={() => setLimit(limit + defaultLimit)}>
                Load more
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
