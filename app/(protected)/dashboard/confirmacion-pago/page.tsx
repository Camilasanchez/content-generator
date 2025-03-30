'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfirmacionPagoPage() {
  const [estado, setEstado] = useState<'verificando' | 'listo'>('verificando');
  const router = useRouter();

  useEffect(() => {
    const confirmar = async () => {
      const res = await fetch('/api/marcar-pago', {
        method: 'POST',
      });

      if (res.ok) {
        setEstado('listo');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    };

    confirmar();
  }, [router]);

  return (
    <main className="max-w-lg mx-auto p-10 text-center">
      {estado === 'verificando' ? (
        <p>Verificando tu pago...</p>
      ) : (
        <p className="text-green-600 font-semibold">
          ✅ ¡Pago confirmado! Redirigiendo...
        </p>
      )}
    </main>
  );
}
