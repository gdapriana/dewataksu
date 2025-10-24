import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (e) {}
}
