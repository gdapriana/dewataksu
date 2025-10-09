import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { TraditionResponses } from "@/utils/response/tradition.response";
import { TraditionValidations } from "@/utils/validation/tradition.validation";
import { validateRequest } from "@/utils/validation/validate";
import { Prisma, Schema } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const response = TraditionResponses;
const table = prisma.tradition;
const validation = TraditionValidations;
const schema: Schema = "TRADITION";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validatedQuery = validateRequest(validation.QUERY, queryParams);

    const page = validatedQuery.page || 1;
    const limit = validatedQuery.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.TraditionWhereInput = {};

    if (validatedQuery.isPublished) {
      where.isPublished = validatedQuery.isPublished === "1";
    }

    if (validatedQuery.district) {
      where.district = {
        slug: { contains: validatedQuery.district, mode: "insensitive" },
      };
    }

    if (validatedQuery.search) {
      where.OR = [
        { name: { contains: validatedQuery.search, mode: "insensitive" } },
        {
          content: { contains: validatedQuery.search, mode: "insensitive" },
        },
      ];
    }

    let orderBy: Prisma.TraditionOrderByWithRelationInput = {};

    if (validatedQuery.sortBy === "bookmarked")
      orderBy = { bookmarks: { _count: validatedQuery.orderBy } };
    else if (validatedQuery.sortBy === "liked")
      orderBy = { likes: { _count: validatedQuery.orderBy } };
    else if (validatedQuery.sortBy === "viewed")
      orderBy = { views: { _count: validatedQuery.orderBy } };
    else orderBy = { [validatedQuery.sortBy]: validatedQuery.orderBy };

    const [total, traditions] = await prisma.$transaction([
      table.count({ where }),
      table.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        select: response.GETs,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const pagination = {
      page,
      limit,
      total,
      pages: totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
    return NextResponse.json({
      ...apiSuccessResponse("GETS", schema),
      result: { traditions, pagination },
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return ErrorResponseMessage.ZOD_ERROR(e);
    }
  }
  return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
}
