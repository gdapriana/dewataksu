import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { DistrictResponses } from "@/utils/response/district.response";
import { DistrictValidations } from "@/utils/validation/district.validation";
import { validateRequest } from "@/utils/validation/validate";
import { Prisma, Schema } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const response = DistrictResponses;
const table = prisma.district;
const validation = DistrictValidations;
const schema: Schema = "DISTRICT";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validatedQuery = validateRequest(validation.QUERY, queryParams);
    const page = validatedQuery.page || 1;
    const limit = validatedQuery.limit || 10;
    const skip = (page - 1) * limit;
    const where: Prisma.DistrictWhereInput = {};
    if (validatedQuery.search) {
      where.OR = [
        { name: { contains: validatedQuery.search, mode: "insensitive" } },
        {
          description: {
            contains: validatedQuery.search,
            mode: "insensitive",
          },
        },
      ];
    }
    let orderBy: Prisma.DistrictOrderByWithRelationInput = {};
    if (validatedQuery.sortBy === "popular") {
      orderBy = {
        destinations: {
          _count: validatedQuery.orderBy,
        },
      };
    } else {
      orderBy = {
        [validatedQuery.sortBy]: validatedQuery.orderBy,
      };
    }

    const [total, districts] = await prisma.$transaction([
      table.count({ where }),
      table.findMany({
        where,
        take: limit,
        skip,
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
      result: { districts, pagination },
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return ErrorResponseMessage.ZOD_ERROR(e);
    }
    return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
  }
}
