import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Bottom } from "@/components/Bottom";

import 'tailwindcss/tailwind.css';


const Products = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  useEffect(() => {
    if (!session) {
      router.push('/login'); 
    }
  }, [session, router]);

  return (
    <Container bgActive={false}>
      <Header onMenuToggle={handleMenuToggle} />
      <div className="flex">
      <Sidebar className={`hidden md:flex flex-col`} isOpen={isDrawerOpen} onClose={handleMenuToggle} />
        <Content>
            <div className=" flex flex-col">
              <br></br>
              <div>
                <h1 className="mt-2 text-4xl p-4  ">Produtos</h1>
                <h1 className=" text-lg px-4  ">Gerenciamento de ofertas</h1>
              </div>
            </div>
            <Bottom className={`md:hidden`} />
        </Content>
      </div>
    </Container>
  );
};

export default Products;
