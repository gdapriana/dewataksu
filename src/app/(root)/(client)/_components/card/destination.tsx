import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import formatNumber from "@/utils/helpers";
import { DestinationRelation } from "@/utils/types";
import { Destination } from "@prisma/client";
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

export default function DestinationCard({
  item,
}: {
  item: DestinationRelation;
}) {
  return (
    <Link
      href={`/destinations/${item.slug}`}
      key={item.id}
      className="flex rounded-xl gap-4 overflow-hidden flex-col justify-start items-stretch"
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
          <div className="w-full h-full z-[1] flex justify-center items-center bg-muted-foreground/20">
            <ImageOff />
          </div>
        ) : (
          <Image
            width={1920}
            height={1080}
            className="w-full z-[1] h-full object-cover"
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
              <Button size="sm" className="flex-1 text-xs">
                <Layers className="w-2 h-2" />
                {item.category.name}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Category</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" className="flex-1 text-xs">
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
