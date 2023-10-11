import React, {useState} from "react";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import "tailwindcss/tailwind.css";
import { Box } from "@/components/Box";

const Users = () => {
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
              <h1 className="mt-2 text-4xl p-4  ">Usuários</h1>
              <h1 className=" text-lg px-4  ">Gerencie os usuários</h1>
            </div>

            <main className="h-80 w-full whitespace-nowrap overflow-hidden grid-cols-3 grid gap-x-6 px-4 ">
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
            <Box>
              <div className="flex flex-row gap-3 justify-center items-center cursor-pointer">
                <picture>
                  <img
                    className="rounded-full w-10"
                    src="https://github.com/diogoAcode.png"
                  />
                </picture>
                <h3>Diogo Almeida</h3>
              </div>
            </Box>
            <Box>
              <div className="flex flex-row gap-3 justify-center items-center cursor-pointer">
                <picture>
                  <img
                    className="rounded-full w-10"
                    src="https://github.com/arieljunior.png"
                  />
                </picture>
                <h3>Ariel Júnior</h3>
              </div>
            </Box>
            </main>
          </div>
        </Content>
      </div>
    </Container>
  );
};

export default Users;
