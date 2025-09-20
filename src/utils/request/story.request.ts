export class StoryRequests {
  static async GETs(query?: string) {
    const q = query ? `?${query}` : "";
    try {
      const response = await fetch(
        `${process.env.BETTER_AUTH_URL}/api/stories${q}`,
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
