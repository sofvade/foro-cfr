export default function Analysis() {
  const items = [
    { title: 'Mercado de vivienda estudiantil 2025', href: '#' },
    { title: 'Tendencias de visados y cupos universitarios', href: '#' },
    { title: 'Coste de vida para máster en Madrid', href: '#' },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 container-prose">
      <h1 className="font-serif text-4xl">Análisis</h1>
      <p>Investigaciones y artículos de fondo para entender el contexto.</p>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {items.map(i => <a key={i.title} className="p-4 border rounded-2xl hover:bg-gray-50" href={i.href}><h3 className="font-serif text-xl">{i.title}</h3></a>)}
      </div>
    </section>
  );
}
