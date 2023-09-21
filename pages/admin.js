import 'tailwindcss/tailwind.css';
import React from "react";
import { Container } from "@/components/Container"
import { Content } from "@/components/Content"
import { Header } from "@/components/Header"

const admin = () => {
    return (
        <Container>
          <Header />
          <Content>
            <div>
                <h1 className="text-red">Bem vindo a página Admin</h1>
                <button className="text-red bg-red">Olá</button>
            </div>
        </Content>
        </Container>
    )
}

export default admin;