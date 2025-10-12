"use client";
import Bookmark from "@/app/(root)/(client)/_components/bookmark/bookmark";
import Like from "@/app/(root)/(client)/_components/like/like";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Session } from "@/utils/auth";
import { formatNumber } from "@/utils/helpers";
import { TraditionRelation } from "@/utils/types";
import { Eye, Map, MapPin } from "lucide-react";

export default function TraditionContent({
  isBookmarked = false,
  isLiked = false,
  item,
  session,
}: {
  isBookmarked?: boolean;
  isLiked?: boolean;
  item: TraditionRelation;
  session: Session | null;
}) {
  return (
    <div className="w-full flex flex-col gap-8 justify-start items-stretch">
      <header className="flex justify-center items-start flex-col gap-2">
        <h1 className="text-xl md:text-2xl font-bold">{item.name}</h1>
        <div className="flex w-full flex-wrap justify-start items-center gap-1 my-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline">
                <MapPin />
                <p className="line-clamp-1 whitespace-break-spaces">
                  {item.address || "National"}
                </p>
              </Badge>
            </TooltipTrigger>
            <TooltipContent className="w-full max-w-3xl">
              {item.address ? `Address ${item.address}` : "National"}
            </TooltipContent>
          </Tooltip>
        </div>

        <p className="text-muted-foreground text-sm md:text-base">
          {item.description}
        </p>
      </header>
      <main className="border-y flex-wrap py-4 gap-1 flex justify-end items-center">
        {item.district && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm">
                <Map />
                {item.district.name}
              </Button>
            </TooltipTrigger>
            <TooltipContent>District</TooltipContent>
          </Tooltip>
        )}
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
            <Bookmark
              session={session}
              schemaId={item.id}
              schema="traditions"
              currentBookmark={item._count.bookmarks}
              isBookmarked={isBookmarked}
            />
          </TooltipTrigger>
          <TooltipContent>Bookmarks</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Like
              session={session}
              schemaId={item.id}
              schema="traditions"
              currentLike={item._count.likes}
              isLiked={isLiked}
            />
          </TooltipTrigger>
          <TooltipContent>Likes</TooltipContent>
        </Tooltip>
      </main>
    </div>
  );
}
