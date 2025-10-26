import { Prisma } from "@prisma/client";

export class StoryResponses {
  static readonly GET: Prisma.StoryInclude = {
    author: {
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: {
          select: {
            url: true,
          },
        },
      },
    },
    cover: {
      select: {
        id: true,
        url: true,
        publicId: true,
      },
    },
    comments: {
      select: {
        id: true,
        body: true,
        author: {
          select: {
            id: true,
            name: true,
            profileImage: {
              select: {
                url: true,
              },
            },
          },
        },
        replies: true,
        createdAt: true,
      },
    },
    _count: true,
  };
  static readonly GETs: Prisma.StorySelect = {
    id: true,
    name: true,
    slug: true,
    content: true,
    isPublished: true,
    author: {
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        profileImage: {
          select: {
            url: true,
          },
        },
      },
    },
    cover: {
      select: {
        id: true,
        url: true,
        publicId: true,
      },
    },
    _count: true,
  };
  static readonly POST: Prisma.StorySelect = {
    id: true,
  };
  static readonly PATCH: Prisma.StorySelect = {
    id: true,
  };
}
