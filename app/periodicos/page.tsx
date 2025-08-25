// app/periodicos/page.tsx
export const metadata = {
  title: "Periódicos de España — Campus Insight Board",
  description:
    "Acceso rápido a los principales periódicos de España. Prensa nacional y regional en un solo lugar.",
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
  { name: "Público", url: "https://www.publico.es" },
];

const REGIONALES: Paper[] = [
  { name: "El Correo (País Vasco)", url: "https://www.elcorreo.com" },
  { name: "La Voz de Galicia", url: "https://www.lavozdegalicia.es" },
  { name: "Faro de Vigo", url: "https://www.farodevigo.es" },
  { name: "Heraldo de Aragón", url: "https://www.heraldo.es" },
  { name: "Diario de Sevilla", url: "https://www.diariodesevilla.es" },
  { name: "Diario de Cádiz", url: "https://www.diariodecadiz.es" },
  { name: "Levante-EMV (Valencia)", url: "https://www.levante-emv.com" },
  { name: "Las Provincias (Valencia)", url: "https://www.lasprovincias.es" },
  { name: "La Nueva España (Asturias)", url: "https://www.lne.es" },
  { name: "El Diario Montañés (Cantabria)", url: "https://www.eldiariomontanes.es" },
];

function Grid({ items }: { items: Paper[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border p-4 transition hover:shadow-md"
        >
          <h3 className="font-semibold text-lg group-hover:underline">{p.name}</h3>
          {p.region ? <p className="text-sm text-gray-600 mt-1">{p.region}</p> : null}
          <p className="text-xs text-gray-500 mt-2 break-all">{p.url}</p>
        </a>
      ))}
    </div>
  );
}

export default function PeriodicosPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Periódicos de España</h1>
        <p className="text-gray-600 mt-2">
          Acceso rápido a los principales diarios nacionales y regionales. Los enlaces se abren
          en una pestaña nueva.
        </p>
      </header>

      <section className="mb-10">
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
// app/periodicos/page.tsx
export const metadata = {
  title: "Periódicos de España — Campus Insight Board",
  description:
    "Acceso rápido a los principales periódicos de España. Prensa nacional y regional en un solo lugar.",
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
  { name: "Público", url: "https://www.publico.es" },
];

const REGIONALES: Paper[] = [
  { name: "El Correo (País Vasco)", url: "https://www.elcorreo.com" },
  { name: "La Voz de Galicia", url: "https://www.lavozdegalicia.es" },
  { name: "Faro de Vigo", url: "https://www.farodevigo.es" },
  { name: "Heraldo de Aragón", url: "https://www.heraldo.es" },
  { name: "Diario de Sevilla", url: "https://www.diariodesevilla.es" },
  { name: "Diario de Cádiz", url: "https://www.diariodecadiz.es" },
  { name: "Levante-EMV (Valencia)", url: "https://www.levante-emv.com" },
  { name: "Las Provincias (Valencia)", url: "https://www.lasprovincias.es" },
  { name: "La Nueva España (Asturias)", url: "https://www.lne.es" },
  { name: "El Diario Montañés (Cantabria)", url: "https://www.eldiariomontanes.es" },
];

function Grid({ items }: { items: Paper[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border p-4 transition hover:shadow-md"
        >
          <h3 className="font-semibold text-lg group-hover:underline">{p.name}</h3>
          {p.region ? <p className="text-sm text-gray-600 mt-1">{p.region}</p> : null}
          <p className="text-xs text-gray-500 mt-2 break-all">{p.url}</p>
        </a>
      ))}
    </div>
  );
}

export default function PeriodicosPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Periódicos de España</h1>
        <p className="text-gray-600 mt-2">
          Acceso rápido a los principales diarios nacionales y regionales. Los enlaces se abren
          en una pestaña nueva.
        </p>
      </header>

      <section className="mb-10">
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
git add app/periodicos/page.tsx
git commit -m "feat: página Periódicos de España"
git push


