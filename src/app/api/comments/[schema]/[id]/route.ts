import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { CommentResponses } from "@/utils/response/comment.response";
import { CommentValidations } from "@/utils/validation/comment.validation";
import { validateRequest } from "@/utils/validation/validate";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const table = prisma.comment;
const validation = CommentValidations;
const response = CommentResponses;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ schema: string; id: string }> }
) {
  try {
    const { schema, id } = await context.params;
    const valdatedParams = validateRequest(validation.GET, { schema, id });

    async function getNestedReplies(commentId: string) {
      const replies = await table.findMany({
        where: { parentId: commentId },
        select: response.GETs,
        orderBy: { createdAt: "asc" },
      });

      for (const reply of replies) {
        const nestedReplies = await getNestedReplies(reply.id);
        reply.replies = nestedReplies;
      }

      return replies;
    }

    if (valdatedParams.schema === "destinations") {
      const topLevelComments = await table.findMany({
        where: {
          AND: {
            parentId: null,
            destinationId: valdatedParams.id,
          },
        },
        select: response.GETs,
        orderBy: { createdAt: "asc" },
      });
      for (const comment of topLevelComments) {
        comment.replies = await getNestedReplies(comment.id);
      }
      return NextResponse.json({
        result: { comments: topLevelComments },
        ...apiSuccessResponse("GETS", "COMMENT"),
      });
    } else if (valdatedParams.schema === "traditions") {
      const topLevelComments = await table.findMany({
        where: {
          AND: {
            parentId: null,
            traditionId: valdatedParams.id,
          },
        },
        select: response.GETs,
        orderBy: { createdAt: "asc" },
      });
      for (const comment of topLevelComments) {
        comment.replies = await getNestedReplies(comment.id);
      }
      return NextResponse.json({
        result: { comments: topLevelComments },
        ...apiSuccessResponse("GETS", "TRADITION"),
      });
    } else {
      const topLevelComments = await table.findMany({
        where: {
          AND: {
            parentId: null,
            storyId: valdatedParams.id,
          },
        },
        select: response.GETs,
        orderBy: { createdAt: "asc" },
      });
      for (const comment of topLevelComments) {
        comment.replies = await getNestedReplies(comment.id);
      }
      return NextResponse.json({
        result: { comments: topLevelComments },
        ...apiSuccessResponse("GETS", "STORY"),
      });
    }
  } catch (e) {
    if (e instanceof ZodError) {
      return ErrorResponseMessage.ZOD_ERROR(e);
    }
  }

  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}
