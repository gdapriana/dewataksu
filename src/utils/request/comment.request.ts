import { MainSchema } from "@/utils/types";
import { CommentValidations } from "@/utils/validation/comment.validation";
import z from "zod";

export class CommentRequests {
  static POST = async (
    body: z.infer<typeof CommentValidations.POST>,
    parentId?: string
  ) => {
    try {
      if (parentId) {
        body.parentId = parentId;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/comments`,
        {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  static GETs = async (schema: MainSchema, id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/comments/${schema}/${id}`,
        { next: { revalidate: 5 } }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static DELETE = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/comments/delete/${id}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
}
