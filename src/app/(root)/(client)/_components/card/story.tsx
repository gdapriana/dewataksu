import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StoryRelation } from "@/utils/types";
import Image from "next/image";
import moment from "moment";
import { Bookmark, Calendar, Eye, Heart, ImageOff, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/utils/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import EmptyImage from "@/app/(root)/(client)/_components/empty/image";

export function StoryCard({ item }: { item: StoryRelation }) {
  return (
    <Link
      href={`/stories/${item.slug}`}
      className="aspect-[12/16] relative flex rounded-4xl overflow-hidden"
    >
      <div className="absolute z-[3] p-4 bottom-0 left-0 w-full flex justify-center items-center">
        <div className="bg-transparent p-2 w-full rounded-xl flex-col flex justify-start items-stretch">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="line-clamp-1 flex justify-start items-center text-xs text-white/90">
                <Calendar className="w-4 h-4 mr-1" />
                {moment(item.createdAt).format("DD MMM YYYY")}
              </p>
            </TooltipTrigger>
            <TooltipContent>Uploaded time</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="line-clamp-2 text-white text-lg my-2 font-bold">
                {item.name}
              </h3>
            </TooltipTrigger>
            <TooltipContent>{item.name}</TooltipContent>
          </Tooltip>
          <div className="flex my-2 w-full justify-end items-center gap-1">
            {item._count.likes > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary">
                    <Heart />
                    {formatNumber(item._count.likes)}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Total Likes</TooltipContent>
              </Tooltip>
            )}
            {item._count.bookmarks > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary">
                    <Bookmark />
                    {formatNumber(item._count.bookmarks)}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Total Bookmarks</TooltipContent>
              </Tooltip>
            )}
            {item._count.views > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary">
                    <Eye />
                    {formatNumber(item._count.views)}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Total Views</TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="flex bg-background py-2 px-3 rounded-2xl items-stretch gap-3">
            <div className="flex justify-center items-center">
              <Avatar className="rounded-lg">
                <AvatarFallback>
                  <User className="w-3 h-3" />
                </AvatarFallback>
                <AvatarImage
                  src={item.author.image || item.author.profileImage?.url || ""}
                />
              </Avatar>
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="line-clamp-1 font-semibold">{item.author.name}</p>
              <p className="line-clamp-1 text-sm text-foreground">
                {item.author.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-[2] left-0 top-0 w-full h-full card-gradient"></div>
      <Image
        src={
          item?.cover?.url ||
          "https://images.unsplash.com/photo-1750564042970-27123995da1b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt={item.name}
        width={1080}
        height={1920}
        className="absolute z-[1] w-full h-full object-cover left-0 top-0"
      />
    </Link>
  );
}

export function StoryMiniCard({
  currentStory,
  item,
  isEnd,
}: {
  currentStory: StoryRelation;
  item: StoryRelation;
  isEnd?: boolean;
}) {
  return (
    <Link
      className={cn(
        "py-4 flex flex-col justify-start items-stretch",
        !isEnd && "border-b",
        item.slug === currentStory.slug && "hidden"
      )}
      href={`/stories/${item.slug}`}
    >
      <div className="flex gap-4 justify-center items-stretch">
        <div className="w-[100px] rounded-lg overflow-hidden flex justify-center items-center">
          {item.cover?.url ? (
            <Image
              width={1000}
              height={1000}
              alt={item.name}
              src={item.cover.url}
              quality={25}
              className="w-full h-full object-cover"
            />
          ) : (
            <EmptyImage />
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center items-start">
          <h3 className="font-bold">{item.name}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            by {item.author.name}
          </p>
        </div>
      </div>
      <div className="flex gap-1 mt-4 justify-end items-center flex-wrap">
        <Badge variant="outline">
          <Eye /> {formatNumber(item?._count.views)}
        </Badge>
      </div>
    </Link>
  );
}
