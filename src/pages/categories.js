import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Bottom } from "@/components/Bottom";
import { DrawerContext } from "@/contexts/DrawerContext";


import 'tailwindcss/tailwind.css';


const Categories = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
  
  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    toggleDrawer();
  };

  if (!shouldRender) {
    return null; 
  }

  return (
    <Container bgActive={false}>
      <Header onMenuToggle={handleMenuToggle} />
      <div className="flex">
      <Sidebar className={`hidden md:flex flex-col`} isOpen={isDrawerOpen} onClose={handleMenuToggle} />
        <Content>
            <div className=" flex flex-col">
              <br></br>
              <div>
                <h1 className="mt-2 text-4xl p-4  ">Categorias</h1>
                <h1 className=" text-lg px-4  ">Crie e gerencie as categorias</h1>
              </div>
            </div>
            <Bottom className={`md:hidden`} />
        </Content>
      </div>
    </Container>
  );
};

export default Categories;
