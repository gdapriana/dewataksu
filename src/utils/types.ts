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

export type StoryRelation = Prisma.StoryGetPayload<{
  include: {
    _count: true;
    author: true;
    bookmarks: true;
    comments: true;
    cover: true;
    likes: true;
    views: true;
  };
}>;

export type TraditionRelation = Prisma.TraditionGetPayload<{
  include: {
    _count: true;
    district: true;
    bookmarks: true;
    comments: true;
    cover: true;
    galleries: true;
    likes: true;
    views: true;
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
