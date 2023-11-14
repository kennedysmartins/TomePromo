// pages/productGroups.js
import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Bottom } from "@/components/Bottom";
import { DrawerContext } from "@/contexts/DrawerContext";
import { getProductGroups, getProducts, createProductGroup } from "@/utils/api";
import "tailwindcss/tailwind.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Autocomplete, Avatar, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
};

const ProductGroups = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const [productGroups, setProductGroups] = useState([]);
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newGroupImagePath, setNewGroupImagePath] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleClick = async () => {
    setLoading(true);

    try {
      const newGroupData = {
        name: newGroupName,
        description: newGroupDescription,
        imagePath: newGroupImagePath,
      };

      const newProductIds = selectedProductIds

      // Chame a função para criar o grupo
      const createdGroup = await createProductGroup(newGroupData,newProductIds);

      // Faça algo com o grupo criado, se necessário
      console.log("Novo grupo criado:", createdGroup);

      // Limpe os estados após criar o grupo
      setNewGroupName("");
      setNewGroupDescription("");
      setNewGroupImagePath("");
      setSelectedProductIds([]);

      // Feche o modal
      handleClose();
      fetchProductGroups();
    } catch (error) {
      console.error("Erro ao criar o grupo", error);
    } finally {
      setLoading(false);
    }
  };

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
    // Função para buscar os grupos de produtos do backend
    const fetchProductGroups = async () => {
      // Substitua pela chamada real à API para buscar os grupos
      const dataProductGroups = await getProductGroups();
      setProductGroups(dataProductGroups);
    };

    fetchProductGroups();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const dataProducts = await getProducts();
      setProducts(dataProducts.reverse());
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
            <h1 className="text-4xl p-4">Grupos de Produtos</h1>
            <h2 className="text-lg px-4">
              Crie e gerencie os grupos de produtos
            </h2>
          </div>
          <div className="p-4">
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={handleOpen}
            >
              Criar grupo
            </Button>
            {/* Lista de Grupos de Produtos */}
            <ul className="flex flex-col mt-12 px-auto list-none">
          {productGroups.map((productGroup) => (
            <li key={productGroup.id} className="my-4 gap-3">
              <Link href={`/productGroups/${productGroup.id}`}>
                <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 3 }}>
                  <ListItem alignItems="flex-start" style={{ width: '100%', height: '100%' }}>
                    <ListItemAvatar>
                      <Avatar variant="rounded" src={productGroup.imagePath} alt={productGroup.name}/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={productGroup.name}
                      secondary={productGroup.description}
                    />
                  </ListItem>
                </List>
              </Link>
            </li>
          ))}
        </ul>
          </div>
        </Content>
      </div>
      <Bottom className={`md:hidden`} />
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <form action="#">
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Crie um novo grupo
                </Typography>
                <Typography id="transition-modal-description" sx={{ my: 2 }}>
                  Seleção de produtos
                </Typography>
                <div className="flex gap-3 w-full flex-col">
                  <TextField
                    required
                    id="outlined-basic"
                    label="Nome"
                    variant="outlined"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Descrição"
                    variant="outlined"
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="URL imagem"
                    variant="outlined"
                    value={newGroupImagePath}
                    onChange={(e) => setNewGroupImagePath(e.target.value)}
                  />
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={products}
                    getOptionLabel={(option) =>
                      `${option.id} - ${option.title}`
                    }
                    filterSelectedOptions
                    value={products.filter((product) =>
                      selectedProductIds.includes(product.id)
                    )}
                    onChange={(event, newValue) => {
                      setSelectedProductIds(
                        newValue.map((option) => option.id)
                      );

                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Produtos"
                        placeholder="Adicionar Produtos"
                      />
                    )}
                  />
                  <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    variant="outlined"
                    onClick={() => handleClick()}
                  >
                    Criar
                  </LoadingButton>
                </div>
              </Box>
            </form>
          </Fade>
        </Modal>
      </div>
    </Container>
  );
};

export default ProductGroups;
