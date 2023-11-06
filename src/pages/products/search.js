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
import { searchProducts, getProducts, deleteProductById } from "@/utils/api";
import { RiAdminLine } from "react-icons/ri";
import Link from "next/link";

import "tailwindcss/tailwind.css";
import { Box } from "@/components/Box";

const Search = () => {
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
      let results;
      if (searchTerm === "") {
        // Se o searchTerm estiver vazio, defina os resultados como todos os produtos
        results = await getProducts();
      } else {
        results = await searchProducts(searchTerm);
      }
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

  const handleDeleteProduct = async (id) => {
    const userConfirmation = confirm("Tem certeza que deseja apagar o produto?");
    if (userConfirmation) {
      try {
        await deleteProductById(id);
        alert("Produto apagado com sucesso!");
        const updatedResults = await getProducts(); 
        setSearchResults(updatedResults); 
      } catch (error) {
        alert("Erro ao apagar o produto: " + error.message);
      }
    }
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
            
            <div>
              <h1 className="mt-2 text-4xl p-4  ">Produtos</h1>
              <h2 className=" text-lg px-4  ">Gerenciamento de ofertas</h2>
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
                  searchResults.reverse().map((product) => (
                    <li key={product.id}>
                      <Box className="border rounded p-4 shadow-md">
                        <div className="flex gap-3">
                          <img
                            src={product.imagePath}
                            className="w-24 h-24 rounded bg-white p-1 object-contain"
                            alt={product.title}
                          />
                          <div className="w-full">
                            <span className="block">
                              <strong>Id: </strong>
                              {product.id}
                            </span>
                            <span className="block">
                              <strong>Title: </strong>
                              {product.title}
                            </span>
                            <span className="block">
                              <strong>Price: </strong>
                              {product.currentPrice}
                            </span>
                            <span className="block">
                              <strong>CreatedAt: </strong>
                              {new Date(product.createdAt).toLocaleString()}
                            </span>
                            <span className="block">
                              <strong>Clicks: </strong>
                              {product.clicks}
                            </span>
                            <span className="block">
                              <strong>Published: </strong>
                              {product.published ? "true" : "false"}
                            </span>
                            <div className="flex gap-2 mt-2">
                              <div className="bg-red-500 rounded p-2 cursor-pointer"
                              onClick={() => {
                                handleDeleteProduct(product.id);
                              }}  >
                                Apagar
                              </div>
                              <div className="bg-blue-500 rounded p-2">
                                Editar
                              </div>
                              <div className="bg-green-500 rounded p-2">
                                Repostar
                              </div>
                            </div>
                          </div>
                        </div>
                      </Box>
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

export default Search;
