import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { auth } from "@/utils/auth";
import { LikeValidations } from "@/utils/validation/like.validation";
import { validateRequest } from "@/utils/validation/validate";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const table = prisma.like;
const validation = LikeValidations;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ schema: string; id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) return ErrorResponseMessage.UNAUTHORIZED();
    const { schema, id } = await context.params;
    const validatedBody = validateRequest(validation.GET, {
      schema,
      schemaId: id,
    });
    let checkItem;
    if (validatedBody.schema === "destinations") {
      checkItem = await table.findFirst({
        where: {
          AND: {
            destinationId: validatedBody.schemaId,
            userId: session.user.id,
          },
        },
        select: { id: true },
      });
    } else if (validatedBody.schema === "traditions") {
      checkItem = await table.findFirst({
        where: {
          AND: {
            traditionId: validatedBody.schemaId,
            userId: session.user.id,
          },
        },
        select: { id: true },
      });
    } else {
      checkItem = await table.findFirst({
        where: {
          AND: {
            storyId: validatedBody.schemaId,
            userId: session.user.id,
          },
        },
        select: { id: true },
      });
    }

    if (checkItem)
      return NextResponse.json({
        ...apiSuccessResponse("GET", "USER"),
        result: true,
      });
    return NextResponse.json({
      ...apiSuccessResponse("GET", "USER"),
      result: false,
    });
  } catch (e) {
    if (e instanceof ZodError) return ErrorResponseMessage.ZOD_ERROR(e);
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ schema: string; id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) return ErrorResponseMessage.UNAUTHORIZED();
    const { schema, id } = await context.params;
    const validatedBody = validateRequest(validation.GET, {
      schema,
      schemaId: id,
    });
    let checkItem;
    if (validatedBody.schema === "destinations") {
      checkItem = await table.findFirst({
        where: {
          AND: {
            destinationId: validatedBody.schemaId,
            userId: session.user.id,
          },
        },
        select: { id: true },
      });
    } else if (validatedBody.schema === "traditions") {
      checkItem = await table.findFirst({
        where: {
          AND: {
            traditionId: validatedBody.schemaId,
            userId: session.user.id,
          },
        },
        select: { id: true },
      });
    } else {
      checkItem = await table.findFirst({
        where: {
          AND: {
            storyId: validatedBody.schemaId,
            userId: session.user.id,
          },
        },
        select: { id: true },
      });
    }

    if (checkItem) return ErrorResponseMessage.ALREADY_EXISTS("like");

    await table.create({
      data: {
        userId: session.user.id,
        destinationId:
          validatedBody.schema === "destinations"
            ? validatedBody.schemaId
            : undefined,
        traditionId:
          validatedBody.schema === "traditions"
            ? validatedBody.schemaId
            : undefined,
        storyId:
          validatedBody.schema === "stories"
            ? validatedBody.schemaId
            : undefined,
      },
    });
    return NextResponse.json({
      ...apiSuccessResponse("GET", "USER"),
      result: true,
    });
  } catch (e) {
    if (e instanceof ZodError) return ErrorResponseMessage.ZOD_ERROR(e);
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ schema: string; id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) return ErrorResponseMessage.UNAUTHORIZED();
    const { schema, id } = await context.params;
    const validatedBody = validateRequest(validation.DELETE, {
      schema,
      schemaId: id,
    });
    if (validatedBody.schema === "destinations") {
      await table.deleteMany({
        where: {
          AND: {
            destinationId: validatedBody.schemaId,
            userId: session.user.id,
          },
        },
      });
    } else if (validatedBody.schema === "traditions") {
      await table.deleteMany({
        where: {
          AND: {
            traditionId: validatedBody.schemaId,
            userId: session.user.id,
          },
        },
      });
    } else {
      await table.deleteMany({
        where: {
          AND: {
            storyId: validatedBody.schemaId,
            userId: session.user.id,
          },
        },
      });
    }

    return NextResponse.json({
      ...apiSuccessResponse("DELETE", "USER"),
      result: true,
    });
  } catch (e) {
    if (e instanceof ZodError) return ErrorResponseMessage.ZOD_ERROR(e);
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}
