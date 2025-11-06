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
import { Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import { CategoryRelation } from "@/utils/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Categories</h2>
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-64 bg-neutral-900 text-sm"
        />
      </div>

      <div className="rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="text-neutral-400">Cover</TableHead>
              <TableHead className="text-neutral-400">Name</TableHead>
              <TableHead className="text-neutral-400 flex-1">
                Description
              </TableHead>
              <TableHead className="text-neutral-400">Slug</TableHead>
              <TableHead className="text-neutral-400">Destinations</TableHead>
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
                <TableRow
                  key={cat.id}
                  className="hover:bg-neutral-900 transition-colors"
                >
                  <TableCell>
                    {cat.cover?.url ? (
                      <Image
                        loading="lazy"
                        quality={10}
                        src={cat.cover.url}
                        alt={cat.name}
                        className="w-20 aspect-video rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-20 aspect-video rounded-md bg-neutral-800 flex items-center justify-center text-xs text-neutral-500">
                        {cat.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="w-[300px] line-clamp-1 text-neutral-400">
                    {cat.description ? (
                      <p className="line-clamp-1 overflow-ellipsis">
                        {cat.description}
                      </p>
                    ) : (
                      <span className="italic">No Description Provided</span>
                    )}
                  </TableCell>
                  <TableCell className="text-neutral-400">
                    <Badge variant="outline">{cat.slug}</Badge>
                  </TableCell>
                  <TableCell className="text-neutral-400">
                    {cat._count?.destinations ?? 0}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4 text-neutral-300" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Pencil className="w-4 h-4 text-neutral-300" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
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
