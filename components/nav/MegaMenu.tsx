'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { MenuSection } from './menuData.ts';

type Props = { section: MenuSection };

export default function MegaMenu({ section }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="px-3 py-2 text-sm font-medium hover:text-zinc-900"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        {section.label}
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-2 w-[min(95vw,1000px)] bg-white shadow-2xl rounded-2xl border p-6 grid grid-cols-1 md:grid-cols-3 gap-6 z-50"
          role="menu"
        >
          {section.featured && (
            <Link href={section.featured.href} className="group block">
              {section.featured.kicker && (
                <div className="text-xs uppercase tracking-wider text-orange-600 mb-2">
                  {section.featured.kicker}
                </div>
              )}
              <div className="relative w-full h-40 rounded-xl overflow-hidden">
                <Image
                  src={section.featured.image}
                  alt={section.featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="mt-3 font-semibold group-hover:underline leading-tight">
                {section.featured.title}
              </div>
              {section.featured.desc && (
                <p className="text-sm text-zinc-600 mt-1">{section.featured.desc}</p>
              )}
            </Link>
          )}

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {section.groups.map(group => (
              <div key={group.title}>
                <div className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                  {group.title}
                </div>
                <ul className="space-y-2">
                  {group.items.map(item => (
                    <li key={item.label}>
                      <Link href={item.href} className="block">
                        <div className="font-medium hover:underline">{item.label}</div>
                        {item.desc && <p className="text-sm text-zinc-600">{item.desc}</p>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
