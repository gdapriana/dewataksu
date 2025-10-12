import CategoryCard from "@/app/(root)/(client)/_components/card/category";
import SectionHeader from "@/app/(root)/(client)/_components/header/section-header";
import { Badge } from "@/components/ui/badge";
import { CategoryRelation } from "@/utils/types";
import { ArrowUpRight, Palmtree } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function PopularCategories({
  categories,
}: {
  categories: CategoryRelation[];
}) {
  return (
    <main className="w-full py-20 flex justify-center items-center">
      <div className="w-full flex flex-col justify-start items-stretch gap-12 max-w-7xl px-4">
        <SectionHeader
          title="Categories"
          headline="Pick favorited Categories"
          description="
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              id corrupti porro eligendi quas repellendus adipisci sit accusamus
              reiciendis obcaecati.
            "
          cta={{ text: "Explore All categories", url: "/categories" }}
        />

        <main className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((item: CategoryRelation) => (
            <CategoryCard item={item} key={item.id} />
          ))}
        </main>
      </div>
    </main>
  );
}
