import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/Input";
import { Bottom } from "@/components/Bottom";
import { DrawerContext } from "@/contexts/DrawerContext";
import { createProduct } from "@/utils/api";
import { useForm } from "react-hook-form"


import "tailwindcss/tailwind.css";

const CreateProducts = () => {
  const { drawer, toggleDrawer } = useContext(DrawerContext);
const {register, handleSubmit} = useForm()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

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

  

  if (!shouldRender) {
    return null;
  }
  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    toggleDrawer();
  };

  const onSubmit = async (data) => {
    const success = await createProduct(data)

    if(success) {
        alert('Produto criado')
        router.push(`/products`)
    }
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
              <h1 className="mt-2 text-4xl p-4  ">Produtos</h1>
              <h1 className=" text-lg px-4  ">Crie um produto</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="title">Título</label>
                    <Input {...register('title')} />
                </div>
                <div className="mb-4">
                    <label htmlFor="price">Preço</label>
                    <Input {...register('price')} />
                </div>
                <div className="mb-4">
                    <label htmlFor="description">Descrição</label>
                    <textarea rows="5" {...register('description')} />
                </div>
                <div className="mb-4">
                    <label htmlFor="category">Categoria</label>
                    <Input {...register('category')} />
                </div>
                <div className="mb-4">
                    <label htmlFor="image">Imagem</label>
                    <Input {...register('image')} />
                </div>
                <button type="submit" className="bg-blue-500 text-white font-semibold py-2 rounded px-4"></button>
            </form>
            
          </div>
          <Bottom className={`md:hidden`} />
        </Content>
      </div>
    </Container>
  );
};

export default CreateProducts;
