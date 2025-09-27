import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

export default function Empty({
  Icon,
  item,
  className,
}: {
  Icon: LucideIcon;
  item: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full hover:bg-muted-foreground/5 transition duration-300 rounded-2xl aspect-video flex justify-center items-center",
        className
      )}
    >
      <div className="flex flex-col justify-start items-center gap-2">
        <Icon className="w-5 h-5 text-muted-foreground" />
        <p className="text-muted-foreground">No {item} found</p>
      </div>
    </div>
  );
}
