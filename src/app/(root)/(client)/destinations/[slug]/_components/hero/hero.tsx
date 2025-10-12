import EmptyImage from "@/app/(root)/(client)/_components/empty/image";
import { DestinationRelation } from "@/utils/types";
import Image from "next/image";

export default function DestinationHero({
  item,
}: {
  item: DestinationRelation;
}) {
  if (!item.cover?.url)
    return (
      <EmptyImage
        className={{ wrapper: "mb-4 rounded-3xl", icon: "w-10 h-10" }}
      />
    );
  return (
    <div className="relative flex w-full md:aspect-[16/9] mb-4 rounded-4xl overflow-hidden aspect-square">
      <Image
        width={1000}
        height={1000}
        className="absolute w-full h-full object-cover left-0 top-0 z-[1]"
        alt={item.name}
        src={item.cover?.url}
      />
    </div>
  );
}
