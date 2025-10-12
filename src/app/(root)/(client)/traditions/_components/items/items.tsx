"use client";

import { DestinationCard } from "@/app/(root)/(client)/_components/card/destination";
import { TraditionCard } from "@/app/(root)/(client)/_components/card/tradition";
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
  TraditionRelation,
} from "@/utils/types";
import { Palmtree } from "lucide-react";
import { useEffect, useState } from "react";

export default function TraditionItems({
  districts,
}: {
  districts: DistrictRelation[];
}) {
  const defaultLimit = 8;
  const [traditions, setTraditions] = useState<TraditionRelation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>();

  const [limit, setLimit] = useState(defaultLimit);
  const [search, setSearch] = useState<string>();
  const [districtSlug, setDistrictSlug] = useState<string>();
  const [sortBy, setSortBy] = useState<"liked" | "viewed" | "bookmarked">();
  const [orderBy, setOrderBy] = useState<"asc" | "desc">();

  useEffect(() => {
    const controller = new AbortController();
    async function fetchDestinations() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (districtSlug && districtSlug !== "national")
          params.set("district", districtSlug);
        if (limit) params.set("limit", limit.toString());
        if (search) params.set("search", search);
        if (sortBy) params.set("sortBy", sortBy);
        if (orderBy) params.set("orderBy", orderBy);

        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_BETTER_AUTH_URL
          }/api/traditions?${params.toString()}`,
          {
            signal: controller.signal,
          }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setTraditions(data.result.traditions);
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
  }, [districtSlug, search, sortBy, orderBy, limit]);

  return (
    <div className="w-full mt-[400px] md:mt-auto relative flex justify-center items-center">
      <div className="w-full flex flex-col justify-start items-stretch gap-6 max-w-7xl px-4 py-2 md:py-4">
        <div className="mt-4 gap-8 w-full flex flex-col justify-start items-stretch">
          <div className="flex gap-4 justify-between items-center flex-wrap">
            <h3 className="font-bold text-lg">All Traditions</h3>
            <div className="flex gap-2 flex-wrap justify-end items-center">
              <Input
                placeholder="Search traditions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[200px]"
              />

              <Select
                value={districtSlug}
                onValueChange={(val: string) => {
                  setDistrictSlug(val);
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Districts" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((item: DistrictRelation) => (
                    <SelectItem value={item.slug}>{item.name}</SelectItem>
                  ))}
                  <SelectItem value="national">National</SelectItem>
                </SelectContent>
              </Select>

              {/* sort by select (shadCn) */}
              <Select
                value={sortBy}
                onValueChange={(val: "liked" | "viewed" | "bookmarked") =>
                  setSortBy(val)
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
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
          {!loading && traditions.length === 0 && (
            <Empty className="h-[400px]" Icon={Palmtree} item="Destinations" />
          )}
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {traditions.map((item: TraditionRelation) => (
              <TraditionCard key={item.id} item={item} />
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
