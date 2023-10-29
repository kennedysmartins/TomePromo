import "tailwindcss/tailwind.css";
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
import { createProduct, urlExtractor } from "@/utils/api";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/Textarea";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";


const CreateProducts = () => {
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const { register, handleSubmit, setValue } = useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    linkCompra: "",
    data: "",
    hora: "",
    text1: "",
    text2: "",
    text3: "",
    text5: "",
    text6: "",
    text7: "",
  });

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
    setProduct((prevProduct) => ({
      ...prevProduct,
      text5: "https://amzn.to/477bFDg", 
      text6: "⚠️ Essa oferta pode encerrar a qualquer momento", 
      text7: "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador", 
    }));
  }, []);

  if (!shouldRender) {
    return null;
  }
  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    toggleDrawer();
  };

  const onSubmit = async (data) => {
    const success = await createProduct(data);

    if (success) {
      alert("Produto criado");
      router.push(`/products`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));

    setValue(name, value);
  };

  const analiseLink = async (link) => {
    try {
      const success = await urlExtractor(link);
      if (success) {
        const extractedData = await fetch('https://api-tomepromo.onrender.com/services/extractor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ link })
        });

        const data = await extractedData.json();
        console.log(data)

        setProduct((prevProduct) => ({
          ...prevProduct,
          title: data.title,
          price: data.price,
          image: data.image,
          linkCompra: link,// ... other fields you want to update
        }));
      } else {
        // handle failure
      }
    } catch (error) {
      console.error('Erro ao analisar o link:', error);
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
              <h1 className="text-4xl p-4 ">Produtos</h1>
              <h1 className=" text-lg px-4 ">Crie um produto</h1>
            </div>

            <div className="flex mt-8 ml-4 gap-2">
              <Input className="w-72" onChange={(e) => setProduct({ ...product, linkCompra: e.target.value })} placeholder="Link do produto"/>
              <Button onClick={() => analiseLink(product.linkCompra)}>Verificar link</Button>
            </div>

            <div className="flex">
              <form
                className="mt-8 ml-4 w-96"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-4">
                  <label htmlFor="title">Título</label>
                  <Input
                    {...register("title")}
                    placeholder="Headset Gamer Sem Fio Logitech G435 LIGHTSPEED"
                    required
                    onChange={(e) => handleInputChange(e, "title")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price">Preço</label>
                  <Input
                    {...register("price")}
                    placeholder="168.3"
                    required
                    onChange={(e) => handleInputChange(e, "price")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="text2">Descrição</label>
                  <Textarea
                    required
                    rows="5"
                    {...register("text2")}
                    placeholder="Headset Gamer Sem Fio Logitech G435 LIGHTSPEED, Conexão USB e Bluetooth, Design Leve e Confortável, Microfone Embutido, Bateria de até 18h - Compatível com Dolby Atmos, PC, PS4, PS5, Mobile – Branco"
                    onChange={(e) => handleInputChange(e, "text2")}
                  ></Textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Mensagem chamativa</label>
                  <Input
                    {...register("text1")}
                    placeholder="🔝👌-47% de DESCONTO"
                    required
                    onChange={(e) => handleInputChange(e, "text1")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Condições</label>
                  <Input
                    {...register("text3")}
                    placeholder="em 1x até 7x sem juros"
                    required
                    onChange={(e) => handleInputChange(e, "text3")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="linkCompra">Link de compra</label>
                  <Input
                    {...register("linkCompra")}
                    placeholder="https://amzn.to/3tP7mxY"
                    required
                    onChange={(e) => handleInputChange(e, "linkCompra")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Seja Amazon Prime</label>
                  <Input
                    {...register("text5")}
                    placeholder="https://amzn.to/477bFDg"
                    onChange={(e) => handleInputChange(e, "text5")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Alerta</label>
                  <Input
                    {...register("text6")}
                    placeholder="⚠️ Essa oferta pode encerrar a qualquer momento"
                    onChange={(e) => handleInputChange(e, "text6")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Alerta 2</label>
                  <Input
                    {...register("text7")}
                    placeholder="⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador"
                    onChange={(e) => handleInputChange(e, "text7")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Categoria</label>
                  <Input
                    {...register("category")}
                    placeholder="eletrônico"
                    required
                    onChange={(e) => handleInputChange(e, "category")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="image">Imagem</label>
                  <Input
                    {...register("image")}
                    placeholder="https://m.media-amazon.com/images/I/81WfRjLX93L._AC_SX679_.jpg"
                    required
                    onChange={(e) => handleInputChange(e, "image")}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold py-2 rounded px-8"
                >
                  Postar
                </button>
              </form>
              <Card
                image={product.image}
                title={product.title}
                price={product.price}
                linkCompra={product.linkCompra}
                data={product.data}
                hora={product.hora}
                text1={product.text1}
                text2={product.text2}
                text3={product.text3}
                text5={product.text5}
                text6={product.text6}
                text7={product.text7}
              />
            </div>
          </div>
          <Bottom className={`md:hidden`} />
        </Content>
      </div>
    </Container>
  );
};

export default CreateProducts;
