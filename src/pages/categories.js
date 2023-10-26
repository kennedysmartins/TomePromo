import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Bottom } from "@/components/Bottom";
import { DrawerContext } from "@/contexts/DrawerContext";
import { getCategories } from "@/utils/api";


import "tailwindcss/tailwind.css";

const Categories = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [categories, setCategories] = useState(Array(3).fill({})) 

  useEffect(() => {
    const fetchData = async () => {
      const dataCategories = await getCategories(); 
      const updatedCategories = [...dataCategories.slice(0, 20)];
      setCategories(updatedCategories);
    };

    fetchData();
  }, [])

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      if (status === "loading") return;

      if (!session) {
        router.push("/login");
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
      <Header />
      <div className="flex">
        <Sidebar
          className={`hidden md:flex flex-col`}
          isOpen={isDrawerOpen}
          onClose={handleMenuToggle}
        />
        <Content className="m-8">
          <h1 className="mt-2 text-4xl p-4 ">Categorias</h1>
          <h2 className="text-lg px-4  ">Crie e gerencie as categorias</h2>
          <div className="p-4">
          <ul>
                  {categories.map((categorie) => (
                      <li key={categorie.id}>
                        <div className="">
                          
                          <p className="border rounded p-2 my-2 shadow-md">{categorie.name}</p>
                        </div>
                      </li>
                    ))}
                </ul>
          </div>
        </Content>
      </div>
      <Bottom className={`md:hidden`} />
    </Container>
  );
};

export default Categories;
