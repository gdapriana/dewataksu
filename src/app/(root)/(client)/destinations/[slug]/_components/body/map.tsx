import Empty from "@/app/(root)/(client)/_components/empty/item";
import { MapMinus } from "lucide-react";

export default function Map({ url }: { url?: string | null }) {
  return (
    <div className="w-full mt-8">
      {url ? (
        <div className="w-full rounded-3xl overflow-hidden aspect-square md:aspect-video">
          <iframe width="100%" height="100%" src={url}>
            popolazione comuni Italia mappa interattiva
          </iframe>
        </div>
      ) : (
        <Empty Icon={MapMinus} item="map" />
      )}
    </div>
  );
}
