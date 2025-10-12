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
  Pagination,
} from "@/utils/types";
import { District } from "@prisma/client";
import { Palmtree } from "lucide-react";
import { useEffect, useState } from "react";

export default function Items({
  categories,
  district,
}: {
  categories: CategoryRelation[];
  district: District;
}) {
  const defaultLimit = 8;
  const [destinations, setDestinations] = useState<DestinationRelation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>();

  const [limit, setLimit] = useState(defaultLimit);
  const [search, setSearch] = useState<string>();
  const [categorySlug, setCategorySlug] = useState<string>();
  const [sortBy, setSortBy] = useState<
    "price" | "liked" | "viewed" | "bookmarked"
  >();
  const [orderBy, setOrderBy] = useState<"asc" | "desc">();

  useEffect(() => {
    const controller = new AbortController();
    async function fetchDestinations() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (district.slug) params.set("district", district.slug);
        if (limit) params.set("limit", limit.toString());
        if (categorySlug) params.set("category", categorySlug);
        if (search) params.set("search", search);
        if (sortBy) params.set("sortBy", sortBy);
        if (orderBy) params.set("orderBy", orderBy);

        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_BETTER_AUTH_URL
          }/api/destinations?${params.toString()}`,
          {
            signal: controller.signal,
          }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setDestinations(data.result.destinations);
        setPagination(data.result.pagination);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
    return () => controller.abort();
  }, [district.slug, search, sortBy, orderBy, limit, categorySlug]);

  return (
    <div className="mt-4 gap-8 w-full flex flex-col justify-start items-stretch">
      <div className="flex gap-4 justify-between items-center flex-wrap">
        <h3 className="font-bold text-lg">{district.name}'s Destinations</h3>

        <div className="flex gap-2 flex-wrap justify-end items-center">
          <Input
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[200px]"
          />

          <Select
            value={categorySlug}
            onValueChange={(val: string) => {
              setCategorySlug(val);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((item: CategoryRelation) => (
                <SelectItem value={item.slug}>{item.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* sort by select (shadCn) */}
          <Select
            value={sortBy}
            onValueChange={(val: "price" | "liked" | "viewed" | "bookmarked") =>
              setSortBy(val)
            }
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
          {/* order by select (shadCn) */}
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
  );
}
