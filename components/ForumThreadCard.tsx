import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ForumThreadCard({ t }: { t: any }) {
  return (
    <Link href={`/forum/thread/${t.id}`} className="block p-4 border rounded-xl hover:bg-gray-50">
      <h4 className="font-serif text-lg">{t.title}</h4>
      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{t.content}</p>
      <p className="text-xs text-gray-500 mt-2">
        por {t.author?.name ?? 'Anónimo'} • {formatDistanceToNow(new Date(t.createdAt), { addSuffix: true, locale: es })}
      </p>
    </Link>
  );
}
