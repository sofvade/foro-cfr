export default function ArticleCard({ title, kicker, href }: { title: string; kicker?: string; href: string }) {
  return (
    <a href={href} className="block p-5 border rounded-2xl hover:bg-gray-50">
      {kicker && <p className="text-xs uppercase tracking-wide text-[var(--muted)]">{kicker}</p>}
      <h3 className="font-serif text-xl mt-1">{title}</h3>
    </a>
  );
}
