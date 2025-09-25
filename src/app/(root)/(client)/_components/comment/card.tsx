"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Session } from "@/utils/auth";
import { NestedComment } from "@/utils/types";
import { Clock, Reply, Trash2Icon, TriangleAlert, User } from "lucide-react";
import moment from "moment";

export default function CommentCard({
  comment,
  idx,
  isReply = false,
  session,
}: {
  comment: NestedComment;
  idx: number;
  isReply?: boolean;
  session: Session | null;
}) {
  return (
    <article
      className={cn(
        "flex-1 border-muted-foreground/10 border gap-x-4 gap-y-2 hover:bg-muted-foreground/5 p-4 rounded-xl grid grid-cols-[auto_1fr] grid-rows-[auto_auto_auto]",
        isReply && idx === 0 && "my-4",
        isReply && idx !== 0 && "mb-4"
      )}
    >
      <div className="flex justify-center items-center">
        <Avatar>
          <AvatarFallback>
            <User className="w-3 h-3" />
          </AvatarFallback>
          <AvatarImage src={comment.author.profileImage?.url || ""} />
        </Avatar>
      </div>
      <div className="flex justify-start gap-2 items-center">
        <h3 className="text-sm md:text-base font-semibold line-clamp-1">
          {comment.author.name}
        </h3>
        <p className="text-muted-foreground">
          {moment(comment.createdAt).fromNow()}
        </p>
      </div>
      <div className="row-span-2"></div>
      <div className="">
        <p className="text-muted-foreground">{comment.body}</p>
      </div>
      <div className="flex mt-4 gap-1 justify-end items-center">
        {isReply && (
          <Badge variant="outline" className="line-clamp-1 me-auto">
            replying @{comment.parent?.author.name}
          </Badge>
        )}
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="outline">
              <TriangleAlert />
              <p className="hidden md:inline">Report</p>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Report</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="outline">
              <Reply />
              <p className="hidden md:inline">Reply</p>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Reply</TooltipContent>
        </Tooltip>
        {session && session.user.id === comment.author.id && (
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="destructive">
                <Trash2Icon />
                <p className="hidden md:inline">Delete</p>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        )}
      </div>
    </article>
  );
}
