import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { auth } from "@/utils/auth";
import { slugifySetting } from "@/utils/helpers";
import { CategoryResponses } from "@/utils/response/category.response";
import { CategoryValidations } from "@/utils/validation/category.validation";
import { validateRequest } from "@/utils/validation/validate";
import { Prisma, Schema } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import z, { ZodError } from "zod";

const response = CategoryResponses;
const table = prisma.category;
const validation = CategoryValidations;
const schema: Schema = "CATEGORY";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validatedQuery = validateRequest(validation.QUERY, queryParams);
    const page = validatedQuery.page || 1;
    const limit = validatedQuery.limit || 5;
    const skip = (page - 1) * limit;

    const where: Prisma.CategoryWhereInput = {};

    if (validatedQuery.search) {
      where.OR = [
        { name: { contains: validatedQuery.search, mode: "insensitive" } },
      ];
    }

    let orderBy: Prisma.CategoryOrderByWithRelationInput = {};

    if (validatedQuery.sortBy === "most_destinations")
      orderBy = { destinations: { _count: validatedQuery.orderBy } };
    else orderBy = { [validatedQuery.sortBy]: validatedQuery.orderBy };

    const [total, categories] = await prisma.$transaction([
      table.count({ where }),
      table.findMany({
        where,
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
      result: { categories, pagination },
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return ErrorResponseMessage.ZOD_ERROR(e);
    }
    return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return ErrorResponseMessage.FORBIDDEN();
    if (session.user.role !== "ADMIN") return ErrorResponseMessage.FORBIDDEN();
    const data: z.infer<typeof validation.POST> = await req.json();
    const validatedBody = validateRequest(validation.POST, data);
    const slug = slugify(validatedBody.name, slugifySetting);
    const checkSlug = await table.findFirst({ where: { slug } });
    if (checkSlug) return ErrorResponseMessage.ALREADY_EXISTS("category");
    const item = await table.create({
      data: {
        ...data,
        slug,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({
      ...apiSuccessResponse("CREATE", "CATEGORY"),
      result: item,
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return ErrorResponseMessage.ZOD_ERROR(e);
    }
    return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
  }
}
