"use client";
import { Input } from "@/components/ui/input";
import {
  CategoryRelation,
  DestinationRelation,
  DistrictRelation,
} from "@/utils/types";

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

export default function DestinationsTable({
  districts,
  categories,
}: {
  districts: DistrictRelation[];
  categories: CategoryRelation[];
}) {
  const [destinations, setDestinations] = useState<DestinationRelation[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [district, setDistrict] = useState<string>("all");
  const [sort, setSort] = useState<string>("createdAt");
  const [order, setOrder] = useState<string>("desc");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchDestinations = useCallback(
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

        if (category !== "all") params.category = category;
        if (district !== "all") params.district = district;

        const query = new URLSearchParams(params);

        const res = await fetch(`/api/destinations?${query.toString()}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (data.success) {
          setDestinations(data.result.destinations);
          setTotalPages(data.result.pagination.pages);
        }
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError"))
          console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    },
    [page, debouncedSearch, category, district, sort, order]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchDestinations(controller);
    return () => controller.abort();
  }, [fetchDestinations]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-stretch gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Destinations</h2>
        <div className="flex flex-1 gap-2 flex-wrap justify-end items-center">
          <Select onValueChange={(e) => setCategory(e)}>
            <SelectTrigger className="w-max">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {categories &&
                  categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(e) => setDistrict(e)}>
            <SelectTrigger className="w-max">
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>District</SelectLabel>
                {districts &&
                  districts.map((dis) => (
                    <SelectItem key={dis.id} value={dis.slug}>
                      {dis.name}
                    </SelectItem>
                  ))}
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(e) => setSort(e)}>
            <SelectTrigger className="w-max">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                <SelectItem value="createdAt">Created At</SelectItem>
                <SelectItem value="updatedAt">Updated At</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="liked">Liked</SelectItem>
                <SelectItem value="viewed">Viewed</SelectItem>
                <SelectItem value="bookmarked">Bookmarked</SelectItem>
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
            placeholder="Search destinations..."
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
            <TableRow>
              <TableHead className="text-neutral-400">Cover</TableHead>
              <TableHead className="text-neutral-400 flex-1">
                Name and Description
              </TableHead>
              <TableHead className="text-neutral-400">Category</TableHead>
              <TableHead className="text-neutral-400">District</TableHead>
              <TableHead className="text-neutral-400">Status</TableHead>
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
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-neutral-400"
                >
                  No destinations found.
                </TableCell>
              </TableRow>
            ) : (
              destinations.map((des) => (
                <TableRow key={des.id} className="transition-colors">
                  <TableCell>
                    {des.cover?.url ? (
                      <Image
                        loading="lazy"
                        quality={10}
                        width={100}
                        height={100}
                        src={des.cover.url}
                        alt={des.name}
                        className="w-20 aspect-video rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-20 aspect-video bg-muted-foreground/5 rounded-md flex items-center justify-center text-xs text-neutral-500">
                        {des.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <CustomTooltip content={des.name}>
                      <p className="font-semibold line-clamp-2 overflow-ellipsis">
                        {des.name}
                      </p>
                    </CustomTooltip>
                    <CustomTooltip content={des.content}>
                      <p className="line-clamp-1 max-w-[200px] text-muted-foreground overflow-ellipsis w-full">
                        {des.content}
                      </p>
                    </CustomTooltip>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <Layers />
                      {des.category.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <Map />
                      {des.district.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {des.isPublished ? (
                      <CustomTooltip content="Published">
                        <Badge className="bg-teal-500">
                          <Eye />
                        </Badge>
                      </CustomTooltip>
                    ) : (
                      <CustomTooltip content="Unpublished">
                        <Badge className="bg-rose-500">
                          <EyeOff />
                        </Badge>
                      </CustomTooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap justify-start items-center">
                      <CustomTooltip content={`${des._count.likes} likes`}>
                        <Badge variant="secondary">
                          <Heart /> {des._count.likes}
                        </Badge>
                      </CustomTooltip>
                      <CustomTooltip
                        content={`${des._count.bookmarks} bookmarks`}
                      >
                        <Badge variant="secondary">
                          <Bookmark /> {formatNumber(des._count.bookmarks)}
                        </Badge>
                      </CustomTooltip>
                      <CustomTooltip content={`${des._count.views} views`}>
                        <Badge variant="secondary">
                          <Eye /> {formatNumber(des._count.views)}
                        </Badge>
                      </CustomTooltip>
                      <CustomTooltip
                        content={`${des._count.comments} comments`}
                      >
                        <Badge variant="secondary">
                          <MessageCircleMore />{" "}
                          {formatNumber(des._count.comments)}
                        </Badge>
                      </CustomTooltip>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end items-center flex-wrap gap-1">
                      <CustomTooltip content="View">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </CustomTooltip>
                      <CustomTooltip content="Edit">
                        <Button variant="ghost" size="icon">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </CustomTooltip>
                      <CustomTooltip content="Delete">
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
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
