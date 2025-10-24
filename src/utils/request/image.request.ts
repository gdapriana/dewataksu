export class ImageRequests {
  static async POST(file: File) {
    try {
      if (!file) {
        alert("Please choose an image first");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/images`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Upload failed:", err);
    }
  }
}
