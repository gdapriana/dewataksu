import { StoryRelation } from "@/utils/types";
import Image from "next/image";
import moment from "moment";
import {
  Bookmark,
  Calendar,
  Eye,
  Heart,
  Settings,
  Trash,
  UserCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/utils/helpers";
import Link from "next/link";
import { cn } from "@/lib/utils";
import EmptyImage from "@/app/(root)/(client)/_components/empty/image";
import { Button } from "@/components/ui/button";
import DeleteStoryAlert from "@/app/(root)/_components/alert/delete/story";

export function StoryCard({
  item,
  userId,
}: {
  item: StoryRelation;
  userId?: string;
}) {
  return (
    <article className="flex gap-3 overflow-hidden flex-col relative justify-start items-stretch">
      <div className="flex relative rounded-xl overflow-hidden">
        {!item.isPublished && (
          <Badge
            className="absolute top-0 right-0 mt-4 mr-4"
            variant="destructive"
          >
            Unpublished
          </Badge>
        )}

        <div className="absolute left-0 bottom-0 mb-4 ml-4 flex justify-center items-center gap-1">
          {item._count.views > 0 && (
            <Badge variant="default">
              <Eye />
              {item._count.views}
            </Badge>
          )}
          {item._count.likes > 0 && (
            <Badge variant="default">
              <Heart />
              {item._count.likes}
            </Badge>
          )}
          {item._count.bookmarks > 0 && (
            <Badge variant="default">
              <Bookmark />
              {item._count.bookmarks}
            </Badge>
          )}
        </div>

        <div className="absolute bottom-0 right-0 "></div>
        {item.cover?.url ? (
          <Image
            width={400}
            height={400}
            loading="lazy"
            src={item.cover.url}
            alt={item.name}
            quality={25}
            className="aspect-square"
          />
        ) : (
          <EmptyImage className={{ wrapper: "aspect-square" }} />
        )}
      </div>

      <div className="flex flex-col justify-start items-start gap-1">
        <div className="flex justify-start items-center w-full gap-1">
          <Badge variant="outline" className="mb-2 mt-1">
            <Calendar /> {moment(item.createdAt).format("DD MMM y")}
          </Badge>
          <Badge
            variant="outline"
            className="mb-2 max-w-fit flex justify-center mt-1"
          >
            <UserCircle2 />
            <span className="line-clamp-1">{item.author.email}</span>
          </Badge>
        </div>

        <h3 className="line-clamp-2 font-bold text-lg">{item.name}</h3>
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {item.description}
        </p>
        <div className="flex mt-4 w-full justify-end items-center flex-wrap gap-2">
          {userId && item.author.id === userId && (
            <>
              <DeleteStoryAlert item={item} />
              <Button variant="outline" asChild size="sm">
                <Link href={`/profile/story/${item.id}`}>
                  <Settings />
                  Edit
                </Link>
              </Button>
            </>
          )}
          <Button variant="default" asChild size="sm">
            <Link href={`/stories/${item.slug}`}>Detail</Link>
          </Button>
        </div>
      </div>
    </article>
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
