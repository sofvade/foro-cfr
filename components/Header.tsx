'use client';
import Link from 'next/link';
import { useState } from 'react';
import MegaMenu from './nav/MegaMenu';
import { MENU } from './nav/menuData';

export default function Header() {
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Campus Insight Board
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-zinc-700">
          {MENU.map(sec => (
            <MegaMenu key={sec.id} section={sec} />
          ))}
          <Link href="/forum" className="text-sm font-medium hover:text-zinc-900">Foro</Link>
          <Link href="/about" className="text-sm font-medium hover:text-zinc-900">Sobre nosotros</Link>
          <Link href="/universidades" className="text-sm font-medium hover:text-zinc-900">Ranking ES</Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobile(v => !v)} aria-label="Abrir menú">☰</button>
      </div>

      {/* Mobile drawer */}
      {mobile && (
        <div className="md:hidden border-t">
          <div className="px-4 py-3 space-y-2">
            {MENU.map(sec => (
              <details key={sec.id} className="rounded-xl border p-2">
                <summary className="cursor-pointer text-sm font-medium">{sec.label}</summary>
                <div className="pt-2 grid grid-cols-1 gap-2">
                  {sec.groups.flatMap(g => g.items).map(item => (
                    <Link key={item.label} href={item.href} className="block px-2 py-1 rounded hover:bg-zinc-50" onClick={() => setMobile(false)}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
            <Link href="/forum" className="block px-3 py-2 rounded-xl border" onClick={() => setMobile(false)}>Foro</Link>
            <Link href="/about" className="block px-3 py-2 rounded-xl border" onClick={() => setMobile(false)}>Sobre nosotros</Link>
            <Link href="/universidades" className="block px-3 py-2 rounded-xl border" onClick={() => setMobile(false)}>Ranking ES</Link>
          </div>
        </div>
      )}
    </header>
  );
}
