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
        <p>No map provided</p>
      )}
    </div>
  );
}
