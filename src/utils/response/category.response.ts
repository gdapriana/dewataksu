import { Prisma } from "@prisma/client";

export class CategoryResponses {
  static readonly GETs: Prisma.CategorySelect = {
    id: true,
    slug: true,
    description: true,
    _count: {
      select: {
        destinations: true,
      },
    },
    cover: {
      select: {
        url: true,
      },
    },
    name: true,
  };
  static readonly POST: Prisma.CategorySelect = {
    id: true,
  };
  static readonly PATCH: Prisma.CategorySelect = {
    id: true,
  };
  static readonly DELETE: Prisma.CategorySelect = {
    id: true,
  };
}
