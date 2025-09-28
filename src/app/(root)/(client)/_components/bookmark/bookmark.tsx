"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Session } from "@/utils/auth";
import { formatNumber } from "@/utils/helpers";
import { BookmarkRequests } from "@/utils/request/bookmark.request";
import { MainSchema } from "@/utils/types";
import { BookmarkIcon, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Bookmark({
  currentBookmark,
  isBookmarked,
  schema,
  schemaId,
  session,
}: {
  currentBookmark: number;
  isBookmarked: boolean;
  schema: MainSchema;
  schemaId: string;
  session: Session | null;
}) {
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setBookmarkCount(currentBookmark);
    setBookmarked(isBookmarked);
  }, []);

  const onButtonClicked = async () => {
    if (session && bookmarked) {
      setBookmarked(false);
      setBookmarkCount(bookmarkCount - 1);

      toast.promise(
        (async () => {
          await BookmarkRequests.DELETE(schema, schemaId);
        })(),
        {
          success: () => {
            router.refresh();
            return "Success unbookmarked";
          },
          loading: "Loading...",
          error: "Something went wrong",
        }
      );
    } else if (session && !bookmarked) {
      setBookmarked(true);
      setBookmarkCount(bookmarkCount + 1);
      toast.promise(
        (async () => {
          await BookmarkRequests.POST(schema, schemaId);
        })(),
        {
          success: () => {
            router.refresh();
            return "Success bookmarked";
          },
          loading: "Loading...",
          error: "Something went wrong",
        }
      );
    } else {
      router.push("/login");
    }
  };

  return (
    <Button size="sm" onClick={onButtonClicked}>
      <BookmarkIcon
        className={cn("", bookmarked && "fill-red-500 text-red-500")}
      />
      {formatNumber(bookmarkCount)}
    </Button>
  );
}
