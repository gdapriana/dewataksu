import StoryForm from "@/app/(root)/(client)/profile/story/_components/form/form";
import { auth, Session } from "@/utils/auth";
import { StoryRequests } from "@/utils/request/story.request";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [story] = await Promise.all([StoryRequests.GET(id)]);

  const session: Session | null = await auth.api.getSession({
    headers: await headers(),
  });

  if (!story) return notFound();
  if (story && !story.success) return notFound();
  if (story && story.result.author.id !== session?.user.id) return notFound();

  return (
    <main className="flex gap-8 flex-col justify-start items-stretch">
      <div className="py-4">
        <h1 className="font-bold text-lg text-center">Update Story</h1>
      </div>
      <StoryForm mode="patch" currentStory={story.result} />;
    </main>
  );
}
