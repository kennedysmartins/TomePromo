import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Bottom } from "@/components/Bottom";
import { DrawerContext } from "@/contexts/DrawerContext";

import "tailwindcss/tailwind.css";
import { Box } from "@/components/Box";

const Users = () => {
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
      <Sidebar className={`hidden md:flex flex-col`} isOpen={isDrawerOpen} onClose={handleMenuToggle} />
        <Content>
            <div>
              <h1 className="text-4xl p-4  ">Usuários</h1>
              <h1 className=" text-lg px-4  ">Gerencie os usuários</h1>
            </div>

            <main className="h-80 md:w-full whitespace-nowrap grid-cols-2 md:grid-cols-3 md:grid flex flex-col gap-x-6 px-4">
            <Box>
              <div className="flex flex-row gap-3 justify-center items-center cursor-pointer">
                <picture>
                  <img
                    className="rounded-full w-10"
                    src="https://github.com/kennedysmartins.png"
                  />
                </picture>
                <h3>Kennedy Martins</h3>
              </div>
            </Box>
            <Box>
              <div className="flex flex-row gap-3 justify-center items-center cursor-pointer">
                <picture>
                  <img
                    className="rounded-full w-10"
                    src="https://github.com/EduHSMattos.png"
                  />
                </picture>
                <h3>Eduardo Mattos</h3>
              </div>
            </Box>
            <Box>
              <div className="flex flex-row gap-3 justify-center items-center cursor-pointer">
                <picture>
                  <img
                    className="rounded-full w-10"
                    src="https://github.com/ThiagoSViana.png"
                  />
                </picture>
                <h3>Thiago Viana</h3>
              </div>
            </Box>
            <Box>
              <div className="flex flex-row gap-3 justify-center items-center cursor-pointer">
                <picture>
                  <img
                    className="rounded-full w-10"
                    src="https://github.com/sergiohs.png"
                  />
                </picture>
                <h3>Sérgio Henrique</h3>
              </div>
            </Box>
            <Box>
              <div className="flex flex-row gap-3 justify-center items-center cursor-pointer">
                <picture>
                  <img
                    className="rounded-full w-10"
                    src="https://github.com/greicyellem.png"
                  />
                </picture>
                <h3>Greicyellem</h3>
              </div>
            </Box>

            <Box>
              <div className="flex flex-row gap-3 justify-center items-center cursor-pointer">
                <picture>
                  <img
                    className="rounded-full w-10"
                    src="https://github.com/kerolmrts.png"
                  />
                </picture>
                <h3>Kerolayne Martins</h3>
              </div>
            </Box>
            
            </main>
          <Bottom className={`md:hidden`} />
        </Content>
      </div>
    </Container>
  );
};

export default Users;
