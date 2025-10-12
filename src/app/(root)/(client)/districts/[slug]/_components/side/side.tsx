import { DestinationMiniCard } from "@/app/(root)/(client)/_components/card/destination";
import SideHeader from "@/app/(root)/(client)/_components/header/side-header";
import { DestinationRelation } from "@/utils/types";
import { Palmtree } from "lucide-react";
import React from "react";

export default function Sidebar({
  items,
  title,
}: {
  items: DestinationRelation[];
  title?: string;
}) {
  return (
    <div className="flex flex-col gap-4 justify-start items-stretch">
      <SideHeader text={title || "Related Destinations"} Icon={Palmtree} />
      <div className="flex flex-col justify-start items-stretch">
        {items.map((item: DestinationRelation, idx: number) => (
          <DestinationMiniCard
            isEnd={idx === items.length - 1}
            item={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}
