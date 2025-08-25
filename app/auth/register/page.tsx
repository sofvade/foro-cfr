'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [ok, setOk] = useState<string| null>(null);
  const [err, setErr] = useState<string| null>(null);

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <h1 className="font-serif text-3xl mb-4">Crear cuenta</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setOk(null); setErr(null);
          const res = await fetch('/api/auth/register', {
            method: 'POST', headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ email, name, password })
          });
          const data = await res.json();
          if (res.ok) setOk('Cuenta creada. Ahora entra.');
          else setErr(data.error || 'Error');
        }}
        className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-black text-white rounded p-2">Crear</button>
        {ok && <p className="text-green-700 text-sm">{ok}</p>}
        {err && <p className="text-red-700 text-sm">{err}</p>}
      </form>
    </section>
  );
}
