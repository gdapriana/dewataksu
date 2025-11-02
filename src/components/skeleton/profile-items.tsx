import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileItems() {
  return (
    <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[1, 2, 3, 4].map(() => (
        <Skeleton className="h-[400px]"></Skeleton>
      ))}
    </div>
  );
}
