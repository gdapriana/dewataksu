"use client";
import Bookmark from "@/app/(root)/(client)/_components/bookmark/bookmark";
import Like from "@/app/(root)/(client)/_components/like/like";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Session } from "@/utils/auth";
import { formatNumber } from "@/utils/helpers";
import { StoryRelation } from "@/utils/types";
import { Eye, ImageOff } from "lucide-react";
import moment from "moment";

export default function StoryContent({
  isBookmarked = false,
  isLiked = false,
  item,
  session,
}: {
  isBookmarked?: boolean;
  isLiked?: boolean;
  item: StoryRelation;
  session: Session | null;
}) {
  return (
    <div className="w-full flex flex-col gap-8 justify-start items-stretch">
      <header className="flex justify-center items-start flex-col gap-2">
        <h1 className="text-xl md:text-2xl font-bold">{item.name}</h1>
      </header>
      <main className="border-y flex-wrap flex-col sm:flex-row gap-4 py-4 flex justify-center items-center">
        <div className="sm:me-auto flex justify-center items-center">
          <div className="flex gap-2 justify-center items-center">
            <Avatar className="w-14 h-14">
              <AvatarFallback className="">
                <ImageOff className="w-3 h-3 text-muted-foreground" />
              </AvatarFallback>
              <AvatarImage
                src={item.author?.image || item.author?.profileImage?.url || ""}
              />
            </Avatar>
            <div className="flex flex-col justify-center gap-1 items-start">
              <h3 className="font-semibold">{item.author?.name}</h3>
              <p className="text-sm text-muted-foreground">
                Uploaded {moment(item.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-1 items-center">
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
                schema="stories"
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
                schema="stories"
                currentLike={item._count.likes}
                isLiked={isLiked}
              />
            </TooltipTrigger>
            <TooltipContent>Likes</TooltipContent>
          </Tooltip>
        </div>
      </main>
    </div>
  );
}
