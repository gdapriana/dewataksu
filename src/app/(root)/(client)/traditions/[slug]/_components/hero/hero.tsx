import { DestinationRelation, TraditionRelation } from "@/utils/types";
import Image from "next/image";

export default function TraditionHero({ item }: { item: TraditionRelation }) {
  return (
    <div className="relative flex w-full md:aspect-[16/9] mb-4 rounded-4xl overflow-hidden aspect-square">
      <Image
        width={1000}
        height={1000}
        className="absolute w-full h-full object-cover left-0 top-0 z-[1]"
        alt={item.name}
        src={
          item.cover?.url ||
          "https://images.unsplash.com/photo-1750494733502-30427edd0efc?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
    </div>
  );
}
