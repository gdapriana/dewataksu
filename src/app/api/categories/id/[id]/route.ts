import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { auth } from "@/utils/auth";
import { slugifySetting } from "@/utils/helpers";
import { CategoryResponses } from "@/utils/response/category.response";
import { CategoryValidations } from "@/utils/validation/category.validation";
import { validateRequest } from "@/utils/validation/validate";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import z, { ZodError } from "zod";

const table = prisma.category;
const validation = CategoryValidations;
const response = CategoryResponses;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const validatedId = validateRequest(validation.GET, id);
    console.log({ validatedId });
    const item = await table.findUnique({
      where: { id: validatedId },
      select: response.GET,
    });

    if (!item) return ErrorResponseMessage.NOT_FOUND("CATEGORY");
    return NextResponse.json({
      ...apiSuccessResponse("GET", "CATEGORY"),
      result: item,
    });
  } catch (e) {
    if (e instanceof ZodError) return ErrorResponseMessage.ZOD_ERROR(e);
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return ErrorResponseMessage.FORBIDDEN();
    if (session.user.role !== "ADMIN") return ErrorResponseMessage.FORBIDDEN();
    const { id } = await context.params;
    const body: z.infer<typeof validation.PATCH> = await req.json();
    const valdatedBody = validateRequest(validation.PATCH, body);
    const checkItem = await table.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!checkItem) return ErrorResponseMessage.NOT_FOUND("CATEGORY");
    let newSlug = undefined;
    if (valdatedBody.name) {
      newSlug = slugify(valdatedBody.name, slugifySetting);
      const checkSlug = await table.findFirst({ where: { slug: newSlug } });
      if (checkSlug) return ErrorResponseMessage.ALREADY_EXISTS("category");
    }
    const updated = await table.update({
      where: { id },
      data: { ...valdatedBody, slug: newSlug },
      select: {
        id: true,
      },
    });
    return NextResponse.json({
      ...apiSuccessResponse("UPDATE", "CATEGORY"),
      result: updated,
    });
  } catch (e) {
    if (e instanceof ZodError) return ErrorResponseMessage.ZOD_ERROR(e);
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return ErrorResponseMessage.FORBIDDEN();
    if (session.user.role !== "ADMIN") return ErrorResponseMessage.FORBIDDEN();

    const { id } = await context.params;
    const valdatedBody = validateRequest(validation.DELETE, id);
    const checkItem = await table.findUnique({
      where: { id: valdatedBody },
      select: { id: true, _count: { select: { destinations: true } } },
    });
    if (!checkItem) return ErrorResponseMessage.NOT_FOUND("CATEGORY");
    if (checkItem._count.destinations !== 0) {
      return ErrorResponseMessage.BAD_REQUEST(
        "Delete related destinations first"
      );
    }
    const deleted = await table.delete({
      where: { id },
      select: {
        id: true,
      },
    });
    return NextResponse.json({
      ...apiSuccessResponse("DELETE", "CATEGORY"),
      result: deleted,
    });
  } catch (e) {
    if (e instanceof ZodError) return ErrorResponseMessage.ZOD_ERROR(e);
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}
