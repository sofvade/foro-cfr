# Campus Insight Board — Foro educativo estilo CFR

Plataforma Next.js (App Router) con:
- **Landing editorial** inspirada en CFR (hero, secciones: Análisis, Temas).
- **Foro funcional** (hilos y comentarios) con Prisma + SQLite.
- **Auth** con NextAuth (credenciales). Incluye endpoint simple de registro.
- **TailwindCSS** y tipografía serif para titulares.

## 1) Requisitos
- Node 18+ y npm
- (Opcional) pnpm

## 2) Configuración rápida (local HOY)
```bash
cp .env.example .env
npm i
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```
Abre http://localhost:3000

Usuario sembrado (seed): `sofia@example.com` / `demo1234`

## 3) Despliegue en Vercel (rápido)
1. Crea un proyecto nuevo en Vercel e **importa** este repo (GitHub).
2. Variables de entorno en Vercel:
   - `NEXTAUTH_SECRET` (min 32 chars)
   - `NEXTAUTH_URL` = `https://tu-dominio.vercel.app`
   - **DB**: Recomendado Postgres (Neon / Supabase).
     - `DATABASE_URL` = `postgresql://...`
3. En `prisma/schema.prisma` cambia `provider = "sqlite"` por `"postgresql"` y haz commit.
4. En Vercel, agrega comando de build: `npx prisma migrate deploy && next build`
5. Deploy 🎉

> Nota: SQLite funciona perfecto en local para hoy. Para producción, usa Postgres.

## 4) Estructura
- `app/` páginas App Router.
- `app/api/` route handlers (auth, foro).
- `prisma/` schema y seed.
- `components/` UI.
- `lib/` prisma client, utils, auth config.

## 5) Roadmap sugerido
- Roles (admin, moderadores), reportes y bloqueo de usuarios.
- Reacciones (likes), etiquetas por tema y búsqueda.
- Editor enriquecido (MDX) y subida de imágenes (UploadThing).
- Internacionalización (ES/EN) y feeds por universidad.
