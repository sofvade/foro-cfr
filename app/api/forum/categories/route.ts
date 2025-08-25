// app/api/forum/categories/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ categories: ["general", "erasmus", "alojamiento"] });
}

