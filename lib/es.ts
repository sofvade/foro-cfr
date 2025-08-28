// lib/universidades-es.ts
export type Uni = {
name: string; city: string; region: string; type: 'Pública' | 'Privada'; score: number; intlPct?: number;
};


export const UNIVERSITIES_ES: Uni[] = [
{ name: 'Universidad Complutense de Madrid', city: 'Madrid', region: 'Comunidad de Madrid', type: 'Pública', score: 92, intlPct: 14 },
{ name: 'Universidad Autónoma de Madrid', city: 'Madrid', region: 'Comunidad de Madrid', type: 'Pública', score: 89, intlPct: 18 },
{ name: 'Universidad Carlos III de Madrid', city: 'Getafe', region: 'Comunidad de Madrid', type: 'Pública', score: 88, intlPct: 20 },
{ name: 'Universidad Politécnica de Madrid', city: 'Madrid', region: 'Comunidad de Madrid', type: 'Pública', score: 87, intlPct: 13 },
{ name: 'Universitat de Barcelona', city: 'Barcelona', region: 'Cataluña', type: 'Pública', score: 91, intlPct: 15 },
{ name: 'Universitat Autònoma de Barcelona', city: 'Cerdanyola del Vallès', region: 'Cataluña', type: 'Pública', score: 90, intlPct: 19 },
{ name: 'Universitat Pompeu Fabra', city: 'Barcelona', region: 'Cataluña', type: 'Pública', score: 90, intlPct: 22 },
{ name: 'Universidad de Navarra', city: 'Pamplona', region: 'Navarra', type: 'Privada', score: 90, intlPct: 25 },
{ name: 'Universidad de Valencia', city: 'Valencia', region: 'Comunidad Valenciana', type: 'Pública', score: 86, intlPct: 12 },
{ name: 'Universidad Politécnica de Valencia', city: 'Valencia', region: 'Comunidad Valenciana', type: 'Pública', score: 87, intlPct: 16 },
{ name: 'Universidad de Sevilla', city: 'Sevilla', region: 'Andalucía', type: 'Pública', score: 85, intlPct: 9 },
{ name: 'Universidad de Granada', city: 'Granada', region: 'Andalucía', type: 'Pública', score: 88, intlPct: 17 },
{ name: 'Universidad de Salamanca', city: 'Salamanca', region: 'Castilla y León', type: 'Pública', score: 84, intlPct: 15 },
{ name: 'Universidad del País Vasco', city: 'Bilbao', region: 'País Vasco', type: 'Pública', score: 83, intlPct: 8 },
{ name: 'IE University', city: 'Segovia/Madrid', region: 'Castilla y León / Madrid', type: 'Privada', score: 89, intlPct: 75 },
];
