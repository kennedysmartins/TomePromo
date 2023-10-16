import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box } from "@/components/Box";
import { Bottom } from "@/components/Bottom";
import { DrawerContext } from "@/contexts/DrawerContext";
import "tailwindcss/tailwind.css";

const Config = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const { theme, toggleTheme } = useContext(ThemeContext);

  if (!shouldRender) {
    return null;
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
          <div className="flex flex-col">
            <br></br>
            <div>
              <h1 className="mt-2 text-4xl p-4  ">Configurações</h1>
              <h1 className="text-lg px-4  ">Gerencie o App</h1>
            </div>
            <div>
              <Box>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={toggleTheme}
                    defaultChecked={theme === "dark"}
                  />

                  <div
                    className={`w-11 h-6 ${
                      theme === "dark"
                        ? "bg-gray-700 peer-checked:bg-blue-600"
                        : "bg-gray-200 peer-checked:white"
                    } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}
                  ></div>

                  <span className="ml-3 text-sm font-medium">
                    {theme === "dark" ? "Tema Escuro" : "Tema Claro"}
                  </span>
                </label>
              </Box>
              <Box>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={toggleDrawer}
                    defaultChecked={drawer === "open"}
                  />

                  <div
                    className={`w-11 h-6 ${
                      drawer === "closed"
                        ? "bg-gray-700 peer-checked:bg-blue-600"
                        : "bg-gray-200 peer-checked:white"
                    } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}
                  ></div>

                  <span className="ml-3 text-sm font-medium">
                    {drawer === "closed" ? "Drawer Fechado" : "Drawer Aberto"}
                  </span>
                </label>
              </Box>
            </div>
          </div>

          <Bottom className={`md:hidden`} />
        </Content>
      </div>
    </Container>
  );
};

export default Config;
