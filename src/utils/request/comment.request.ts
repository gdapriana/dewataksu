export class CommentRequests {
  static GETs = async (schema: string, id: string) => {
    try {
      const response = await fetch(
        `${process.env.BETTER_AUTH_URL}/api/comments/${schema}/${id}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
}
