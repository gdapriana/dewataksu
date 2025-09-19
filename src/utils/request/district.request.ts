export class DistrictRequests {
  static async GETs(query?: string) {
    try {
      const response = await fetch(
        `${process.env.BETTER_AUTH_URL}/api/districts${
          query ? `/${query}` : ""
        }`
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
