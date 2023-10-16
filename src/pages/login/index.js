"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Bottom } from "@/components/Bottom";
import CompleteProfile from '@/components/CompleteProfile'
import "tailwindcss/tailwind.css";

const LoginPage = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    console.log("process.env em string:", JSON.stringify(process.env));


  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);
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
          <Content>
            <div className=" flex flex-col">
              <br></br>
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
          </Content>
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
        <Content>
          <div className=" flex flex-col">
            <br></br>
            <div>
              <h1 className="mt-2 text-4xl p-4  ">Você não está logado</h1>
              <h1 className=" text-lg px-4  ">Logue com o Google!</h1>
              <button
  className="bg-blue-500 ml-4 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
  onClick={() => signIn('google', { callbackUrl: '/', redirect: false })}
>
  Sign in
</button>
            </div>
          </div>
          <Bottom className={`md:hidden`} />
        </Content>
      </div>
    </Container>
  );
};

export default LoginPage;
