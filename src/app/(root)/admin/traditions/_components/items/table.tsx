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
import { DestinationRelation, TraditionRelation } from "@/utils/types";
import Link from "next/link";

export default function TraditionsTable({
  traditions,
}: {
  traditions: TraditionRelation[];
}) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cover</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {traditions.map((item: TraditionRelation) => (
            <TableRow key={item.id} className="align-top">
              <TableCell>
                <Avatar>
                  <AvatarFallback>
                    {item.name
                      .split(" ")
                      .slice(0, 2)
                      .map((s) => s[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground truncate">
                    {item.address}
                  </span>
                </div>
              </TableCell>
              <TableCell>{item.district?.name || "-"}</TableCell>
              <TableCell>
                {item.isPublished ? (
                  <Badge className="text-sm">Published</Badge>
                ) : (
                  <Badge variant="destructive">Draft</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm" variant="ghost" title="View">
                    <Link href={`/traditions/${item.slug}`}>
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
