export default function TraditionTypography({ body }: { body: string }) {
  return (
    <div
      className="w-full prose my-8"
      dangerouslySetInnerHTML={{ __html: body }}
    ></div>
  );
}
