import { DestinationMiniCard } from "@/app/(root)/(client)/_components/card/destination";
import SideHeader from "@/app/(root)/(client)/_components/header/side-header";
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
      <SideHeader text="Related Destinations" Icon={Palmtree} />
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
