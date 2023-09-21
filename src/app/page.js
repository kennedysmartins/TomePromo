"use client"
import { Card } from "@/components/Card"
import { Container } from "@/components/Container"
import { Content } from "@/components/Content"
import { Header } from "@/components/Header"
import { getProducts } from "@/services/products"
import { useEffect, useState } from "react"

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const dataProducts = getProducts();
    setProducts(dataProducts);
  })


  return (
    <Container>
      <Header />
      <Content>
        {products.map((product) => {
          return (
            <Card 
            key={product.id}
            imageURL={product.imageURL}
            nomeProduto={product.nomeProduto}
            linkCompra={product.linkCompra}
            data={product.data}
            hora={product.hora}
            text1={product.text1}
            text2={product.text2}
            text3={product.text3}
            text4={product.text4}
            text5={product.text5}
            text6={product.text6}
            text7={product.text7}
            />
          )
        })}

      </Content>
    </Container>
    
  )
}
