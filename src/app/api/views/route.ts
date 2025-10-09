import { auth } from "@/utils/auth";
import { ErrorResponseMessage } from "@/utils/api-response";
import { validateRequest } from "@/utils/validation/validate";
import { ViewValidation } from "@/utils/validation/view.validation";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/lib/db";

const validation = ViewValidation;

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return ErrorResponseMessage.UNAUTHORIZED();

    const body = await req.json();
    const validatedBody = validateRequest(validation.POST, body);

    if (validatedBody.schema === "destinations") {
      const item = await prisma.destination.findUnique({
        where: { id: validatedBody.schemaId },
      });
      if (!item) return ErrorResponseMessage.NOT_FOUND("destination");
      const exist = await prisma.view.findFirst({
        where: {
          AND: {
            userId: session.user.id,
            destinationId: validatedBody.schemaId,
          },
        },
      });
      if (exist) return ErrorResponseMessage.ALREADY_EXISTS("view");
      await prisma.view.create({
        data: {
          userId: session.user.id,
          destinationId: validatedBody.schemaId,
        },
      });
      return NextResponse.json({ success: true }, { status: 200 });
    } else if (validatedBody.schema === "traditions") {
      const item = await prisma.tradition.findUnique({
        where: { id: validatedBody.schemaId },
      });
      if (!item) return ErrorResponseMessage.NOT_FOUND("tradition");
      const exist = await prisma.view.findFirst({
        where: {
          AND: {
            userId: session.user.id,
            traditionId: validatedBody.schemaId,
          },
        },
      });
      if (exist) return ErrorResponseMessage.ALREADY_EXISTS("view");
      await prisma.view.create({
        data: {
          userId: session.user.id,
          traditionId: validatedBody.schemaId,
        },
      });
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      const item = await prisma.story.findUnique({
        where: { id: validatedBody.schemaId },
      });
      if (!item) return ErrorResponseMessage.NOT_FOUND("story");
      const exist = await prisma.view.findFirst({
        where: {
          AND: {
            userId: session.user.id,
            storyId: validatedBody.schemaId,
          },
        },
      });
      if (exist) return ErrorResponseMessage.ALREADY_EXISTS("view");
      await prisma.view.create({
        data: {
          userId: session.user.id,
          storyId: validatedBody.schemaId,
        },
      });
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } catch (e) {
    if (e instanceof ZodError) {
      return ErrorResponseMessage.ZOD_ERROR(e);
    }
    console.log(e);
    return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
  }
}
