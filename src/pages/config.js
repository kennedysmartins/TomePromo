import React, { useState } from "react";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import 'tailwindcss/tailwind.css';
import { Box } from "@/components/Box";
import { Bottom } from "@/components/Bottom";

const Config = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <Container bgActive={false}>
      <Header onMenuToggle={handleMenuToggle} />
      <div className="flex">
        {/* Mostra a Sidebar apenas em telas desktop (a partir do tamanho md) */}
        <Sidebar className={`hidden md:flex flex-col`} isOpen={isDrawerOpen} onClose={handleMenuToggle} />

        <Content>
          <div className="flex flex-col">
            <br></br>
            <div>
              <h1 className="mt-2 text-4xl p-4  ">Configurações</h1>
              <h1 className="text-lg px-4  ">Gerencie o App</h1>
            </div>
            <div>
              <Box>
                <h3>Dark Mode</h3>
              </Box>
            </div>
          </div>

          {/* Mostra a Bottom apenas em telas menores que md (ou seja, em dispositivos móveis e tablets) */}
          <Bottom className={`md:hidden`} />
        </Content>
      </div>
    </Container>
  );
};

export default Config;
