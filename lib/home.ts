export type Story = {
  title: string;
  href: string;
  image: string;
  kicker?: string;
  excerpt?: string;
  author?: string;
  };
  export const FEATURED: Story = {
  title: 'Panorama de Universidades en España 2025',
  href: '/analysis',
  image: '/photos/hero/featured-hero.jpg',
  kicker: 'Research & Analysis',
  excerpt:
    'Indicadores académicos, % de alumnado internacional y cómo elegir por ciudad y coste de vida.',
  author: 'Campus Insight Board',
};
export const RIGHT_COLUMN: Story[] = [
  {
    title: 'Madrid: vida universitaria y barrios para estudiantes',
    href: '/topics/ciudad-madrid',
    image: '/photos/cards/card-1.jpg',          // ✅ existe
    kicker: 'Vida universitaria',
    excerpt: 'Transporte, bibliotecas, becas y zonas recomendadas.',
  },
  {
    title: 'Dentro del aula: qué mirar al seleccionar tu programa',
    href: '/topics/seleccion-programa',
    image: '/photos/extra/berkeley.jpg',        // ✅ existe (no hay card-2.jpg aún)
    kicker: 'Guías',
    excerpt: 'Tamaño de grupo, prácticas, acreditaciones y empleabilidad.',
  },
];

export const LATEST: Story[] = [
  {
    title: 'Fin de semana en el Retiro: cultura y presupuesto',
    href: '/periodicos/ocio-madrid',
    image: '/photos/list/list-1.jpg',           // ✅ existe
    kicker: 'Ocio',
    excerpt: 'Planes low-cost para estudiantes en Madrid.',
  },
  {
    title: 'Arquitectura y espacios de estudio: Palacio de Cristal',
    href: '/topics/espacios-estudio',
    image: '/photos/list/list-2.jpg',           // ✅ existe
    kicker: 'Campus',
    excerpt: 'Lugares icónicos para concentrarte y pasear.',
  },
  {
    title: 'Universidad de Sevilla: guía rápida del campus histórico',
    href: '/universidades/sevilla',
    image: '/photos/list/list-3.jpg',           // ✅ existe
    kicker: 'Ranking ES',
    excerpt: 'Resumen de titulaciones y enlaces útiles.',
  },
];

