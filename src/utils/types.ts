import { Prisma } from "@prisma/client";

export type MainSchema = "destinations" | "traditions" | "stories";

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

export type DistrictRelation = Prisma.DistrictGetPayload<{
  include: {
    _count: true;
    cover: true;
    destinations: true;
    traditions: true;
  };
}>;

export type StoryRelation = Prisma.StoryGetPayload<{
  include: {
    _count: true;
    author: {
      select: {
        name: true;
        email: true;
        image: true;
        profileImage: {
          select: {
            url: true;
          };
        };
      };
    };
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
    district: {
      select: {
        name: true;
        slug: true;
      };
    };
    bookmarks: true;
    comments: true;
    cover: true;
    galleries: true;
    likes: true;
    views: true;
  };
}>;

export type BaseComment = Prisma.CommentGetPayload<{
  select: {
    id: true;
    body: true;
    createdAt: true;
    parentId: true;
    author: {
      select: {
        id: true;
        image: true;
        name: true;
        profileImage: {
          select: {
            url: true;
          };
        };
      };
    };
    replies: true;
    parent: {
      select: {
        author: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

export type NestedComment = BaseComment & {
  replies: NestedComment[];
};

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
