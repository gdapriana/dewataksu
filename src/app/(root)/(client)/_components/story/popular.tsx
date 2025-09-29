import { StoryCard } from "@/app/(root)/(client)/_components/card/story";
import SectionHeader from "@/app/(root)/(client)/_components/header/section-header";
import { StoryRelation } from "@/utils/types";
export default function PopularStories({
  stories,
}: {
  stories: StoryRelation[];
}) {
  return (
    <main className="w-full py-20 flex justify-center items-center">
      <div className="w-full flex flex-col justify-start items-stretch gap-12 max-w-7xl px-4">
        <SectionHeader
          title="Top Stories"
          headline="Most Liked Stories from Travelers"
          description="
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              id corrupti porro eligendi quas repellendus adipisci sit accusamus
              reiciendis obcaecati.
            "
          cta={{ text: "Explore All Stories", url: "/stories" }}
        />

        <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {stories.map((item: StoryRelation) => (
            <StoryCard item={item} key={item.id} />
          ))}
        </main>
      </div>
    </main>
  );
}
