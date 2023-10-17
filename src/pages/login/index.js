"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Bottom } from "@/components/Bottom";
import CompleteProfile from '@/components/CompleteProfile'
import { DrawerContext } from "@/contexts/DrawerContext";

import "tailwindcss/tailwind.css";

const LoginPage = () => {
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);


    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      const checkSessionAndRedirect = async () => {
        if (status === "loading") return;
  
        if (session) {
          setShouldRender(true);
        }
      };
  
      checkSessionAndRedirect();
      setIsDrawerOpen(drawer === "open");
    }, [router, drawer]);

    const handleMenuToggle = () => {
      setIsDrawerOpen(!isDrawerOpen);
      toggleDrawer();
    };

    if (!shouldRender) {
      return null;
    }
 

  if (session) {
    return (

      <Container bgActive={false}>
      <Header />
      <div className="grid grid-cols-3 min-h-screen h-full">
      <div className="col-span-1 min-h-screen h-full overflow-y-auto">
        <Sidebar
          className={`hidden md:flex flex-col`}
          isOpen={isDrawerOpen}
          onClose={handleMenuToggle}
        />
        </div>
        <Content className="m-8 col-span-2">
          <h1 className="mt-2 text-4xl p-4 ">Você está logado</h1>
          <h2 className="text-lg px-4  ">Logado como: {session.user.name}, e-mail: {session.user.email}</h2>
          <div>
                <CompleteProfile user={session.user}/>
            </div>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-4 mt-2 px-4 rounded-full'
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </button>
        </Content>
      </div>
      <Bottom className={`md:hidden`} />
    </Container>



      
    );
  }
  return (

    <Container bgActive={false}>
      <Header />
      <div className="flex min-h-screen h-full">
        <Sidebar
          className={`hidden md:flex flex-col`}
          isOpen={isDrawerOpen}
          onClose={handleMenuToggle}
        />
        <Content className="m-8">
          <h1 className="mt-2 text-4xl p-4 ">Você não está logado</h1>
          <h2 className="text-lg px-4  ">Logue com o Google</h2>
          
            <button
  className="bg-blue-500 ml-4 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
  onClick={() => signIn('google')}
>
  Sign in
</button>
        </Content>
      </div>
      <Bottom className={`md:hidden`} />
    </Container>


    
  );
};

export default LoginPage;
