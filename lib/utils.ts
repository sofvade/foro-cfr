export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
export const site = {
  name: "Campus Insight Board",
  description: "Análisis, debates y foros abiertos para estudiantes internacionales.",
  nav: [
    { href: "/", label: "Inicio" },
    { href: "/analysis", label: "Análisis" },
    { href: "/topics", label: "Temas" },
    { href: "/forum", label: "Foro" },
    { href: "/about", label: "Sobre nosotros" },
  ]
}
