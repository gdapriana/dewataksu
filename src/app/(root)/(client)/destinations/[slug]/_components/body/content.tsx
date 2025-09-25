import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatNumber } from "@/utils/helpers";
import { DestinationRelation } from "@/utils/types";
import { Tag } from "@prisma/client";
import {
  Bookmark,
  Eye,
  Heart,
  Layers,
  Map,
  MapPin,
  Wallet,
} from "lucide-react";
import Link from "next/link";

export default function DestinationContent({
  item,
}: {
  item: DestinationRelation;
}) {
  return (
    <div className="w-full flex flex-col gap-8 justify-start items-stretch">
      <header className="flex justify-center items-start flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">{item.name}</h1>
        <div className="flex w-full flex-wrap justify-start items-center gap-1 mb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" asChild>
                <Link href={item.mapUrl || "#"}>
                  <MapPin />
                  <p className="line-clamp-1 whitespace-break-spaces">
                    {item.address}
                  </p>
                </Link>
              </Badge>
            </TooltipTrigger>
            <TooltipContent className="w-full max-w-3xl">
              Address {item.address}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline">
                <Wallet />
                {item.price == 0 || !item.price
                  ? "Free Entry"
                  : formatNumber(item.price)}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>Entry Fee</TooltipContent>
          </Tooltip>
        </div>

        <p className="text-muted-foreground text-sm md:text-base">
          {item.content}
        </p>

        {item.tags && (
          <div className="flex mt-2 justify-start gap-1 items-start flex-wrap">
            {item.tags.map((item: Tag) => (
              <Tooltip key={item.id}>
                <TooltipTrigger>
                  <Badge variant="secondary">#{item.name}</Badge>
                </TooltipTrigger>
                <TooltipContent>Tag</TooltipContent>
              </Tooltip>
            ))}
          </div>
        )}
      </header>
      <main className="border-y flex-wrap py-4 gap-1 flex justify-end items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm">
              <Layers />
              {item.category.name}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Category</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm">
              <Map />
              {item.district.name}
            </Button>
          </TooltipTrigger>
          <TooltipContent>District</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm">
              <Eye />
              {formatNumber(item._count.views)}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Views</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm">
              <Bookmark />
              {formatNumber(item._count.bookmarks)}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bookmarks</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm">
              <Heart />
              {formatNumber(item._count.likes)}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Likes</TooltipContent>
        </Tooltip>
      </main>
    </div>
  );
}
