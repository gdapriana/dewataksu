import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { auth } from "@/utils/auth";
import { slugifySetting } from "@/utils/helpers";
import { DestinationResponses } from "@/utils/response/destination.response";
import { DestinationValidations } from "@/utils/validation/destination.validation";
import { validateRequest } from "@/utils/validation/validate";
import { Schema } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import z, { ZodError } from "zod";

const response = DestinationResponses;
const table = prisma.destination;
const validation = DestinationValidations;
const schema: Schema = "DESTINATION";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const validatedId = validateRequest(validation.GET, id);
    const checkItem = await table.findUnique({
      where: { id: validatedId },
      select: response.GET,
    });
    if (!checkItem) return ErrorResponseMessage.NOT_FOUND(schema);
    return NextResponse.json({
      ...apiSuccessResponse("GET", schema),
      result: checkItem,
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
      select: { id: true, districtId: true, categoryId: true },
    });
    if (!checkItem) return ErrorResponseMessage.NOT_FOUND("DESTINATION");

    if (valdatedBody.description === "") valdatedBody.description = undefined;
    if (valdatedBody.address === "") valdatedBody.address = null;
    if (
      valdatedBody.districtId === "" ||
      valdatedBody.districtId ||
      checkItem.districtId
    )
      valdatedBody.districtId = undefined;
    if (
      valdatedBody.categoryId === "" ||
      valdatedBody.categoryId === checkItem.categoryId
    )
      valdatedBody.categoryId = undefined;
    if (valdatedBody.coverId === "") valdatedBody.coverId = null;

    if (valdatedBody.districtId) {
      const checkDitrict = await prisma.district.findUnique({
        where: { id: valdatedBody.districtId },
        select: { id: true },
      });

      if (!checkDitrict) return ErrorResponseMessage.NOT_FOUND("DISTRICT");
    }

    if (valdatedBody.categoryId) {
      const checkCategory = await prisma.category.findUnique({
        where: { id: valdatedBody.categoryId },
        select: { id: true },
      });

      if (!checkCategory) return ErrorResponseMessage.NOT_FOUND("CATEGORY");
    }

    let newSlug = undefined;
    if (valdatedBody.name) {
      newSlug = slugify(valdatedBody.name, slugifySetting);
      const checkSlug = await table.findFirst({ where: { slug: newSlug } });
      if (checkSlug) return ErrorResponseMessage.ALREADY_EXISTS("destination");
    }

    const updated = await table.update({
      where: { id },
      data: { ...valdatedBody, slug: newSlug },
      select: {
        id: true,
      },
    });
    return NextResponse.json({
      ...apiSuccessResponse("UPDATE", "DESTINATION"),
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
      },
    });
    if (!checkItem) return ErrorResponseMessage.NOT_FOUND("TRADITION");
    const deleted = await table.delete({
      where: { id },
      select: {
        id: true,
      },
    });
    return NextResponse.json({
      ...apiSuccessResponse("DELETE", "TRADITION"),
      result: deleted,
    });
  } catch (e) {
    if (e instanceof ZodError) return ErrorResponseMessage.ZOD_ERROR(e);
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}
