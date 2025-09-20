import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import formatNumber from "@/utils/helpers";
import { TraditionRelation } from "@/utils/types";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Bookmark, Eye, Heart, Map, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TraditionCard({ item }: { item: TraditionRelation }) {
  return (
    <Link
      href={`/traditions/${item.slug}`}
      className="flex border border-muted-foreground/20 group p-4 hover:bg-primary rounded-3xl flex-col justify-start items-start gap-2"
      key={item.id}
    >
      <h3 className="text-lg group-hover:text-background font-bold">
        {item.name}
      </h3>
      <table className="mb-2">
        <tbody>
          <tr>
            <td>
              <MapPin className="w-3 h-3 mr-1 text-muted-foreground" />
            </td>
            <td>
              <p className="text-muted-foreground text-sm line-clamp-1">
                {item.address || "National"}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="text-sm line-clamp-2 group-hover:text-background">
        {item.content}
      </p>

      <div className="flex mt-2 w-full justify-end items-center gap-1">
        {item._count.likes > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className="group-hover:bg-background" variant="outline">
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
              <Badge className="group-hover:bg-background" variant="outline">
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
              <Badge className="group-hover:bg-background" variant="outline">
                <Eye />
                {formatNumber(item._count.views)}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>Total Views</TooltipContent>
          </Tooltip>
        )}
        {item.district?.name && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className="group-hover:bg-background" variant="outline">
                <Map />
                {item.district.name}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>District</TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="w-full flex-1 mt-4 overflow-hidden rounded-2xl">
        {item.cover?.url ? (
          <Image
            src={item.cover.url}
            width={1920}
            height={1080}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            alt={item.name}
          />
        )}
      </div>
    </Link>
  );
}
