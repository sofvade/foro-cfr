export type Featured = {
  image: string;
  href: string;
  title: string;
  kicker?: string;
  desc?: string;
};

export type MenuLink = { label: string; href: string; desc?: string };
export type MenuGroup = { title: string; items: MenuLink[] };

export type MenuSection = {
  id: string;
  label: string;
  groups: MenuGroup[];
  featured?: Featured;
};

export const MENU: MenuSection[] = [
  {
    id: 'research',
    label: 'Research & Analysis',
    featured: {
      image: '/photos/menu/featured.jpg', // ← CAMBIO: antes era '/photos/featured.jpg'
      href: '/analysis',
      title: 'Panorama de Universidades en España',
      kicker: 'Featured',
      desc: 'Reportes, guías y metodología del Campus Insight Board.',
    },
    groups: [
      {
        title: 'Explora',
        items: [
          { label: 'Análisis', href: '/analysis', desc: 'Notas y estudios recientes.' },
          { label: 'Metodología del Ranking', href: '/analysis/metodologia' },
          { label: 'Fuentes y datos', href: '/analysis/datos' },
        ],
      },
      {
        title: 'Recursos',
        items: [
          { label: 'Ranking ES', href: '/universidades', desc: 'Filtra por región y tipo.' },
          { label: 'Guías prácticas', href: '/topics/guias' },
          { label: 'Explainers', href: '/topics/explainers' },
        ],
      },
    ],
  },
  {
    id: 'communities',
    label: 'Communities',
    groups: [
      {
        title: 'Participa',
        items: [
          { label: 'Foro', href: '/forum', desc: 'Preguntas y experiencias.' },
          { label: 'Categorías del foro', href: '/forum/categories' },
        ],
      },
      {
        title: 'Acerca de',
        items: [
          { label: 'Sobre nosotros', href: '/about', desc: 'Misión, equipo y contacto.' },
          { label: 'Periódicos y convocatorias', href: '/periodicos' },
        ],
      },
    ],
  },
];
