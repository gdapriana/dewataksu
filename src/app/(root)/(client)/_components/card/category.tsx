import { Badge } from "@/components/ui/badge";
import { CategoryRelation } from "@/utils/types";
import { ArrowUpRight, Palmtree } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ item }: { item: CategoryRelation }) {
  return (
    <article
      key={item.id}
      className="relative flex aspect-[9/12] rounded-3xl overflow-hidden"
    >
      <div className="absolute z-[2] w-full flex justify-center items-center left-0 bottom-0">
        <div className="m-4 rounded-xl gap-2 w-full flex flex-col justify-start items-stretch">
          <h3 className="font-bold text-lg text-white">{item.name}</h3>
          {item._count.destinations > 0 && (
            <Badge>
              <Palmtree />
              {item._count.destinations} Destinations
            </Badge>
          )}
          <p className="text-white/80 text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing.
          </p>
          <div className="flex justify-end mt-3 items-center">
            <Link
              className="bg-white p-4 rounded-full hover:bg-neutral-900 group"
              href={`/categories/${item.slug}`}
            >
              <ArrowUpRight className="text-neutral-900 transition-all group-hover:text-white group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </div>
      {item.cover?.url ? (
        <Image
          alt={item.name}
          src={item.cover.url}
          width={1000}
          height={1000}
          className="absolute object-cover z-[1] left-0 top-0 w-full h-full"
        />
      ) : (
        <Image
          alt={item.name}
          src="https://images.unsplash.com/photo-1757502399162-2ce03568bd0e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={1000}
          height={1000}
          className="absolute object-cover z-[1] left-0 top-0 w-full h-full"
        />
      )}
    </article>
  );
}
