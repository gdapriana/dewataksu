"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Session } from "@/utils/auth";
import { CommentRequests } from "@/utils/request/comment.request";
import { MainSchema } from "@/utils/types";
import { Plus, SendHorizonal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function NewComments({
  session,
  schema,
  schemaId,
}: {
  session: Session | null;
  schemaId: string;
  schema: MainSchema;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (open && !session) {
      router.replace("/login");
    }
  }, [open]);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    toast.promise(
      (async () => {
        setIsSubmitting(true);
        const res = await CommentRequests.POST({
          body: msg,
          schema,
          schemaId,
        });
        if (res.errors) {
          throw new Error(res.errors);
        }
        return res;
      })(),
      {
        success: () => {
          setOpen(false);
          router.refresh();
          return "Comment success";
        },
        loading: "Loading...",
        error: (e) => {
          return e.errors;
        },
        finally: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus /> Add comment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add comment</DialogTitle>
        <form
          onSubmit={onFormSubmit}
          className="flex gap-4 flex-col justify-start items-stretch"
        >
          <Textarea
            disabled={isSubmitting}
            placeholder="Your comment..."
            required
            onChange={(e) => setMsg(e.target.value)}
          ></Textarea>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isSubmitting} size="sm" variant="outline">
                <X />
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isSubmitting} size="sm">
              <SendHorizonal />
              Send
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
