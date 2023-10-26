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
          <Content >
            <div className="flex flex-col justify-center items-center">
            <Card
            image="https://spikeandfreak.com/wp-content/uploads/2019/03/img-404.gif"
            title="404 Não Encontrado"
            linkCompra=""
            data=""
            hora=""
            />
            </div>
        </Content>
        </Container>
    )
}

export default Custom404;




