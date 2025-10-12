import { DestinationCard } from "@/app/(root)/(client)/_components/card/destination";
import SectionHeader from "@/app/(root)/(client)/_components/header/section-header";
import { DestinationRelation } from "@/utils/types";
export default function PopularDesinations({
  destinations,
}: {
  destinations: DestinationRelation[];
}) {
  return (
    <main className="w-full py-20 flex justify-center items-center">
      <div className="w-full flex flex-col justify-start items-stretch gap-12 max-w-7xl px-4">
        <SectionHeader
          title="Top Destinations"
          headline="Our Most Liked Destinations"
          description="
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              id corrupti porro eligendi quas repellendus adipisci sit accusamus
              reiciendis obcaecati.
            "
          cta={{ text: "Explore All Destinations", url: "/destinations" }}
        />

        <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {destinations.map((item: DestinationRelation) => (
            <DestinationCard key={item.id} item={item} />
          ))}
        </main>
      </div>
    </main>
  );
}
