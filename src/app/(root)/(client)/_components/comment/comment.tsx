"use client";

import CommentCard from "@/app/(root)/(client)/_components/comment/card";
import NewComments from "@/app/(root)/(client)/_components/comment/new";
import Empty from "@/app/(root)/(client)/_components/empty/item";
import { Session } from "@/utils/auth";
import { flattenReplies } from "@/utils/helpers";
import { MainSchema, NestedComment } from "@/utils/types";
import { MessageCircleMore, MessageCircleOff } from "lucide-react";

export default function Comments({
  comments,
  schema,
  session,
  schemaId,
}: {
  comments: NestedComment[];
  schema: MainSchema;
  session: Session | null;
  schemaId: string;
}) {
  const flatenedComments = flattenReplies(comments);
  return (
    <div className="w-full flex-col mt-8 flex justify-start items-stretch">
      <header className="py-4 flex w-full justify-between items-center">
        <h2 className="font-bold text-2xl flex justify-start items-center line-clamp-1 gap-2">
          <MessageCircleMore className="" /> Comments
        </h2>
        <NewComments schema={schema} schemaId={schemaId} session={session} />
      </header>

      {flatenedComments.length === 0 && (
        <Empty
          Icon={MessageCircleOff}
          item="comment"
          className="aspect-[16/6]"
        />
      )}
      {flatenedComments.map((item: NestedComment, idx: number) => (
        <article
          className="flex flex-col justify-start items-stretch"
          key={item.id}
        >
          <CommentCard
            schema={schema}
            schemaId={schemaId}
            session={session}
            idx={idx}
            comment={item}
          />

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
                <div className="flex flex-1 flex-col justify-start items-stretch">
                  <CommentCard
                    schema={schema}
                    schemaId={schemaId}
                    session={session}
                    idx={idx}
                    comment={child}
                    isReply
                  />
                </div>
              </article>
            ))}
        </article>
      ))}
    </div>
  );
}
