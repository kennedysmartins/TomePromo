import React, {useState} from "react";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Bottom } from "@/components/Bottom";

import 'tailwindcss/tailwind.css';


const Profile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }
  return (
    <Container bgActive={false}>
      <Header onMenuToggle={handleMenuToggle} />
      <div className="flex">
      <Sidebar className={`hidden md:flex flex-col`} isOpen={isDrawerOpen} onClose={handleMenuToggle} />
            <div className=" flex flex-col">
              <br></br>
              <div>
                <h1 className="mt-2 text-4xl p-4  ">Perfil</h1>
                <h1 className=" text-lg px-4  ">Crie e gerencie as categorias</h1>
              </div>
            </div>
            <Bottom className={`md:hidden`} />
      </div>
    </Container>
  );
};

export default Profile;
