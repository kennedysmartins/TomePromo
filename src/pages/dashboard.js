import React, {useState} from "react";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import 'tailwindcss/tailwind.css';
import { Box } from "@/components/Box";


const dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <Container bgActive={false}>
      <Header onMenuToggle={handleMenuToggle} />
      <div className="flex">
        <Sidebar isOpen={isDrawerOpen} onClose={handleMenuToggle}/>
        <Content>
            <div className=" flex flex-col">
              <br></br>
              <div className="mb-4">
                <h1 className="mt-2 text-4xl p-4  ">Dashboard</h1>
                <h1 className=" text-lg px-4  ">Principal</h1>
              </div>
              <div className="flex w-full">
              <Box>
                <h2>Quantidade de Produtos</h2>
                <div>
                  <picture></picture>
                  <h3 className="text-8xl">85</h3>
                </div>
              </Box>
              <Box>
                <h2>Clicks/24 horas</h2>
                <div>
                  <picture></picture>
                  <h3 className="text-8xl">182</h3>
                </div>
              </Box>
              </div>
            </div>
        </Content>
      </div>
    </Container>
  );
};

export default dashboard;
