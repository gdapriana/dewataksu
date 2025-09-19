import { Prisma } from "@prisma/client";

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean | null;
  hasPrev: boolean | null;
}

export type CategoryRelation = Prisma.CategoryGetPayload<{
  include: {
    _count: true;
    cover: true;
  };
}>;

export type DestinationRelation = Prisma.DestinationGetPayload<{
  include: {
    cover: true;
    _count: true;
    bookmarks: true;
    category: true;
    comments: true;
    district: true;
    galleries: true;
    likes: true;
    tags: true;
  };
}>;
