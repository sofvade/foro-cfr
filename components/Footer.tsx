export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-[var(--muted)] grid md:grid-cols-3 gap-6">
        <div>
          <p className="font-serif text-lg text-black">Campus Insight Board</p>
          <p>Foro educativo independiente. Inspirado en formatos editoriales profesionales.</p>
        </div>
        <div>
          <p className="font-semibold text-black mb-2">Recursos</p>
          <ul className="space-y-1">
            <li><a className="hover:underline" href="/about">Sobre nosotros</a></li>
            <li><a className="hover:underline" href="/forum">Foro</a></li>
            <li><a className="hover:underline" href="/topics">Temas</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-black mb-2">Legal</p>
          <ul className="space-y-1">
            <li><a className="hover:underline" href="#">Privacidad</a></li>
            <li><a className="hover:underline" href="#">Términos</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
