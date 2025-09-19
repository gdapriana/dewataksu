import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowBigDownDash } from "lucide-react";

export default function Hero() {
  return (
    <main className="w-full flex justify-center items-center">
      <div className="w-full max-w-7xl flex-col justify-start items-stretch flex md:flex-row py-8 px-4">
        <div className="md:w-1/2 gap-4 flex flex-col items-start justify-center">
          <Badge variant="secondary">dewataksu</Badge>
          <h1 className="text-2xl md:text-4xl font-black">
            Lorem ipsum dolor sit.
          </h1>
          <p className="text-muted-foreground">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
            autem consequuntur tenetur est? Sed, labore placeat sapiente
          </p>
          <Button size="lg" className="font-bold mt-4">
            Explore Now
            <ArrowBigDownDash />
          </Button>
        </div>
        <div className="md:w-1/2"></div>
      </div>
    </main>
  );
}
