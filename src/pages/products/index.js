import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Bottom } from "@/components/Bottom";
import { DrawerContext } from "@/contexts/DrawerContext";
import { Box } from "@/components/Box";
import Link from 'next/link';



import "tailwindcss/tailwind.css";

const Products = () => {
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      if (status === 'loading') return;

      if (!session) {
        router.push('/login');
      } else {
        setShouldRender(true);
      }
    };

    checkSessionAndRedirect();

    setIsDrawerOpen(drawer === "open");
  }, [session, status, router, drawer]);

  
  if (!shouldRender) {
    return null; 
  }
  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    toggleDrawer();
  };

  return (
    <Container bgActive={false}>
      <Header onMenuToggle={handleMenuToggle} />
      <div className="flex">
        <Sidebar
          className={`hidden md:flex flex-col`}
          isOpen={isDrawerOpen}
          onClose={handleMenuToggle}
        />
      <Content>
        <div className="mt-16">
          <h1 className="mt-2 text-4xl p-4  ">Produtos</h1>
          <Box>
            <Link href="/products/create">
            <h3>Criar produto</h3>
            </Link>
          </Box>
          <Box>
            <Link href="/products/search">
            <h3>Pesquisar produto</h3>
            </Link>
          </Box>
        </div>
      </Content>
      </div>
      <Bottom className={`md:hidden`} />
    </Container>
  );
};

export default Products;
