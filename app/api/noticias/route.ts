import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

const FEEDS = [
  "https://www.boe.es/rss/ultimas_disposiciones.xml",
  "https://elpais.com/educacion/rss",
  "https://www.elmundo.es/ciencia-y-salud/educacion/rss/educacion.xml",
  "https://www.universia.net/es/actualidad/rss",
];

export const revalidate = 1800;

export async function GET() {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });

  const fetchOne = async (url: string) => {
    try {
      const res = await fetch(url, { next: { revalidate } });
      const xml = await res.text();
      const json = parser.parse(xml);
      const channel = json?.rss?.channel || json?.feed;
      let items = channel?.item || channel?.entry || [];
      if (!Array.isArray(items)) items = [items].filter(Boolean);

      return items.map((it: any) => {
        const title = it?.title?.["#text"] || it?.title || "";
        const link = it?.link?.href || it?.link?.[0]?.href || it?.link || it?.guid || "";
        const pubDate = it?.pubDate || it?.updated || it?.published || "";
        const source = channel?.title?.["#text"] || channel?.title || new URL(url).host;

        return {
          title: String(title),
          link: String(link),
          pubDate: pubDate ? new Date(pubDate).toISOString() : null,
          source,
        };
      });
    } catch {
      return [];
    }
  };

  const results = await Promise.all(FEEDS.map(fetchOne));
  const all = results.flat();

  const seen = new Set<string>();
  const unique = all.filter((x) => {
    const key = x.link || x.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return Boolean(x.title && x.link);
  });

  unique.sort((a, b) => (Date.parse(b.pubDate || "") || 0) - (Date.parse(a.pubDate || "") || 0));
  const top = unique.slice(0, 12);
  return NextResponse.json({ items: top }, { status: 200 });
}

