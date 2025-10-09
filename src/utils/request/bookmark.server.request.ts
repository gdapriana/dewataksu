import { MainSchema } from "@/utils/types";
import { headers } from "next/headers";

export class BookmarkServerRequests {
  static GET = async (schema: MainSchema, id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/bookmarks/${schema}/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: (await headers()).get("cookie") ?? "",
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
