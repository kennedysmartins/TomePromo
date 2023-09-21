import React from "react";
import { Container } from "@/components/Container"
import { Content } from "@/components/Content"
import { Header } from "@/components/Header"
import 'tailwindcss/tailwind.css';
import { Card } from "@/components/Card";


export function promoPage() {
    return (
        <Container>
          <Header />
          <Content>
            <Card/>
        </Content>
        </Container>
    )
}