export class TraditionRequests {
  static async GET(slug: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/traditions/${slug}`,
        { cache: "no-store" }
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
        {
          cache: "no-store",
        }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
