'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <h1 className="font-serif text-3xl mb-4">Entrar</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signIn('credentials', { email, password, callbackUrl: '/' });
        }}
        className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-black text-white rounded p-2">Entrar</button>
      </form>
      <p className="text-sm mt-3">¿No tienes cuenta? <a className="underline" href="/auth/register">Crear cuenta</a></p>
    </section>
  );
}
