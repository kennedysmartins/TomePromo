import "tailwindcss/tailwind.css";
import { useRouter } from 'next/router';
import { getProductById } from '@/utils/api';
import Head from 'next/head';
import { Container } from '@/components/Container';
import { ContentHome } from '@/components/ContentHome';
import { Header } from '@/components/Header';
import { Card } from '@/components/Card';


export default function PromoPage({ product }) {
  const router = useRouter();

  if (!product) {
    return 
  }

  return (
    <Container>
      <Head>
        <title>{product.title}</title>
        <meta property="og:title" content={product.title} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={`https://tomepromo.com.br/p/${router.query.ItemId}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TomePromo" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="description" content="Quer promoção? então Tome! - TomePromo" /> 
      </Head>
      <Header />
      <ContentHome>
        <div className="flex flex-col sm:flex-row justify-center items-start">
          <Card
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            linkCompra={product.linkCompra}
            data={product.data}
            hora={product.hora}
            text1={product.text1}
            text2={product.text2}
            condition={product.condition}
            text4={product.text4}
            text5={product.text5}
            text6={product.text6}
            text7={product.text7}
            price={product.price}
            priceoriginal={product.priceoriginal}
          />
        </div>
      </ContentHome>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { ItemId } = context.query;

  try {
    const product = await getProductById(Number(ItemId));
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Erro ao obter o produto pelo ID:', error);
    return {
      props: {
        product: null,
      },
    };
  }
}
