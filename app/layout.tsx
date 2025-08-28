import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: 'Foro Educativo',
  description: 'Foro con análisis y ranking de universidades en España.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-zinc-900">
        <Header />
        {children}
      </body>
    </html>
  );
}

