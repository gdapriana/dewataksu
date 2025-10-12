import { TraditionMiniCard } from "@/app/(root)/(client)/_components/card/tradition";
import SideHeader from "@/app/(root)/(client)/_components/header/side-header";
import { TraditionRelation } from "@/utils/types";
import { Palmtree } from "lucide-react";
import React from "react";

export default function PopularTraditionsSection({
  items,
  currentTradition,
}: {
  items: TraditionRelation[];
  currentTradition: TraditionRelation;
}) {
  return (
    <div className="flex flex-col gap-4 justify-start items-stretch">
      <SideHeader text="Also Popular Traditions" Icon={Palmtree} />
      <div className="flex flex-col justify-start items-stretch">
        {items.map((item: TraditionRelation, idx: number) => (
          <TraditionMiniCard
            currentTradition={currentTradition}
            isEnd={idx === items.length - 1}
            item={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}
