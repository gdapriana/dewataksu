import { StoryMiniCard } from "@/app/(root)/(client)/_components/card/story";
import SideHeader from "@/app/(root)/(client)/_components/header/side-header";
import { StoryRelation } from "@/utils/types";
import { Palmtree } from "lucide-react";
import React from "react";

export default function PopularStoriesSection({
  items,
  currentStories,
}: {
  items: StoryRelation[];
  currentStories: StoryRelation;
}) {
  return (
    <div className="flex flex-col gap-4 justify-start items-stretch">
      <SideHeader text="Also Popular Stories" Icon={Palmtree} />
      <div className="flex flex-col justify-start items-stretch">
        {items.map((item: StoryRelation, idx: number) => (
          <StoryMiniCard
            currentStory={currentStories}
            isEnd={idx === items.length - 1}
            item={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}
