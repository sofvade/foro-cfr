import Hero from '@/components/Hero'
import ArticleCard from '@/components/ArticleCard'

export default function Home() {
  const featured = [
    { title: 'Cómo abrir cuenta bancaria siendo estudiante no UE', kicker: 'In Brief', href: '/analysis/cuenta-bancaria' },
    { title: 'Residencias vs. pisos compartidos: costo total 2025', kicker: 'Análisis', href: '/analysis/alojamiento-2025' },
    { title: 'Checklist legal para Erasmus (España)', kicker: 'Temas', href: '/topics/legal/checklist-erasmus' },
  ]
  return (
    <div>
      <Hero />
      <section className="mx-auto max-w-6xl px-4">
        <h2 className="font-serif text-2xl mb-4">Lo más reciente</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((a) => <ArticleCard key={a.href} {...a} />)}
        </div>
      </section>
    </div>
  )
}
