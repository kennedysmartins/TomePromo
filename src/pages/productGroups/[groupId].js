import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Bottom } from "@/components/Bottom";
import { DrawerContext } from "@/contexts/DrawerContext";
import { getProductsByGroup } from "@/utils/api";
import "tailwindcss/tailwind.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductGroupDetails = () => {
  const router = useRouter();
  const { groupId } = router.query;
  const { data: session, status } = useSession();
  const [shouldRender, setShouldRender] = useState(false);
  const [Products, setProducts] = useState([]);
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    const fetchProducts = async () => {
      const dataProducts = await getProductsByGroup(groupId);
      setProducts(dataProducts);
    };

    fetchProducts();
  }, []);

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
        <Content>
          <div>
            <h1 className="text-4xl p-4">Detalhes do Grupo {groupId}</h1>
            <h2 className="text-lg px-4">
              Crie e gerencie os grupos de produtos
            </h2>
          </div>
          <div className="p-4">
            <div>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineOutlinedIcon />}
              >
                Adicionar Produtos
              </Button>
            </div>

            <ul>
              {Products.map((product) => (
                <li key={product.id} className="my-4 gap-3">

                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => alert("Em Breve")}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar src={product.imagePath}/>
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.title}
                        secondary={`R$ ${product.currentPrice}`}
                      />
                    </ListItem>
                  </List>
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

export default ProductGroupDetails;
