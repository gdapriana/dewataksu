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
import { Button } from "@/components/ui/button";
import { StoryRequests } from "@/utils/request/story.request";
import { TraditionRequests } from "@/utils/request/tradition.request";
import { StoryRelation, TraditionRelation } from "@/utils/types";
import { Trash, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteTraditionAlert({
  item,
}: {
  item: TraditionRelation;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    setLoading(true);
    try {
      await toast.promise(TraditionRequests.DELETE(item.id), {
        loading: "Deleting...",
        success: "Success!",
        error: (err) => err?.message || "Failed to delete",
      });
      router.push("/admin/traditions");
      setOpen(false);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Tradition</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to delete <b>{item.name}</b>?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} disabled={loading}>
            {loading ? "Deleting..." : "Yes"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
