import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Schema } from "@prisma/client";

interface ErrorResponse {
  status: number;
  message: string;
}

export type DB_SCHEMA =
  | "user"
  | "activity"
  | "gallery"
  | "district"
  | "image"
  | "category"
  | "like"
  | "tag"
  | "user"
  | "destination"
  | "tradition"
  | "story"
  | "comment"
  | "view"
  | "bookmark";

type Actions = "CREATE" | "UPDATE" | "DELETE" | "GET" | "GETS";
type ExtendSchema = Schema | "COMMENT";

export const apiSuccessResponse = (actions: Actions, schema: ExtendSchema) => {
  return {
    success: true,
    message: `${actions} ${schema} SUCCESSFULLY`,
  };
};

export class ErrorResponseMessage {
  static INVALID_USERNAME_PASSWORD() {
    return NextResponse.json(
      { errors: "wrong username or password" },
      { status: 401 }
    );
  }
  static BAD_REQUEST(reason: string) {
    return NextResponse.json(
      { errors: `bad request: ${reason}` },
      { status: 401 }
    );
  }

  static UNAUTHORIZED(
    message: string = "authentication failed, please login."
  ) {
    return NextResponse.json({ errors: message }, { status: 401 });
  }

  static FORBIDDEN() {
    return NextResponse.json(
      { errors: "you do not have permission to perform this action." },
      { status: 403 }
    );
  }

  static NOT_FOUND(schema: DB_SCHEMA | string) {
    return NextResponse.json(
      { errors: `${schema} not found.`, success: false },
      { status: 404 }
    );
  }

  static ALREADY_EXISTS(schema: DB_SCHEMA) {
    return NextResponse.json(
      { errors: `${schema} already exists.` },
      { status: 409 }
    );
  }

  static INTERNAL_SERVER_ERROR() {
    return NextResponse.json(
      { errors: `an unexpected error occurred on the server.` },
      { status: 500 }
    );
  }

  static ZOD_ERROR(errors: ZodError) {
    const formattedErrors = errors.issues.map((issue) => ({
      message: issue.message,
      form: issue.path.join("."),
    }));
    return NextResponse.json({ errors: formattedErrors }, { status: 400 });
  }
}
