"use client";
import Head from 'next/head';
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { ContentHome } from "@/components/ContentHome";
import { Header } from "@/components/Header";
import { getProducts } from "@/utils/api";
import { useEffect, useState, useRef } from "react";
import 'tailwindcss/tailwind.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [maxProducts, setMaxProducts] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [batchSize, setBatchSize] = useState(15);
  const [initialLoad, setInitialLoad] = useState(true);
  const [scroll, setScroll] = useState(true);

  const bottomRef = useRef(null); // Referência para o elemento final da página

  useEffect(() => {
    if(scroll) {
    const fetchData = async () => {
      const dataProducts = await getProducts();
      setMaxProducts(dataProducts.length)
      const updatedProducts = dataProducts.slice(dataProducts.length - batchSize - startIndex, dataProducts.length - startIndex);
      setProducts(updatedProducts);
      if (initialLoad) {
        setInitialLoad(false);
      
    };
  } 

    fetchData();
  }else{
    return
  }
  }, [startIndex, batchSize, initialLoad]);

  const handleScroll = () => {
  if (
    document.documentElement.scrollTop === 0 &&
    products.length < maxProducts &&
    scroll
  ) {
    setScroll(false);
    setBatchSize((prevBatchSize) => prevBatchSize + 1);
    setStartIndex((prev) => Math.min(prev, Math.max(0, products.length - 1)));
    document.documentElement.scrollTop = 65;
    setScroll(true);
  }
};

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (products.length <= 15 && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [products]);




  return (
    <Container>
      <Head>
        <title>TomePromo</title>
        <meta property="og:title" content="TomePromo" />
        <meta property="og:image" content="https://www.tomepromo.com.br/logo-tomepromo1.jpeg" />
        <meta property="og:url" content={`https://tomepromo.com.br`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TomePromo" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="description" content="Quer promoção? então Tome! - TomePromo" /> 
      </Head>
      <Header />
      <ContentHome>
        <div className="flex flex-col justify-center items-center">
          {products.map((product) => {
            return (
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
            );
          })}
          {/* O elemento abaixo é usado para rolar a página para este ponto */}
          <div ref={bottomRef}></div>
        </div>
      </ContentHome>
    </Container>
  );
}
