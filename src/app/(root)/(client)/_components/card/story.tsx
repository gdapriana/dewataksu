import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StoryRelation } from "@/utils/types";
import Image from "next/image";
import moment from "moment";
import { Bookmark, Calendar, Eye, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import formatNumber from "@/utils/helpers";

export default function StoryCard({ item }: { item: StoryRelation }) {
  return (
    <article className="aspect-[12/16] relative flex rounded-4xl overflow-hidden">
      <div className="absolute z-[2] p-4 bottom-0 left-0 w-full flex justify-center items-center">
        <div className="bg-background p-4 w-full rounded-xl flex-col flex justify-start items-stretch">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="line-clamp-1 flex justify-start items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {moment(item.createdAt).format("DD MMM YYYY")}
              </p>
            </TooltipTrigger>
            <TooltipContent>Uploaded time</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="line-clamp-2 text-lg my-2 font-bold">
                {item.name}
              </h3>
            </TooltipTrigger>
            <TooltipContent>{item.name}</TooltipContent>
          </Tooltip>

          <div className="flex mt-2 w-full justify-end items-center gap-1">
            {item._count.likes > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    className="group-hover:bg-background"
                    variant="outline"
                  >
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
                  <Badge
                    className="group-hover:bg-background"
                    variant="outline"
                  >
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
                  <Badge
                    className="group-hover:bg-background"
                    variant="outline"
                  >
                    <Eye />
                    {formatNumber(item._count.views)}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Total Views</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
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
    </article>
  );
}
