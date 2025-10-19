import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { auth } from "@/utils/auth";
import { UserResponses } from "@/utils/response/user.response";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const table = prisma.user;
const response = UserResponses;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const { id } = await context.params;
    if (!session) return ErrorResponseMessage.UNAUTHORIZED();
    if (session.user.id !== id) return ErrorResponseMessage.UNAUTHORIZED();
    const user = await table.findUnique({
      where: { id: session.user.id },
      select: response.GET,
    });
    if (!user) return ErrorResponseMessage.NOT_FOUND("USER");
    return NextResponse.json({
      ...apiSuccessResponse("GET", "USER"),
      result: user,
    });
  } catch (e) {
    if (e instanceof ZodError) return ErrorResponseMessage.ZOD_ERROR(e);
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}
