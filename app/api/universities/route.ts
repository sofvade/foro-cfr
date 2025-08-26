import { prisma } from "@/lib/db";

export async function GET() {
  const universities = await prisma.university.findMany({
    include: { rankings: true },
  });
  return Response.json(universities);
}

