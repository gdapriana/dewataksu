import { Prisma } from "@prisma/client";

export class UserResponses {
  static readonly GET: Prisma.UserSelect = {
    _count: true,
    image: true,
    profileImage: {
      select: {
        url: true,
      },
    },
    email: true,
    id: true,
    name: true,
    activityLogs: {
      select: {
        action: true,
        createdAt: true,
        id: true,
        schema: true,
        schemaId: true,
      },
    },
  };
}
