import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { auth } from "@/utils/auth";
import { CommentResponses } from "@/utils/response/comment.response";
import { CommentValidations } from "@/utils/validation/comment.validation";
import { validateRequest } from "@/utils/validation/validate";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const table = prisma.comment;
const validation = CommentValidations;
const response = CommentResponses;

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) return ErrorResponseMessage.UNAUTHORIZED();
    const body = await req.json();
    const validatedBody = validateRequest(validation.POST, body);
    let checkSchema;
    if (validatedBody.schema === "destinations") {
      checkSchema = await prisma.destination.findUnique({
        where: { id: validatedBody.schemaId },
        select: { id: true },
      });
    } else if (validatedBody.schema === "traditions") {
      checkSchema = await prisma.tradition.findUnique({
        where: { id: validatedBody.schemaId },
        select: { id: true },
      });
    } else {
      checkSchema = await prisma.story.findUnique({
        where: { id: validatedBody.schemaId },
        select: { id: true },
      });
    }

    if (!checkSchema) return ErrorResponseMessage.NOT_FOUND("SCHEMA");
    if (validatedBody.parentId) {
      const checkParrent = await table.findUnique({
        where: { id: validatedBody.parentId },
      });
      if (!checkParrent) return ErrorResponseMessage.NOT_FOUND("COMMENT");
    }

    const result = await table.create({
      data: {
        body: validatedBody.body,
        userId: session.user.id,
        destinationId:
          validatedBody.schema === "destinations"
            ? validatedBody.schemaId
            : undefined,
        storyId:
          validatedBody.schema === "stories"
            ? validatedBody.schemaId
            : undefined,
        traditionId:
          validatedBody.schema === "traditions"
            ? validatedBody.schemaId
            : undefined,
        parentId: validatedBody.parentId,
      },
      select: response.POST,
    });

    return NextResponse.json({
      ...apiSuccessResponse("CREATE", "COMMENT"),
      result,
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return ErrorResponseMessage.ZOD_ERROR(e);
    }
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}
