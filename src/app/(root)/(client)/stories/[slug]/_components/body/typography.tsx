export default function StoryTypography({ body }: { body: string }) {
  return (
    <div
      className="w-full prose my-8"
      dangerouslySetInnerHTML={{ __html: body }}
    ></div>
  );
}
