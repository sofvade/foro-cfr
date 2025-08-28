'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Story } from '@/lib/home';

export default function FeaturedHero({
  featured,
  right,
}: { featured: Story; right: Story[] }) {
  return (
    <section className="grid lg:grid-cols-3 gap-6 items-start">
      {/* Izquierda: Featured grande */}
      <Link href={featured.href} className="lg:col-span-2 group block">
        {featured.kicker && (
          <div className="text-xs uppercase tracking-wider text-orange-600 mb-2">
            {featured.kicker}
          </div>
        )}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition"
            priority
          />
        </div>
        <h2 className="mt-4 text-3xl font-bold leading-tight group-hover:underline">
          {featured.title}
        </h2>
        {featured.excerpt && (
          <p className="mt-2 text-zinc-700 max-w-3xl">{featured.excerpt}</p>
        )}
      </Link>

      {/* Derecha: dos tarjetas verticales */}
      <div className="space-y-6">
        {right.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="grid grid-cols-5 gap-3 group"
          >
            <div className="relative col-span-2 aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover group-hover:scale-[1.05] transition"
              />
            </div>
            <div className="col-span-3">
              {s.kicker && (
                <div className="text-xs uppercase tracking-wider text-orange-600">
                  {s.kicker}
                </div>
              )}
              <h3 className="font-semibold leading-snug group-hover:underline">
                {s.title}
              </h3>
              {s.excerpt && (
                <p className="text-sm text-zinc-600 mt-1 line-clamp-3">
                  {s.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
