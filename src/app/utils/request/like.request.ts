import { MainSchema } from "@/utils/types";

export class LikeRequests {
  static POST = async (schema: MainSchema, id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/likes/${schema}/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static DELETE = async (schema: MainSchema, id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/likes/${schema}/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Cookie: (await headers()).get("cookie") ?? "",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
}
