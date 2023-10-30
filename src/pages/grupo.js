import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Grupo() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para o link desejado
    const redirectUrl = 'https://chat.whatsapp.com/IbfoPrn1K8fDpXqFvn7n5H';
    router.push(redirectUrl);
  }, []);

  return <div>Redirecionando...</div>;
}
