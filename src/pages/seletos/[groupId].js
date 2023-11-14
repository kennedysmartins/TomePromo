import "tailwindcss/tailwind.css";
import { useRouter } from 'next/router';
import { getProductGroups, getProductsByGroup } from '@/utils/api';
import Head from 'next/head';
import { Container } from '@/components/Container';
import { ContentHome } from '@/components/ContentHome';
import { Header } from '@/components/Header';
import { Card } from '@/components/Card';

export default function PromoGroupPage({ productsByGroup }) {

  if (!productsByGroup) {
    return <p>Carregando...</p>;
  }


  return (
    <Container>
      <Head>
        {/* Coloque aqui as tags meta */}
      </Head>
      <Header />
      <ContentHome>
      <div className="flex flex-col justify-center items-center">
          {productsByGroup.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              imagePath={product.imagePath}
              title={product.title}
              buyLink={product.buyLink}
              data={product.data}
              hora={product.hora}
              catchyText={product.catchyText}
              productName={product.productName}
              conditionPayment={product.conditionPayment}
              sponsorLink={product.sponsorLink}
              announcement1={product.announcement1}
              announcement2={product.announcement2}
              currentPrice={product.currentPrice}
              originalPrice={product.originalPrice}
              recurrencePrice={product.recurrencePrice}
            />
          ))}
        </div>
      </ContentHome>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const {groupId} = context.query;

  try {
    const productsByGroup = await getProductsByGroup(Number(groupId));

    return {
      props: {
        productsByGroup: productsByGroup || null,
      },
    };
  } catch (error) {
    console.error('Erro ao obter o produto pelo ID:', error);
    return {
      props: {
        productsByGroup: null,
      },
    };
  }
}
