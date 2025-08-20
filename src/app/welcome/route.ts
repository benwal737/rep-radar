import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { ensureDefaultData } from "@/lib/ensureDefaultData";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const exists = await prisma.exerciseBlock.findFirst({
    where: { templateId: userId },
    select: { id: true },
  });

  if (!exists) {
    await ensureDefaultData(userId);
  }

  return NextResponse.redirect(new URL("/templates", req.url));
}
