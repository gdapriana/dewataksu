"use client";

import CommentCard from "@/app/(root)/(client)/_components/comment/card";
import { Session } from "@/utils/auth";
import { flattenReplies } from "@/utils/helpers";
import { NestedComment } from "@/utils/types";

export default function Comments({
  comments,
  session,
}: {
  comments: NestedComment[];
  session: Session | null;
}) {
  const flatenedComments = flattenReplies(comments);
  return (
    <div className="w-full flex-col mt-8 flex justify-start items-stretch">
      {flatenedComments.map((item: NestedComment, idx: number) => (
        <article
          className="flex flex-col justify-start items-stretch"
          key={item.id}
        >
          <CommentCard session={session} idx={idx} comment={item} />

          {item.replies.length > 0 &&
            item.replies.map((child: NestedComment, idx: number) => (
              <article
                className="flex flex-row justify-center items-stretch"
                key={child.id}
              >
                <div className="w-16 flex justify-center items-stretch relative">
                  <div className="w-1/2 h-1/2  border-b-[2px] border-muted-foreground/10 absolute right-0 top-0"></div>
                  {idx + 1 !== item.replies.length ? (
                    <div className="w-[2px] bg-muted-foreground/10"></div>
                  ) : (
                    <div className="w-[2px] h-1/2 bg-muted-foreground/10"></div>
                  )}
                </div>
                <CommentCard
                  session={session}
                  idx={idx}
                  comment={child}
                  isReply
                />
              </article>
            ))}
        </article>
      ))}
    </div>
  );
}
