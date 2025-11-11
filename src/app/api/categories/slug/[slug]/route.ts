import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { CategoryResponses } from "@/utils/response/category.response";
import { StoryResponses } from "@/utils/response/story.response";
import { CategoryValidations } from "@/utils/validation/category.validation";
import { StoryValidations } from "@/utils/validation/story.validation";
import { validateRequest } from "@/utils/validation/validate";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";

const table = prisma.category;
const validation = CategoryValidations;
const response = CategoryResponses;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const validatedSlug = validateRequest(validation.GET, slug);
    const item = await table.findUnique({
      where: { slug: validatedSlug },
      include: response.GET,
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
