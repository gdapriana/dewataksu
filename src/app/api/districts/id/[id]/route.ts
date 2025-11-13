import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { auth } from "@/utils/auth";
import { slugifySetting } from "@/utils/helpers";
import { DistrictResponses } from "@/utils/response/district.response";
import { DistrictValidations } from "@/utils/validation/district.validation";
import { validateRequest } from "@/utils/validation/validate";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import z, { ZodError } from "zod";

const table = prisma.district;
const validation = DistrictValidations;
const response = DistrictResponses;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const validatedSlug = validateRequest(validation.GET, id);
    const item = await table.findUnique({
      where: { id: validatedSlug },
      select: response.GET,
    });
    if (!item) return ErrorResponseMessage.NOT_FOUND("DISTRICT");
    return NextResponse.json({
      ...apiSuccessResponse("GET", "DISTRICT"),
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
      if (checkSlug) return ErrorResponseMessage.ALREADY_EXISTS("district");
    }
    const updated = await table.update({
      where: { id },
      data: { ...valdatedBody, slug: newSlug },
      select: {
        id: true,
      },
    });
    return NextResponse.json({
      ...apiSuccessResponse("UPDATE", "DISTRICT"),
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
      select: {
        id: true,
        _count: { select: { destinations: true, traditions: true } },
      },
    });
    if (!checkItem) return ErrorResponseMessage.NOT_FOUND("DISTRICT");
    if (
      checkItem._count.destinations !== 0 ||
      checkItem._count.traditions !== 0
    ) {
      return ErrorResponseMessage.BAD_REQUEST(
        "Delete related destinations or traditions first"
      );
    }
    const deleted = await table.delete({
      where: { id },
      select: {
        id: true,
      },
    });
    return NextResponse.json({
      ...apiSuccessResponse("DELETE", "DISTRICT"),
      result: deleted,
    });
  } catch (e) {
    if (e instanceof ZodError) return ErrorResponseMessage.ZOD_ERROR(e);
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}
