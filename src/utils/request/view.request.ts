import { MainSchema } from "@/utils/types";
import { headers } from "next/headers";

export class ViewRequests {
  static POST = async (body: { schema: MainSchema; schemaId: string }) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/views`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: (await headers()).get("cookie") ?? "",
        },
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.log(e);
    }
  };
}
