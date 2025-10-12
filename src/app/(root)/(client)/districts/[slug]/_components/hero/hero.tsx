import EmptyImage from "@/app/(root)/(client)/_components/empty/image";
import { Badge } from "@/components/ui/badge";
import { DistrictRelation } from "@/utils/types";
import { District } from "@prisma/client";
import Image from "next/image";

export default function DistrictHero({
  district,
}: {
  district: DistrictRelation;
}) {
  return (
    <div className="w-full flex flex-col justify-start items-stretch gap-4">
      {district.cover?.url ? (
        <Image
          src={district.cover.url}
          alt={district.name}
          width={1920}
          height={1080}
          priority
          className="w-full aspect-video rounded-2xl"
        />
      ) : (
        <EmptyImage
          className={{ wrapper: "mb-4 rounded-3xl", icon: "w-10 h-10" }}
        />
      )}

      <div className="flex flex-col justify-start items-start gap-2">
        <h1 className="text-xl md:text-2xl font-bold">{district.name} </h1>
        <div className="flex justify-start items-start gap-1 my-1">
          <Badge variant="outline">
            {district._count.destinations || "No"} Destinations
          </Badge>
          <Badge variant="outline">
            {district._count.traditions || "No"} Traditions
          </Badge>
        </div>
        <p className="text-muted-foreground">{district.description}</p>
      </div>

      <div className="flex"></div>
    </div>
  );
}
