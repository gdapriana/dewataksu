"use client";
import { Input } from "@/components/ui/input";
import { DistrictRelation, TraditionRelation } from "@/utils/types";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";
import {
  Bookmark,
  Eye,
  EyeOff,
  Heart,
  Layers,
  Loader2,
  Map,
  MessageCircleMore,
  Palmtree,
  Pencil,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import CustomTooltip from "@/app/(root)/_components/custom/custom-tooltip";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteDistrictAlert from "@/app/(root)/_components/alert/delete/district";
import Link from "next/link";

export default function DistrictsTable() {
  const [districts, setDistricts] = useState<DistrictRelation[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState<string>("createdAt");
  const [order, setOrder] = useState<string>("desc");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchTraditions = useCallback(
    async (controller: AbortController) => {
      try {
        setLoading(true);
        const params: Record<string, string> = {
          page: String(page),
          limit: "8",
          sortBy: sort,
          orderBy: order,
          ...(debouncedSearch ? { search: debouncedSearch } : {}),
        };

        const query = new URLSearchParams(params);
        const res = await fetch(`/api/districts?${query.toString()}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (data.success) {
          setDistricts(data.result.districts);
          setTotalPages(data.result.pagination.pages);
        }
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError"))
          console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    },
    [page, debouncedSearch, sort, order]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchTraditions(controller);
    return () => controller.abort();
  }, [fetchTraditions]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-stretch gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Districts</h2>
        <div className="flex flex-1 gap-2 flex-wrap justify-end items-center">
          <Select onValueChange={(e) => setSort(e)}>
            <SelectTrigger className="w-max">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                <SelectItem value="createdAt">Created At</SelectItem>
                <SelectItem value="updatedAt">Updated At</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(e) => setOrder(e)}>
            <SelectTrigger className="w-max">
              <SelectValue placeholder="Order By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Order By</SelectLabel>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search District..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-64 text-sm"
          />
        </div>
      </div>

      <div className="rounded-md no-scrollbar flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="text-neutral-400">Cover</TableHead>
              <TableHead className="text-neutral-400 flex-1">
                Name and Address
              </TableHead>
              <TableHead className="text-neutral-400">Statistic</TableHead>
              <TableHead className="text-right text-neutral-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  <Loader2 className="animate-spin inline w-5 h-5 text-gray-400" />
                </TableCell>
              </TableRow>
            ) : districts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-neutral-400"
                >
                  No districts found.
                </TableCell>
              </TableRow>
            ) : (
              districts.map((dis) => (
                <TableRow key={dis.id} className="transition-colors">
                  <TableCell>
                    {dis.cover?.url ? (
                      <Image
                        loading="lazy"
                        quality={10}
                        src={dis.cover.url}
                        width={100}
                        height={100}
                        alt={dis.name}
                        className="w-20 aspect-video rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-20 aspect-video rounded-md bg-muted-foreground/5 flex items-center justify-center text-xs text-neutral-500">
                        {dis.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <CustomTooltip content={dis.name}>
                      <p className="font-semibold line-clamp-2 overflow-ellipsis">
                        {dis.name}
                      </p>
                    </CustomTooltip>
                    <CustomTooltip content={dis.description}>
                      <p className="line-clamp-1 max-w-[500px] text-muted-foreground overflow-ellipsis w-full">
                        {dis.description}
                      </p>
                    </CustomTooltip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-nowrap justify-start items-center">
                      <CustomTooltip
                        content={`${dis._count.destinations} destinations`}
                      >
                        <Badge variant="secondary">
                          <Palmtree /> {formatNumber(dis._count.destinations)}
                        </Badge>
                      </CustomTooltip>
                      <CustomTooltip
                        content={`${dis._count.traditions} traditions`}
                      >
                        <Badge variant="secondary">
                          <Palmtree /> {formatNumber(dis._count.traditions)}
                        </Badge>
                      </CustomTooltip>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end items-center flex-nowrap gap-1">
                      <CustomTooltip content="View">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </CustomTooltip>
                      <CustomTooltip content="Edit">
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/admin/districts/${dis.id}`}>
                            <Pencil className="w-4 h-4 " />
                          </Link>
                        </Button>
                      </CustomTooltip>
                      <CustomTooltip content="Delete">
                        <DeleteDistrictAlert item={dis} />
                      </CustomTooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center text-sm text-neutral-400">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1 || loading}
          className="border-neutral-700 bg-neutral-900 hover:bg-neutral-800"
        >
          Prev
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages || loading}
          className="border-neutral-700 bg-neutral-900 hover:bg-neutral-800"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
