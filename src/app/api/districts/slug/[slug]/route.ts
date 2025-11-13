import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { DistrictResponses } from "@/utils/response/district.response";
import { DistrictValidations } from "@/utils/validation/district.validation";
import { validateRequest } from "@/utils/validation/validate";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const table = prisma.district;
const validation = DistrictValidations;
const response = DistrictResponses;

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
