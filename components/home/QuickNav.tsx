'use client';
import Link from 'next/link';

export default function QuickNav() {
  const items = [
    { href: '/analysis', label: 'Research & Analysis', desc: 'Reportes y guías' },
    { href: '/universidades', label: 'Ranking ES', desc: 'Filtra universidades' },
    { href: '/forum', label: 'Foro', desc: 'Preguntas y experiencias' },
  ];
  return (
    <nav className="grid sm:grid-cols-3 gap-3">
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className="rounded-xl border p-4 hover:bg-zinc-50"
        >
          <div className="font-medium">{i.label}</div>
          <div className="text-sm text-zinc-600">{i.desc}</div>
        </Link>
      ))}
    </nav>
  );
}
