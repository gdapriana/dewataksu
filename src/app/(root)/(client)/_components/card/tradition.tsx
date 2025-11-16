import EmptyImage from "@/app/(root)/(client)/_components/empty/image";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/helpers";
import { TraditionRelation } from "@/utils/types";
import { TooltipContent } from "@radix-ui/react-tooltip";
import {
  Bookmark,
  Eye,
  Heart,
  ImageOff,
  Layers,
  Map,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TraditionCard({ item }: { item: TraditionRelation }) {
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
        {item.description}
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
            width={800}
            height={400}
            loading="lazy"
            quality={25}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <EmptyImage />
        )}
      </div>
    </Link>
  );
}

export function TraditionMiniCard({
  currentTradition,
  item,
  isEnd,
}: {
  currentTradition: TraditionRelation;
  item: TraditionRelation;
  isEnd?: boolean;
}) {
  return (
    <Link
      className={cn(
        "py-4 flex flex-col justify-start items-stretch",
        !isEnd && "border-b",
        item.slug === currentTradition.slug && "hidden"
      )}
      href={`/traditions/${item.slug}`}
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
            {item.description}
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
