import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { auth } from "@/utils/auth";
import { slugifySetting } from "@/utils/helpers";
import { TraditionResponses } from "@/utils/response/tradition.response";
import { TraditionValidations } from "@/utils/validation/tradition.validation";
import { validateRequest } from "@/utils/validation/validate";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import z, { ZodError } from "zod";

const response = TraditionResponses;
const table = prisma.tradition;
const validation = TraditionValidations;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const validatedId = validateRequest(validation.GET, id);

    const item = await table.findUnique({
      where: { id: validatedId },
      select: response.GET,
    });

    if (!item) return ErrorResponseMessage.NOT_FOUND("TRADITIONS");
    return NextResponse.json({
      ...apiSuccessResponse("GET", "TRADITION"),
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
      if (checkSlug) return ErrorResponseMessage.ALREADY_EXISTS("tradition");
    }

    if (valdatedBody.content === "") valdatedBody.content = undefined;
    if (valdatedBody.address === "") valdatedBody.address = null;
    if (valdatedBody.districtId === "") valdatedBody.districtId = null;
    if (valdatedBody.coverId === "") valdatedBody.coverId = null;

    const updated = await table.update({
      where: { id },
      data: { ...valdatedBody, slug: newSlug },
      select: {
        id: true,
      },
    });
    return NextResponse.json({
      ...apiSuccessResponse("UPDATE", "TRADITION"),
      result: updated,
    });
  } catch (e) {
    if (e instanceof ZodError) return ErrorResponseMessage.ZOD_ERROR(e);
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}
