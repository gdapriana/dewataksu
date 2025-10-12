import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit } from "lucide-react";
import { DestinationRelation } from "@/utils/types";
import Link from "next/link";

export default function DestinationsTable({
  destinations,
}: {
  destinations: DestinationRelation[];
}) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cover</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {destinations.map((dest: DestinationRelation) => (
            <TableRow key={dest.id} className="align-top">
              <TableCell>
                <Avatar>
                  <AvatarFallback>
                    {dest.name
                      .split(" ")
                      .slice(0, 2)
                      .map((s) => s[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{dest.name}</span>
                  <span className="text-sm text-muted-foreground truncate">
                    {dest.address}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{dest.category?.name || "-"}</Badge>
              </TableCell>
              <TableCell>{dest.district?.name || "-"}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {(dest.tags || []).map((t: any) => (
                    <Badge key={t.name} variant="outline">
                      {t.name}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                {dest.price && dest.price === 0
                  ? "Free"
                  : new Intl.NumberFormat().format(dest.price || 0)}
              </TableCell>
              <TableCell>
                {dest.isPublished ? (
                  <Badge className="text-sm">Published</Badge>
                ) : (
                  <Badge variant="destructive">Draft</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm" variant="ghost" title="View">
                    <Link href={`/destinations/${dest.slug}`}>
                      <Eye size={16} />
                    </Link>
                  </Button>
                  <Button size="sm" variant="ghost" title="Edit">
                    <Edit size={16} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
