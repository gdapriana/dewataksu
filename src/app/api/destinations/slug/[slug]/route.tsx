import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { DestinationResponses } from "@/utils/response/destination.response";
import { DestinationValidations } from "@/utils/validation/destination.validation";
import { validateRequest } from "@/utils/validation/validate";
import { Schema } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const response = DestinationResponses;
const table = prisma.destination;
const validation = DestinationValidations;
const schema: Schema = "DESTINATION";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const validatedSlug = validateRequest(validation.GET, slug);
    const checkItem = await table.findUnique({
      where: { slug: validatedSlug },
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
