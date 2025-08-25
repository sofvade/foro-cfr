'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/utils';
import { LogIn } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b border-[var(--border)] sticky top-0 z-40 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-tight">{site.name}</Link>
        <nav className="hidden md:flex gap-6">
          {site.nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={
                'text-sm hover:underline ' +
                (pathname === item.href ? 'font-semibold' : 'text-[var(--muted)]')
              }>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-sm inline-flex items-center gap-2 border px-3 py-1.5 rounded-full hover:bg-gray-50">
            <LogIn className="w-4 h-4" /> Entrar
          </Link>
          <Link href="/auth/register" className="text-sm border px-3 py-1.5 rounded-full bg-black text-white hover:bg-gray-800">
            Crear cuenta
          </Link>
        </div>
      </div>
    </header>
  );
}
