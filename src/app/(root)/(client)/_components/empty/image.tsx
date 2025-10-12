import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

export default function EmptyImage({
  className,
}: {
  className?: { wrapper?: string; icon?: string };
}) {
  return (
    <div
      className={cn(
        "w-full aspect-video rounded-xl bg-muted-foreground/5 flex justify-center items-center",
        className?.wrapper
      )}
    >
      <ImageOff
        className={cn("w-4 h-4 text-muted-foreground/10", className?.icon)}
      />
    </div>
  );
}
