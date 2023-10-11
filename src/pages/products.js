import React, {useState} from "react";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import 'tailwindcss/tailwind.css';


const products = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
              <div>
                <h1 className="mt-2 text-4xl p-4  ">Produtos</h1>
                <h1 className=" text-lg px-4  ">Gerenciamento de ofertas</h1>
              </div>
            </div>
        </Content>
      </div>
    </Container>
  );
};

export default products;
