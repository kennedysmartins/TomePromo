import React, { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { ContentHome } from "@/components/ContentHome";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { useRouter } from "next/router";
import { getProductById } from "@/utils/api";
import Head from "next/head";
import "tailwindcss/tailwind.css";

function PromoPage() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const productID = router.query.ItemId;
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchProduct = async () => {
      if (productID) {
        try {
          const result = await getProductById(Number(productID));
          setProduct(result);
          setIsLoading(false); // Define isLoading para falso quando os dados são carregados
        } catch (error) {
          console.error("Erro ao obter o produto pelo ID:", error);
        }
      }
    };

    fetchProduct();
  }, [productID]);

  useEffect(() => {
    const currentUrl = router.asPath;
  }, [router.asPath])

  if (isLoading) {
    return <div>Carregando...</div>; // Renderiza um indicador de carregamento enquanto os dados estão sendo buscados
  }



  return (
    <Container>
      <Head>
        <title>{product.title}</title>
        <meta property="og:title" content={product.title} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={router.asPath} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TomePromo" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:locale:alternate" content="en_US" />
      </Head>
      <Header />
      <ContentHome>
        <div className="flex flex-col sm:flex-row justify-center items-start">
          <Card
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
          />
        </div>
      </ContentHome>
    </Container>
  );
}

export default PromoPage;
