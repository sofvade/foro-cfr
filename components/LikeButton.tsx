'use client';
import { useState } from 'react';

export default function LikeButton({
  threadId,
  initialCount,
  initialLiked,
}: {
  threadId: string;
  initialCount: number;
  initialLiked: boolean;
}) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(initialLiked);

  async function toggle() {
    const res = await fetch(`/api/forum/threads/${threadId}/like`, { method: 'POST' });
    if (res.status === 401) {
      alert('Inicia sesión para dar “me gusta”.');
      return;
    }
    const data = await res.json();
    setLiked(data.liked);
    setCount(data.count);
  }

  return (
    <button
      onClick={toggle}
      className={
        'inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border ' +
        (liked ? 'bg-black text-white' : 'hover:bg-gray-50')
      }
    >
      {liked ? '❤️' : '🤍'} {count}
    </button>
  );
}
