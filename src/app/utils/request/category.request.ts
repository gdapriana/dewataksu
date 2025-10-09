export class CategoryRequests {
  static async GETs(query?: string) {
    const q = query ? `?${query}` : "";
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/categories${q}`
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
