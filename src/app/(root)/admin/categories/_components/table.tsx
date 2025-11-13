"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Loader2, Palmtree } from "lucide-react";
import { CategoryRelation } from "@/utils/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import CustomTooltip from "@/app/(root)/_components/custom/custom-tooltip";
import { formatNumber } from "@/utils/helpers";
import Link from "next/link";
import DeleteCategoryAlert from "@/app/(root)/_components/alert/delete/category";

export default function CategoriesTable() {
  const [categories, setCategories] = useState<CategoryRelation[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchCategories = useCallback(
    async (controller: AbortController) => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          page: String(page),
          limit: "5",
          ...(debouncedSearch ? { search: debouncedSearch } : {}),
        });

        const res = await fetch(`/api/categories?${query.toString()}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (data.success) {
          setCategories(data.result.categories);
          setTotalPages(data.result.pagination.pages);
        }
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError"))
          console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    },
    [page, debouncedSearch]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchCategories(controller);
    return () => controller.abort();
  }, [fetchCategories]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-stretch gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Categories</h2>
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-64 text-sm"
        />
      </div>

      <div className="rounded-md no-scrollbar flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-neutral-400">Cover</TableHead>
              <TableHead className="text-neutral-400">
                Name and Description
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
                <TableCell colSpan={5} className="text-center py-6">
                  <Loader2 className="animate-spin inline w-5 h-5 text-gray-400" />
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-neutral-400"
                >
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat) => (
                <TableRow key={cat.id} className="transition-colors">
                  <TableCell>
                    {cat.cover?.url ? (
                      <Image
                        loading="lazy"
                        width={100}
                        height={50}
                        quality={10}
                        src={cat.cover.url}
                        alt={cat.name}
                        className="w-20 aspect-video rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-20 aspect-video rounded-md bg-muted-foreground/5 flex items-center justify-center text-xs text-neutral-500">
                        {cat.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <CustomTooltip content={cat.name}>
                      <p className="font-semibold line-clamp-2 overflow-ellipsis">
                        {cat.name}
                      </p>
                    </CustomTooltip>
                    <CustomTooltip content={cat.description}>
                      <p className="line-clamp-1 max-w-[500px] text-muted-foreground overflow-ellipsis w-full">
                        {cat.description}
                      </p>
                    </CustomTooltip>
                  </TableCell>
                  <TableCell className="text-neutral-400">
                    <CustomTooltip
                      content={`${cat._count.destinations} destinations`}
                    >
                      <Badge variant="secondary">
                        <Palmtree /> {formatNumber(cat._count.destinations)}
                      </Badge>
                    </CustomTooltip>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-nowrap justify-end items-center gap-1">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/destinations?category=${cat.slug}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/categories/${cat.id}`}>
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </Button>
                      <DeleteCategoryAlert item={cat} />
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
