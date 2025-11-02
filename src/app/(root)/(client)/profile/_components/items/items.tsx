import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Liked from "@/app/(root)/(client)/profile/_components/items/liked";
import Stories from "@/app/(root)/(client)/profile/_components/items/stories";
import Bookmarked from "@/app/(root)/(client)/profile/_components/items/bookmarked";
import ProfileItemsSkeleton from "@/components/skeleton/profile-items";

export default function Items({ userId }: { userId?: string }) {
  return (
    <div className="flex flex-col justify-start items-stretch">
      <Tabs defaultValue="stories" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="stories">Your Stories</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          <TabsTrigger value="liked">Liked</TabsTrigger>
        </TabsList>

        <TabsContent value="stories">
          <Suspense fallback={<ProfileItemsSkeleton />}>
            <Stories userId={userId} />
          </Suspense>
        </TabsContent>

        <TabsContent value="bookmarked">
          <Suspense fallback={<ProfileItemsSkeleton />}>
            <Tabs defaultValue="destinations">
              <TabsList className="w-full">
                <TabsTrigger value="destinations">Destinations</TabsTrigger>
                <TabsTrigger value="traditions">Traditions</TabsTrigger>
                <TabsTrigger value="stories">Stories</TabsTrigger>
              </TabsList>
              <TabsContent value="destinations">
                <Bookmarked schema="destinations" userId={userId} />
              </TabsContent>
              <TabsContent value="traditions">
                <Bookmarked schema="traditions" userId={userId} />
              </TabsContent>
              <TabsContent value="stories">
                <Bookmarked schema="stories" userId={userId} />
              </TabsContent>
            </Tabs>
          </Suspense>
        </TabsContent>

        <TabsContent value="liked">
          <Suspense fallback={<ProfileItemsSkeleton />}>
            <Tabs defaultValue="destinations">
              <TabsList className="w-full">
                <TabsTrigger value="destinations">Destinations</TabsTrigger>
                <TabsTrigger value="traditions">Traditions</TabsTrigger>
                <TabsTrigger value="stories">Stories</TabsTrigger>
              </TabsList>
              <TabsContent value="destinations">
                <Liked schema="destinations" userId={userId} />
              </TabsContent>
              <TabsContent value="traditions">
                <Liked schema="traditions" userId={userId} />
              </TabsContent>
              <TabsContent value="stories">
                <Liked schema="stories" userId={userId} />
              </TabsContent>
            </Tabs>
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
