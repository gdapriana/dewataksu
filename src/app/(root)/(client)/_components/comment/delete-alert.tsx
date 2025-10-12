"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { CommentRequests } from "@/utils/request/comment.request";
import { NestedComment } from "@/utils/types";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CommentDeleteAlert({ comment }: { comment: NestedComment }) {
  const router = useRouter();
  const onDeleteSubmit = () => {
    toast.promise(
      (async () => {
        const res = await CommentRequests.DELETE(comment.id);
        if (res.errors) throw new Error(res.errors);
        return res;
      })(),
      {
        success: () => {
          router.refresh();
          return "Delete successfully";
        },
        error: (err) => err.errors,
        loading: "Processing...",
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Badge variant="destructive" className="cursor-pointer">
          <Trash />
          <p className="hidden md:inline">Delete</p>
        </Badge>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete comment?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            comment
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteSubmit}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
