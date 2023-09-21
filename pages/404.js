import React from "react";
import { Container } from "@/components/Container"
import { Content } from "@/components/Content"
import { Header } from "@/components/Header"
import 'tailwindcss/tailwind.css';
import { Card } from "@/components/Card";

const Custom404 = () => {
    return(
        <Container>
          <Header />
          <Content>
            <Card
            imageURL="https://flyingcdn-f1b39866.b-cdn.net/wp-content/uploads/2022/04/404.gif"
            nomeProduto="404 Não Encontrado"
            linkCompra="/"
            data="01/01/01"
            hora="00:00"
            />
        </Content>
        </Container>
    )
}

export default Custom404;




