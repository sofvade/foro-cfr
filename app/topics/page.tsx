export default function Topics() {
  const items = ['Alojamiento', 'Visados', 'Finanzas', 'Vida universitaria', 'Salud mental', 'Trabajo'];
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 container-prose">
      <h1 className="font-serif text-4xl">Temas</h1>
      <ul className="grid md:grid-cols-3 gap-3 mt-6">
        {items.map(t => <li key={t} className="p-4 border rounded-2xl">{t}</li>)}
      </ul>
    </section>
  );
}
