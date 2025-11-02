import { Skeleton } from "@/components/ui/skeleton";

export default function PostNewStorySkeleton() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="h-7 w-48 mx-auto mb-10">
        <Skeleton className="w-full h-full bg-neutral-800" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-6">
          {/* Title input */}
          <div className="space-y-2">
            <Skeleton className="w-24 h-4 bg-neutral-800" />
            <Skeleton className="w-full h-10 bg-neutral-800 rounded-md" />
            <Skeleton className="w-2/3 h-3 bg-neutral-800" />
          </div>

          {/* Description input */}
          <div className="space-y-2">
            <Skeleton className="w-24 h-4 bg-neutral-800" />
            <Skeleton className="w-full h-24 bg-neutral-800 rounded-md" />
            <Skeleton className="w-1/2 h-3 bg-neutral-800" />
          </div>

          {/* Picture input */}
          <div className="space-y-2">
            <Skeleton className="w-20 h-4 bg-neutral-800" />
            <Skeleton className="w-full h-10 bg-neutral-800 rounded-md" />
          </div>

          {/* Published switch */}
          <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
            <div className="space-y-1">
              <Skeleton className="w-20 h-4 bg-neutral-800" />
              <Skeleton className="w-40 h-3 bg-neutral-800" />
            </div>
            <Skeleton className="w-10 h-6 bg-neutral-800 rounded-full" />
          </div>
        </div>

        {/* Right column (editor placeholder) */}
        <div className="space-y-3">
          <Skeleton className="w-20 h-4 bg-neutral-800" />
          <Skeleton className="w-full h-[450px] bg-neutral-800 rounded-md" />
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end gap-3 mt-10">
        <Skeleton className="w-20 h-9 bg-neutral-800 rounded-md" />
        <Skeleton className="w-20 h-9 bg-neutral-800 rounded-md" />
      </div>
    </div>
  );
}
