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
import { searchProducts } from "@/utils/api";
import { RiAdminLine } from "react-icons/ri";


import "tailwindcss/tailwind.css";

const Products = () => {
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  useEffect(() => {
    const search = async () => {
      const results = await searchProducts(searchTerm);
      setSearchResults(results);
    };
    search();
  }, [searchTerm]);

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
              <h1 className=" text-lg px-4  ">Gerenciamento de ofertas</h1>
            </div>
            <div className="w-full flex justify-content p-4">
              <Input 
              Icon={RiAdminLine}
              type="text"
              placeholder="Pesquise por produtos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
              
            </div>
              <div className="flex justify-center">
                <ul>
                  {searchResults &&
                    searchResults.map((product) => (
                      <li key={product.id}>
                        <div className="border rounded p-4 shadow-md">
                          <img
                            src={product.image}
                            className="w-16 h-16 rounded bg-white p-1 object-contain"
                            alt={product.title}
                          />
                          <p className="mt-2">{product.title}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
          </div>
          <Bottom className={`md:hidden`} />
        </Content>
      </div>
    </Container>
  );
};

export default Products;
