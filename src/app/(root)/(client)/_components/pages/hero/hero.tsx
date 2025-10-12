"use client";

import HeroPageCardWrapper from "@/app/(root)/(client)/_components/pages/hero/card";
import { Button } from "@/components/ui/button";
import {
  DestinationRelation,
  MainSchema,
  StoryRelation,
  TraditionRelation,
} from "@/utils/types";

export default function PageHero({
  schema,
  text,
  items,
}: {
  schema: MainSchema;
  text: { title: string; subtitle: string };
  items: {
    destinations?: DestinationRelation[];
    traditions?: TraditionRelation[];
    stories?: StoryRelation[];
  };
}) {
  return (
    <div className="w-full relative flex justify-center items-center">
      <div className="w-full flex flex-col justify-start items-stretch gap-6 max-w-7xl px-4 py-2 md:py-4">
        <div className="flex flex-col justify-start gap-8 items-stretch md:flex-row">
          <div className="md:w-2/5 relative gap-2 flex flex-col justify-center items-start">
            <h1 className="text-2xl font-bold">{text.title}</h1>
            <p className="text-muted-foreground">{text.subtitle}</p>
            <Button size="lg" className="mt-3">
              Explore More
            </Button>
          </div>
          <div className="md:w-3/5">
            <HeroPageCardWrapper schema={schema} items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
