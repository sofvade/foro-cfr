import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rankings = await prisma.ranking.findMany({
      include: { university: { select: { id: true, name: true, country: true } } },
      orderBy: [{ year: "desc" }, { position: "asc" }],
      take: 200, // por si quieres limitar
    });
    return Response.json(rankings, { headers: { "Cache-Control": "no-store" } });
  } catch (e: any) {
    return Response.json({ error: e.message ?? "Internal error" }, { status: 500 });
  }
}

