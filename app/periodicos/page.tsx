// app/periodicos/page.tsx

export const metadata = {
  title: "Periódicos de España — Campus Insight Board",
  description:
    "Acceso rápido a los principales periódicos de España. Prensa nacional y regional.",
};

type Paper = { name: string; url: string; region?: string };

const NACIONALES: Paper[] = [
  { name: "El País", url: "https://elpais.com" },
  { name: "El Mundo", url: "https://www.elmundo.es" },
  { name: "La Vanguardia", url: "https://www.lavanguardia.com" },
  { name: "ABC", url: "https://www.abc.es" },
  { name: "El Periódico", url: "https://www.elperiodico.com" },
  { name: "La Razón", url: "https://www.larazon.es" },
  { name: "El Confidencial", url: "https://www.elconfidencial.com" },
  { name: "eldiario.es", url: "https://www.eldiario.es" },
  { name: "El Español", url: "https://www.elespanol.com" },
];

const REGIONALES: Paper[] = [
  { name: "Levante-EMV (C. Valenciana)", url: "https://www.levante-emv.com", region: "C. Valenciana" },
  { name: "La Voz de Galicia", url: "https://www.lavozdegalicia.es", region: "Galicia" },
  { name: "Diario de Sevilla", url: "https://www.diariodesevilla.es", region: "Andalucía" },
  { name: "El Diario Vasco", url: "https://www.diariovasco.com", region: "País Vasco" },
  { name: "Heraldo de Aragón", url: "https://www.heraldo.es", region: "Aragón" },
  { name: "El Comercio", url: "https://www.elcomercio.es", region: "Asturias" },
];

// Componente auxiliar SIN export (¡importante! no uses "export" aquí)
function Grid({ items }: { items: Paper[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((p) => (
        <li key={p.url} className="rounded-lg border p-3">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            {p.name}
          </a>
          {p.region ? (
            <span className="block text-xs opacity-70">{p.region}</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">Periódicos de España</h1>
        <p className="text-sm opacity-80">
          Haz clic para abrir el medio en una nueva pestaña.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-xl font-medium">Prensa nacional</h2>
        <Grid items={NACIONALES} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-medium">Prensa regional</h2>
        <Grid items={REGIONALES} />
      </section>
    </main>
  );
}

// keep
