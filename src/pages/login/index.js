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
 

  if (session) {
    return (
      <Container bgActive={false}>

        <Header onMenuToggle={handleMenuToggle} />
        <div className="flex">
          <Sidebar
            className={`hidden md:flex flex-col`}
            isOpen={isDrawerOpen}
            onClose={handleMenuToggle}
          />
            <div className=" flex flex-col">
              <div>
                <h1 className="mt-2 text-4xl p-4  ">Você está logado</h1>

                <h1 className=" text-lg px-4  ">
                Logado como: {session.user.name}, e-mail: {session.user.email}
                </h1>
                
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
              </div>
            </div>
            <Bottom className={`md:hidden`} />
        </div>
      </Container>
    );
  }
  return (
    <Container bgActive={false}>
      <Header onMenuToggle={handleMenuToggle} />
      <div className="flex">
        <Sidebar
          className={`hidden md:flex flex-col`}
          isOpen={isDrawerOpen}
          onClose={handleMenuToggle}
        />
          <div className=" flex flex-col">
            <br></br>
            <div>
              <h1 className="mt-2 text-4xl p-4  ">Você não está logado</h1>
              <h1 className=" text-lg px-4  ">Logue com o Google!</h1>
              <button
  className="bg-blue-500 ml-4 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
  onClick={() => signIn('google')}
>
  Sign in
</button>
            </div>
          </div>
          <Bottom className={`md:hidden`} />
      </div>
    </Container>
  );
};

export default LoginPage;
