import StoryForm from "@/app/(root)/(client)/profile/story/_components/form/form";

export default function Page() {
  return (
    <main className="flex gap-8 flex-col justify-start items-stretch">
      <div className="py-4">
        <h1 className="font-bold text-lg text-center">Post New Story</h1>
      </div>
      <StoryForm mode="post" />;
    </main>
  );
}
