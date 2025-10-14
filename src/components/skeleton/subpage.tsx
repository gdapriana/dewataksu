import { Skeleton } from "@/components/ui/skeleton";

export default function SubPageSkeleton() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <Skeleton className="h-8 w-40 mb-4" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-6" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        <div className="flex gap-4">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-64 w-24 rounded-2xl" />
          <Skeleton className="h-64 w-24 rounded-2xl" />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center mb-10">
        <Skeleton className="h-10 w-56 rounded-md" />
        <Skeleton className="h-10 w-40 rounded-md" />
        <Skeleton className="h-10 w-40 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
