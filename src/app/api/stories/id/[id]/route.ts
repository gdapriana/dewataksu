import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { auth } from "@/utils/auth";
import { slugifySetting } from "@/utils/helpers";
import { StoryResponses } from "@/utils/response/story.response";
import { StoryValidations } from "@/utils/validation/story.validation";
import { validateRequest } from "@/utils/validation/validate";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import z, { ZodError } from "zod";

const table = prisma.story;
const validation = StoryValidations;
const response = StoryResponses;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const validatedId = validateRequest(validation.GET, id);
    const item = await table.findUnique({
      where: { id: validatedId },
      include: response.GET,
    });

    if (!item) return ErrorResponseMessage.NOT_FOUND("STORY");
    return NextResponse.json({
      ...apiSuccessResponse("GET", "STORY"),
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
    const { id } = await context.params;
    const body: z.infer<typeof validation.PATCH> = await req.json();
    const valdatedBody = validateRequest(validation.PATCH, body);
    const checkItem = await table.findUnique({
      where: { id },
      select: { id: true, author: { select: { id: true } } },
    });
    if (!checkItem) return ErrorResponseMessage.NOT_FOUND("STORY");
    if (session.user.id !== checkItem.author.id)
      return ErrorResponseMessage.FORBIDDEN();
    let newSlug = undefined;
    if (valdatedBody.name) {
      const unique = Date.now() + Math.random();
      newSlug = `${slugify(valdatedBody.name, slugifySetting)}-${unique}`;
    }
    const updated = await table.update({
      where: { id },
      data: { ...valdatedBody, slug: newSlug },
      select: {
        id: true,
      },
    });
    return NextResponse.json({
      ...apiSuccessResponse("UPDATE", "STORY"),
      result: updated,
    });
  } catch (e) {
    if (e instanceof ZodError) return ErrorResponseMessage.ZOD_ERROR(e);
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}
