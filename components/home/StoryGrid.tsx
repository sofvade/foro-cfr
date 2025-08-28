'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Story } from '@/lib/home';

export default function StoryGrid({ stories, title, viewAllHref }:{
  stories: Story[];
  title: string;
  viewAllHref?: string;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-sm text-zinc-600 hover:underline">
            Ver todo →
          </Link>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((s) => (
          <Link key={s.title} href={s.href} className="group block">
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
              <Image src={s.image} alt={s.title} fill className="object-cover group-hover:scale-[1.03] transition" />
            </div>
            {s.kicker && (
              <div className="mt-3 text-xs uppercase tracking-wider text-orange-600">{s.kicker}</div>
            )}
            <h3 className="mt-1 font-semibold group-hover:underline">{s.title}</h3>
            {s.excerpt && <p className="text-sm text-zinc-600 mt-1 line-clamp-2">{s.excerpt}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}
