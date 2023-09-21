import React from "react";

import { Container } from "@/components/Container"
import { Content } from "@/components/Content"
import { Header } from "@/components/Header"
import { Input } from "@/components/Input";
import { Title } from "@/components/Title";
import { Sidebar } from "@/components/Sidebar";

import 'tailwindcss/tailwind.css';

const admin = () => {
    return (
        <Container>
          <Header />
          <div className="flex">
            <Sidebar/>
            <div className="w-full bg-white/40">
                <Content>
                    <div className="mx-auto w-96">

                    <Title>Olá</Title>

                    </div>
                </Content>
            </div>
          </div>
          <Content>
        </Content>
        </Container>
    )
}

export default admin;