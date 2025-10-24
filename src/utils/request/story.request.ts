import { StoryValidations } from "@/utils/validation/story.validation";
import z from "zod";

export class StoryRequests {
  static async GETSlug(slug: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/stories/slug/${slug}`
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  static async GETId(id: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/stories/id/${id}`
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  static async GETs(query?: string) {
    const q = query ? `?${query}` : "";
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/stories${q}`,
        { next: { revalidate: 60 } }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async POST(body: z.infer<typeof StoryValidations.POST>) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/stories`,
        {
          method: "POST",
          body: JSON.stringify(body),
          credentials: "include",
        }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async PATCH(
    id: string | undefined,
    body: z.infer<typeof StoryValidations.PATCH>
  ) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/stories/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(body),
          credentials: "include",
        }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
