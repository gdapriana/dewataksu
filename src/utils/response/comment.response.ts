import { Prisma } from "@prisma/client";

export class CommentResponses {
  static readonly GETs: Prisma.CommentSelect = {
    id: true,
    replies: true,
    parentId: true,
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
    parent: {
      select: {
        author: {
          select: {
            name: true,
          },
        },
      },
    },
    body: true,
    createdAt: true,
  };
  static readonly POST: Prisma.CommentSelect = {
    id: true,
  };
  static readonly DELETE: Prisma.CommentSelect = {
    id: true,
  };
}
