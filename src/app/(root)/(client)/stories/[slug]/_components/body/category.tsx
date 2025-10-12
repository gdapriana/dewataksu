import SideHeader from "@/app/(root)/(client)/_components/header/side-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CategoryRelation } from "@/utils/types";
import { Layers } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PopularCategories({
  items,
}: {
  items: CategoryRelation[];
}) {
  return (
    <div className="flex flex-col gap-4 justify-start items-stretch">
      <SideHeader text="Popular Categories" Icon={Layers} />
      <div className="flex flex-wrap justify-start items-start gap-2">
        {items.map((item: CategoryRelation) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Button className="pr-2 pl-4" size="lg" variant="outline" asChild>
                <Link href="/">
                  {item.name}{" "}
                  <Badge variant="outline">{item._count.destinations}</Badge>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {item._count.destinations} destinations
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
