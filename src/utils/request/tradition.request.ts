export class TraditionRequests {
  static async GETId(id: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/traditions/id/${id}`
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
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/traditions/slug/${slug}`
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
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/traditions${q}`,
        { next: { revalidate: 60 } }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async POST(body: any) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/traditions`,
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
  static async PATCH(body: any, id?: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/traditions/id/${id}`,
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
  static async DELETE(id: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/traditions/id/${id}`,
        {
          method: "DELETE",
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
