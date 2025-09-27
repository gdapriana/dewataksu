import { DestinationMiniCard } from "@/app/(root)/(client)/_components/card/destination";
import { DestinationRelation } from "@/utils/types";
import { Palmtree } from "lucide-react";
import React from "react";

export default function RelatedDestinations({
  items,
  currentDestination,
}: {
  items: DestinationRelation[];
  currentDestination: DestinationRelation;
}) {
  return (
    <div className="flex flex-col gap-4 justify-start items-stretch">
      <header className="flex border-b pb-4 justify-start items-center">
        <h2 className="font-bold text-lg flex gap-1 justify-start items-start">
          <Palmtree />
          Related Destinations
        </h2>
      </header>
      <div className="flex flex-col justify-start items-stretch">
        {items.map((item: DestinationRelation, idx: number) => (
          <DestinationMiniCard
            currentDestination={currentDestination}
            isEnd={idx === items.length - 1}
            item={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}
