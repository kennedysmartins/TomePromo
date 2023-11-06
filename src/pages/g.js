import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@/components/Container';
import Head from 'next/head';

export default function Grupo() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para o link desejado
    const redirectUrl = 'https://chat.whatsapp.com/IbfoPrn1K8fDpXqFvn7n5H';
    router.push(redirectUrl);
  }, []);

  return <Container>
    <Head>
        <title>Grupo de Promoções - TomePromo</title>
        <meta property="og:title" content="Black Friday - TomePromo" />
        <meta property="og:image" content="https://www.tomepromo.com.br/blackfriday-tomepromo.png" />
        <meta property="og:url" content={`https://tomepromo.com.br/g/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TomePromo" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="description" content="Aproveite as ofertas do esquenta Black Friday - TomePromo" /> 
      </Head>
    Redirecionando...
    </Container>;
}
