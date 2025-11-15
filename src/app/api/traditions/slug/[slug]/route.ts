import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { TraditionResponses } from "@/utils/response/tradition.response";
import { TraditionValidations } from "@/utils/validation/tradition.validation";
import { validateRequest } from "@/utils/validation/validate";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const response = TraditionResponses;
const table = prisma.tradition;
const validation = TraditionValidations;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const validatedSlug = validateRequest(validation.GET, slug);

    const item = await table.findUnique({
      where: { slug: validatedSlug },
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
