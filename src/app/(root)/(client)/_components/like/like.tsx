"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Session } from "@/utils/auth";
import { formatNumber } from "@/utils/helpers";
import { LikeRequests } from "@/utils/request/like.request";
import { MainSchema } from "@/utils/types";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Like({
  currentLike,
  isLiked,
  schema,
  schemaId,
  session,
}: {
  currentLike: number;
  isLiked: boolean;
  schema: MainSchema;
  schemaId: string;
  session: Session | null;
}) {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setLikeCount(currentLike);
    setLiked(isLiked);
  }, []);

  const onButtonClicked = async () => {
    if (session && liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);

      toast.promise(
        (async () => {
          await LikeRequests.DELETE(schema, schemaId);
        })(),
        {
          success: () => {
            router.refresh();
            return "Success unliked";
          },
          loading: "Loading...",
          error: "Something went wrong",
        }
      );
    } else if (session && !liked) {
      setLiked(true);
      setLikeCount(likeCount + 1);
      toast.promise(
        (async () => {
          await LikeRequests.POST(schema, schemaId);
        })(),
        {
          success: () => {
            router.refresh();
            return "Success liked";
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
      <Heart className={cn("", liked && "fill-red-500 text-red-500")} />
      {formatNumber(likeCount)}
    </Button>
  );
}
