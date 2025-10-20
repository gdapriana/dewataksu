import prisma from "@/lib/db";
import { apiSuccessResponse, ErrorResponseMessage } from "@/utils/api-response";
import { auth } from "@/utils/auth";
import { StoryResponses } from "@/utils/response/story.response";
import { StoryValidations } from "@/utils/validation/story.validation";
import { validateRequest } from "@/utils/validation/validate";
import { Prisma, Schema } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";
import slugify from "slugify";
import { slugifySetting } from "@/utils/helpers";

const response = StoryResponses;
const table = prisma.story;
const validation = StoryValidations;
const schema: Schema = "STORY";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validatedQuery = validateRequest(validation.QUERY, queryParams);

    const page = validatedQuery.page || 1;
    const limit = validatedQuery.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.StoryWhereInput = {};

    if (validatedQuery.isPublished) {
      where.isPublished = validatedQuery.isPublished === "1";
    }

    if (validatedQuery.search) {
      where.OR = [
        { name: { contains: validatedQuery.search, mode: "insensitive" } },
        { content: { contains: validatedQuery.search, mode: "insensitive" } },
      ];
    }

    let orderBy: Prisma.StoryOrderByWithRelationInput = {};

    if (validatedQuery.sortBy === "bookmarked")
      orderBy = { bookmarks: { _count: validatedQuery.orderBy } };
    else if (validatedQuery.sortBy === "liked")
      orderBy = { likes: { _count: validatedQuery.orderBy } };
    else if (validatedQuery.sortBy === "viewed")
      orderBy = { views: { _count: validatedQuery.orderBy } };
    else orderBy = { [validatedQuery.sortBy]: validatedQuery.orderBy };

    const [total, stories] = await prisma.$transaction([
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
      result: { stories, pagination },
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
    const data: z.infer<typeof validation.POST> = await req.json();
    const validatedBody = validateRequest(validation.POST, data);
    const unique = Date.now() + Math.random();
    const slug = `${slugify(validatedBody.name, slugifySetting)}-${unique}`;
    const checkItem = await table.findUnique({
      where: {
        slug,
      },
      select: { id: true },
    });
    if (checkItem) return ErrorResponseMessage.ALREADY_EXISTS("story");

    if (validatedBody.coverId) {
      const checkImage = await prisma.image.findUnique({
        where: { id: validatedBody.coverId },
      });
      if (!checkImage) return ErrorResponseMessage.NOT_FOUND("image");
    }

    const item = await table.create({
      data: {
        name: validatedBody.name,
        content: validatedBody.content,
        userId: session.user.id,
        coverId: validatedBody.coverId,
        slug,
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json({
      ...apiSuccessResponse("CREATE", "STORY"),
      result: item,
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return ErrorResponseMessage.ZOD_ERROR(e);
    }
    return ErrorResponseMessage.INTERNAL_SERVER_ERROR();
  }
}
