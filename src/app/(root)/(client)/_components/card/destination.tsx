import EmptyImage from "@/app/(root)/(client)/_components/empty/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/helpers";
import { DestinationRelation } from "@/utils/types";
import { Bookmark, Eye, Heart, Layers, Map, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function DestinationCard({ item }: { item: DestinationRelation }) {
  return (
    <Link
      href={`/destinations/${item.slug}`}
      key={item.id}
      className="flex gap-4 overflow-hidden flex-col justify-start items-stretch"
    >
      <div className="aspect-video flex relative">
        <div className="absolute z-[2] bottom-0 right-0 m-2 flex justify-center items-center gap-1">
          {item?._count.likes > 0 && (
            <Badge>
              <Heart /> {formatNumber(item?._count.likes)}
            </Badge>
          )}
          {item?._count.bookmarks > 0 && (
            <Badge>
              <Bookmark /> {formatNumber(item?._count.bookmarks)}
            </Badge>
          )}
          {item?._count.views > 0 && (
            <Badge>
              <Eye /> {formatNumber(item?._count.views)}
            </Badge>
          )}
          {item.price == 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge>Free</Badge>
              </TooltipTrigger>
              <TooltipContent>Free Entry</TooltipContent>
            </Tooltip>
          )}
        </div>
        {!item.cover?.url ? (
          <EmptyImage className={{ icon: "w-6 h-6" }} />
        ) : (
          <Image
            priority={false}
            width={200}
            loading="lazy"
            quality={25}
            height={100}
            className="w-full aspect-video rounded-xl z-[1] h-full object-cover"
            src={item.cover.url}
            alt={item.name}
          />
        )}
      </div>
      <div className="flex flex-col justify-start items-start gap-2">
        <h3 className="font-semibold text-base">{item.name}</h3>
        <table className="mb-2">
          <tbody>
            <tr>
              <td>
                <MapPin className="w-4 h-4 mr-1" />
              </td>
              <td className="w-full">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm line-clamp-1 text-muted-foreground">
                      {item?.address}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>{item?.address}</TooltipContent>
                </Tooltip>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex w-full justify-center gap-1 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline" className="flex-1 text-xs">
                <Layers className="w-2 h-2" />
                {item.category.name}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Category</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline" className="flex-1 text-xs">
                <Map className="w-2 h-2" />
                {item.district.name}
              </Button>
            </TooltipTrigger>
            <TooltipContent>District</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Link>
  );
}

export function DestinationMiniCard({
  currentDestination,
  item,
  isEnd,
}: {
  currentDestination?: DestinationRelation;
  item: DestinationRelation;
  isEnd?: boolean;
}) {
  return (
    <Link
      className={cn(
        "py-4 flex flex-col justify-start items-stretch",
        !isEnd && "border-b",
        item.slug === currentDestination?.slug && "hidden"
      )}
      href={`/destinations/${item.slug}`}
    >
      <div className="flex gap-4 justify-center items-stretch">
        <div className="w-[100px] rounded-lg overflow-hidden flex justify-center items-center">
          {item.cover?.url ? (
            <Image
              width={100}
              loading="lazy"
              height={50}
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
            {item.content}
          </p>
        </div>
      </div>
      <div className="flex gap-1 mt-4 justify-end items-center flex-wrap">
        <Badge variant="outline">
          <Layers /> {item.category.name}
        </Badge>
        <Badge variant="outline">
          <Eye /> {formatNumber(item?._count.views)}
        </Badge>
        {item.price == 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline">Free</Badge>
            </TooltipTrigger>
            <TooltipContent>Free Entry</TooltipContent>
          </Tooltip>
        )}
      </div>
    </Link>
  );
}
