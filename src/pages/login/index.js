"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Bottom } from "@/components/Bottom";
import CompleteProfile from "@/components/CompleteProfile";
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
      setShouldRender(true);
    };

    checkSessionAndRedirect();
    setIsDrawerOpen(drawer === "open");
  }, [router, drawer, status]);

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    toggleDrawer();
  };

  if (status === "loading") {
    return null;
  }

  if (!shouldRender) {
    return null;
  }

  if (session) {
    return (
      <Container bgActive={false}>
        <Header />
        <div className="flex">
          <Sidebar
            className={`hidden md:flex flex-col`}
            isOpen={isDrawerOpen}
            onClose={handleMenuToggle}
          />

          <Content>
            <div>
              <h1 className="mt-2 text-4xl p-4 ">Você está logado</h1>
              <h2 className="text-lg px-4  ">
                Logado como: {session.user.name}, <br/>E-mail: {session.user.email}
              </h2>
            </div>
            <div className="mt-4">
              <CompleteProfile user={session.user} />
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 ml-4 my-14 px-4 rounded"
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
      <div className="flex">
        <Sidebar
          className={`hidden md:flex flex-col`}
          isOpen={isDrawerOpen}
          onClose={handleMenuToggle}
        />
        <Content>
        <div>
              <h1 className="mt-2 text-4xl p-4 ">Você está deslogado</h1>
              <h2 className="text-lg px-4  ">
                Logue com o Google!
              </h2>
            </div>

          <button
            className="bg-blue-500 ml-4 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => signIn("google")}
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
