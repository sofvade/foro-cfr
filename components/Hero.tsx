import Link from 'next/link';

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">
            Ideas que mueven campus. Análisis, debates y foros abiertos.
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl">
            Un hub editorial con secciones tipo CFR (Análisis, Temas, In Brief) y un foro moderno
            para estudiantes internacionales en España.
          </p>
          <div className="flex gap-3">
            <Link href="/forum" className="px-4 py-2 rounded-full bg-black text-white text-sm">Entrar al Foro</Link>
            <Link href="/analysis" className="px-4 py-2 rounded-full border text-sm">Ver análisis</Link>
          </div>
        </div>
        <div className="space-y-3">
          <article className="p-4 border rounded-2xl">
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">In Brief</p>
            <h3 className="font-serif text-xl">Guía rápida: empadronamiento y NIE para estudiantes</h3>
          </article>
          <article className="p-4 border rounded-2xl">
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Análisis</p>
            <h3 className="font-serif text-xl">Mercado de vivienda estudiantil en Madrid: 2025</h3>
          </article>
        </div>
      </div>
    </section>
  );
}
