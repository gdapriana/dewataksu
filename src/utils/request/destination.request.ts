export class DestinationRequests {
  static async GET(slug: string) {
    try {
      const response = await fetch(
        `${process.env.BETTER_AUTH_URL}/api/destinations/${slug}`,
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
        `${process.env.BETTER_AUTH_URL}/api/destinations${q}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
