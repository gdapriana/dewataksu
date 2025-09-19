import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import React from "react";

export default function SectionHeader({
  title,
  headline,
  description,
  cta,
}: {
  title: string;
  headline: string;
  description: string;
  cta?: {
    url: string;
    text: string;
  };
}) {
  return (
    <header className="flex justify-center items-center w-full">
      <div className="flex w-full md:w-1/2 gap-4 flex-col justify-center items-start">
        <Badge variant="outline">{title}</Badge>
        <h2 className="text-2xl font-black">{headline}</h2>
      </div>
      <div className="hidden md:flex md:w-1/2 flex-col gap-2">
        <p className="text-muted-foreground">{description}</p>

        {cta && (
          <a
            className="flex border-b border-primary hover:opacity-80 justify-center items-center gap-2 me-auto font-semibold"
            href={`${cta.url}`}
          >
            {cta.text}
            <ArrowUpRight />
          </a>
        )}
      </div>
    </header>
  );
}
