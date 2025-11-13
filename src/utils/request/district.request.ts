import { DistrictRelation } from "@/utils/types";

export class DistrictRequests {
  static async POST(body: any) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/districts`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
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

  static async PATCH(district: DistrictRelation | undefined, body: any) {
    try {
      if (district?.name === body.name) body.name = undefined;
      if (district?.description === body.description)
        body.description = undefined;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/districts/id/${district?.id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
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

  static async GETId(id: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/districts/id/${id}`
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  static async GETSlug(slug: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/districts/slug/${slug}`
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
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/districts${q}`
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async DELETE(id: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/districts/id/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.errors) return new Error(data.errors);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
