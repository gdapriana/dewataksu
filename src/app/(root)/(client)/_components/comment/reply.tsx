"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Session } from "@/utils/auth";
import { CommentRequests } from "@/utils/request/comment.request";
import { MainSchema, NestedComment } from "@/utils/types";
import { SendHorizonalIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function ReplyCard({
  session,
  schema,
  schemaId,
  openReply,
  parent,
  isParent,
}: {
  parent: NestedComment;
  schema: MainSchema;
  schemaId: string;
  session: Session | null;
  isParent: boolean;
  openReply: {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
  };
}) {
  const [repplyMsg, setRepplyMsg] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    toast.promise(
      (async () => {
        setIsSubmitting(true);
        const res = await CommentRequests.POST({
          body: repplyMsg,
          schema,
          schemaId,
          parentId: parent.id,
        });
        if (res.errors) {
          throw new Error(res.errors);
        }
        return res;
      })(),
      {
        success: () => {
          router.refresh();
          return "Comment success";
        },
        loading: "Loading...",
        error: (e) => {
          return e.errors;
        },
        finally: () => {
          openReply.setValue(false);
          setIsSubmitting(false);
        },
      }
    );
  };
  return (
    <form
      onSubmit={onFormSubmit}
      className={cn(
        "w-full p-4 flex-col gap-2 border-muted-foreground/10 rounded-xl border flex justify-start items-stretch",
        !openReply.value && "hidden",
        isParent && "mt-4"
      )}
    >
      <Textarea
        onChange={(e) => setRepplyMsg(e.target.value)}
        className="border-none outline-none shadow-none"
        placeholder={`Reply to ${parent.author.name}`}
        required
        disabled={isSubmitting}
      />
      <div className="flex gap-1 justify-end items-center">
        <Button
          disabled={isSubmitting}
          size="sm"
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={() => openReply.setValue(false)}
        >
          <X />
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          size="sm"
          variant="outline"
          className="cursor-pointer"
        >
          <SendHorizonalIcon />
          Send
        </Button>
      </div>
    </form>
  );
}
