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

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) return ErrorResponseMessage.UNAUTHORIZED();

    const { id } = await context.params;

    const validatedId = validateRequest(validation.DELETE, id);

    const checkItem = await table.findUnique({
      where: { id: validatedId },
      select: { id: true, author: { select: { id: true } } },
    });

    if (!checkItem) return ErrorResponseMessage.NOT_FOUND("comment");

    if (session.user.id !== checkItem.author.id)
      return ErrorResponseMessage.UNAUTHORIZED();

    const deletedItem = await table.delete({
      where: { id: validatedId },
      select: response.DELETE,
    });

    return NextResponse.json({
      ...apiSuccessResponse("DELETE", "COMMENT"),
      result: deletedItem,
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return ErrorResponseMessage.ZOD_ERROR(e);
    }
  }

  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}
