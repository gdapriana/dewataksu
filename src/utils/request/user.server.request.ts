import { MainSchema } from "@/utils/types";
import { headers } from "next/headers";

export class UserServerRequests {
  static GET = async (id?: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/users/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: (await headers()).get("cookie") ?? "",
          },
          next: { revalidate: 2 },
        }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static GETUserBookmarks = async (
    schma: MainSchema,
    controller: AbortController,
    id?: string,
    queries?: string
  ) => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BETTER_AUTH_URL
        }/api/users/${id}/bookmarks/${schma}${queries ? `?${queries}` : ""}`,
        {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: (await headers()).get("cookie") ?? "",
          },
          next: { revalidate: 10 },
        }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static GETUserLikes = async (
    schma: MainSchema,
    controller: AbortController,
    id?: string,
    queries?: string
  ) => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BETTER_AUTH_URL
        }/api/users/${id}/likes/${schma}${queries ? `?${queries}` : ""}`,
        {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: (await headers()).get("cookie") ?? "",
          },
          next: { revalidate: 10 },
        }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static GETUserStories = async (
    controller: AbortController,
    id?: string,
    queries?: string
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/users/${id}/stories${
          queries ? `?${queries}` : ""
        }`,
        {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: (await headers()).get("cookie") ?? "",
          },
          next: { revalidate: 10 },
        }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
}
