"use client";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { ContentHome } from "@/components/ContentHome";
import { Header } from "@/components/Header";
import { getProducts } from "@/utils/api";
import { useEffect, useState, useRef } from "react";
import 'tailwindcss/tailwind.css';

export default function Home() {
  const [products, setProducts] = useState(Array(3).fill({}));
  const bottomRef = useRef(null); // Referência para o elemento final da página

  useEffect(() => {
    const fetchData = async () => {
      const dataProducts = await getProducts();
      const updatedProducts = [...dataProducts.slice(0, 20)];
      setProducts(updatedProducts);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [products]);

  return (
    <Container>
      <Header />
      <ContentHome>
        <div className="flex flex-col justify-center items-center">
          {products.map((product) => {
            return (
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
