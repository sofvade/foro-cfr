import { prisma } from "@/lib/db";

export const runtime = "nodejs";            // asegurar runtime de servidor
export const dynamic = "force-dynamic";     // evita cacheo estático en Vercel

export async function GET() {
  try {
    const universities = await prisma.university.findMany({
      include: { rankings: { orderBy: [{ year: "desc" }, { position: "asc" }] } },
      orderBy: { name: "asc" },
    });

    return Response.json(universities, {
      headers: {
        // puedes afinar cache si quieres
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    return Response.json({ error: e.message ?? "Internal error" }, { status: 500 });
  }
}

