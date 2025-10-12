import { TraditionCard } from "@/app/(root)/(client)/_components/card/tradition";
import SectionHeader from "@/app/(root)/(client)/_components/header/section-header";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TraditionRelation } from "@/utils/types";
import { Bookmark, Eye, Heart, Map, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function PopularTraditions({
  traditions,
}: {
  traditions: TraditionRelation[];
}) {
  return (
    <main className="w-full py-20 flex justify-center items-center">
      <div className="w-full flex flex-col justify-start items-stretch gap-12 max-w-7xl px-4">
        <SectionHeader
          title="Top Tradition"
          headline="Most Liked Tradition"
          description="
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              id corrupti porro eligendi quas repellendus adipisci sit accusamus
              reiciendis obcaecati.
            "
          cta={{ text: "Explore All Traditions", url: "/traditions" }}
        />

        <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {traditions.map((item: TraditionRelation) => (
            <TraditionCard item={item} key={item.id} />
          ))}
        </main>
      </div>
    </main>
  );
}
