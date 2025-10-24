import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "dewataksu" }, (error, result) => {
          if (error || !result) reject(error);
          else
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
        })
        .end(buffer);
    });

    const savedImage = await prisma.image.create({
      data: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
      select: {
        id: true,
        publicId: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "image uploaded successfully",
        result: savedImage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload image" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
