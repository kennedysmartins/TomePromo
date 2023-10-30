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
import { createProduct, urlExtractor, messageSend } from "@/utils/api";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/Textarea";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

const CreateProducts = () => {
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const { register, handleSubmit, setValue } = useForm();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    priceoriginal: "",
    category: "",
    image: "",
    linkCompra: "",
    linkPesquisa: "",
    data: "",
    hora: "",
    text1: "",
    text2: "",
    condition: "",
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
      text7:
        "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador",
    }));
  }, []);

  if (!shouldRender) {
    return null;
  }
  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    toggleDrawer();
  };

  const formatPrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace("R$", "").trim());
    } else {
      return price; // caso já seja um número, retorne sem modificação
    }
  };

  const onSubmit = async (data) => {

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

    const newData = {
      ...data,
      title: data.title,
      text2: data.text2,
      text1: data.text1,
      price: formatPrice(data.price),
      priceoriginal: formatPrice(data.priceoriginal),
      description: data.description,
      image: data.image,
      condition: data.condition,
      category: data.category,
      text5: data.text5,
      text6: data.text6,
      text7: data.text7,
      data: formattedDate,
      hora: formattedTime,
      linkCompra: data.linkCompra,
    };
    const success = await createProduct(newData);

    if (success) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        id: success.id, // Assume que o retorno de sucesso contém o ID
      }));
        // handleCopyToClipboard(success.id);
        alert(`Produto criado com sucesso com o id ${success.id}`);
      setIsMessageSent(true);

    }
  };

  const handleInputChange = (e, name) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    setValue(name, value);
  };
  

  const resetFormFields = () => {
    setProduct({
      title: "",
      price: "",
      priceoriginal: "",
      category: "",
      image: "",
      linkCompra: product.linkPesquisa,
      linkPesquisa: product.linkPesquisa,
      data: "",
      hora: "",
      text1: "",
      text2: "",
      condition: "",
      text5: "https://amzn.to/477bFDg",
      text6: "⚠️ Essa oferta pode encerrar a qualquer momento",
      text7:
        "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador",
    });
  };

  const analiseLink = async (link) => {
    try {
        setIsAnalyzing(true);
        const response = await urlExtractor(link);
        console.log(response);
        if (response && response.data && response.data.metadata) {
            const { metadata } = response.data;
            console.log(metadata);
            const firstPart = metadata.title ? metadata.title.split(",")[0] : "";
            const categoryString = JSON.stringify(metadata.breadcrumbs);
            const descriptionWords = metadata.title
                ? metadata.title.split(' ').slice(0, 8).join(' ')
                : "";

            setProduct((prevProduct) => ({
                ...prevProduct,
                title: firstPart || prevProduct.title,
                text2: metadata.title || prevProduct.title,
                price: formatPrice(metadata.price) || prevProduct.price,
                priceoriginal: formatPrice(metadata["price-original"]) || prevProduct.priceoriginal,
                description: metadata.description || prevProduct.description,
                image: metadata.image || prevProduct.image,
                condition: metadata.condition || prevProduct.condition,
                category: categoryString || prevProduct.category,
                linkCompra: link,
                text5: "https://amzn.to/477bFDg",
                text6: "⚠️ Essa oferta pode encerrar a qualquer momento",
                text7: "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador",
            }));

            // Verifica se cada valor existe antes de definir
            setValue('title', firstPart || '');
            setValue('text2', metadata.title || '');
            setValue('price', formatPrice(metadata.price) || '');
            setValue('priceoriginal', formatPrice(metadata["price-original"]) || '');
            setValue('description', metadata.description || '');
            setValue('image', metadata.image || '');
            setValue('condition', metadata.condition || '');
            setValue('category', categoryString || '');
            setValue('linkCompra', link);
            setValue('text5', "https://amzn.to/477bFDg");
            setValue('text6', "⚠️ Essa oferta pode encerrar a qualquer momento");
            setValue('text7', "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador");
        }
    } catch (error) {
        console.error("Erro ao analisar o link:", error);
    } finally {
        setIsAnalyzing(false);
    }
};



  const handleFormReset = () => {
    resetFormFields();
  };

  const handleButtonClick = () => {
    setButtonDisabled(true);

    // Habilita o botão após 5 segundos
    setTimeout(() => {
      setButtonDisabled(false);
    }, 1000);
  };

  const handleSendMessage = async () => {
    const productId = product.id || id;

    let messageContent = product.text1
      ? `*${product.text1}*\n\n${product.text2}\n\n`
      : "";

    if (product.priceoriginal) {
      messageContent += `De ~R$ ${product.priceoriginal}~\nPor `;
    }

    messageContent += `*R$ ${product.price}* ${product.condition}\n\n*🛒 Compre aqui:* https://tomepromo.com.br/promo/${productId}\n\n${product.text6}`;

    const sendMessageSuccess = await messageSend(messageContent);
    if (sendMessageSuccess) {
      alert("Mensagem enviada com sucesso!");
    } else {
      alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
    }
  };

  const handleCopyToClipboard = (id) => {
    const productId = product.id || id;

    let messageContent = product.text1
      ? `*${product.text1}*\n\n${product.text2}\n\n`
      : "";

    if (product.priceoriginal) {
      messageContent += `De ~R$ ${product.priceoriginal}~\nPor `;
    }

    messageContent += `*R$ ${product.price}* ${product.condition}\n\n*🛒 Compre aqui:* https://tomepromo.com.br/promo/${productId}\n\n${product.text6}`;

    navigator.clipboard.writeText(messageContent).then(() => {
      alert("Copiado para a área de transferência");
    });
};


  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setProduct((prevProduct) => ({ ...prevProduct, linkPesquisa: text, linkCompra: text }));
      if (text) {
        analiseLink(text);
      }
    } catch (error) {
      console.error("Erro ao colar da área de transferência:", error);
    }
  };

  return (
    <Container bgActive={false}>
      <Header onMenuToggle={handleMenuToggle} />
      <div className="flex flex-col">
        <Sidebar
          className={`hidden md:flex flex-col`}
          isOpen={isDrawerOpen}
          onClose={handleMenuToggle}
        />
        <Content>
          <div className="flex flex-col">
            <div>
              <h1 className="text-4xl p-4 ">Produtos</h1>
              <h1 className=" text-lg px-4 ">Crie um produto</h1>
            </div>

            <div className="flex mt-8 ml-4 gap-2">
              <Input
                className="w-72"
                value={product.linkPesquisa || ""}
                placeholder="Link do produto"
                onChange={(e) => handleInputChange(e, "linkPesquisa")}
              />

{product.linkPesquisa ? (
  <Button
    onClick={() => analiseLink(product.linkPesquisa)}
    disabled={isAnalyzing}
  >
    {isAnalyzing ? 'Analisando' : 'Verificar link'}
  </Button>
) : (
  <Button onClick={handlePasteFromClipboard}>Colar Link</Button>
)}
{product.linkPesquisa && !isAnalyzing ? (
  <Button onClick={handleFormReset}>Limpar</Button>
) : null}
            </div>

            <div className="md:flex">
              <form
                className="mt-8 ml-4 w-96"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-4">
                  <label htmlFor="category">Mensagem chamativa</label>
                  <Input
                    {...register("text1")}
                    value={product.text1}
                    placeholder="🔝👌-47% de DESCONTO"
                    required
                    onChange={(e) => handleInputChange(e, "text1")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="title">Título</label>
                  <Input
                    {...register("title")}
                    placeholder="Headset Gamer Sem Fio Logitech G435 LIGHTSPEED"
                    required
                    value={product.title}
                    onChange={(e) => handleInputChange(e, "title")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price">Preço</label>
                  <Input
                    {...register("price")}
                    placeholder="168.3"
                    required
                    value={product.price}
                    onChange={(e) => handleInputChange(e, "price")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="priceoriginal">Preço Original</label>
                  <Input
                    {...register("priceoriginal")}
                    placeholder="200.1"
                    value={product.priceoriginal}
                    onChange={(e) => handleInputChange(e, "priceoriginal")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="text2">Descrição</label>
                  <Textarea
                    required
                    rows="5"
                    {...register("text2")}
                    placeholder="Headset Gamer Sem Fio Logitech G435 LIGHTSPEED, Conexão USB e Bluetooth, Design Leve e Confortável, Microfone Embutido, Bateria de até 18h - Compatível com Dolby Atmos, PC, PS4, PS5, Mobile – Branco"
                    value={product.text2}
                    onChange={(e) => handleInputChange(e, "text2")}
                  ></Textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="category">Condições</label>
                  <Input
                    {...register("condition")}
                    value={product.condition}
                    placeholder="em 1x até 7x sem juros"
                    onChange={(e) => handleInputChange(e, "condition")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="linkCompra">Link de compra</label>
                  <Input
                    {...register("linkCompra")}
                    value={product.linkCompra}
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
                    value={product.text5}
                    onChange={(e) => handleInputChange(e, "text5")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Alerta</label>
                  <Input
                    {...register("text6")}
                    value={product.text6}
                    placeholder="⚠️ Essa oferta pode encerrar a qualquer momento"
                    onChange={(e) => handleInputChange(e, "text6")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Alerta 2</label>
                  <Input
                    {...register("text7")}
                    value={product.text7}
                    placeholder="⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador"
                    onChange={(e) => handleInputChange(e, "text7")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Categoria</label>
                  <Input
                    {...register("category")}
                    placeholder="eletrônico"
                    value={product.category}
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
                    value={product.image}
                    onChange={(e) => handleInputChange(e, "image")}
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 rounded px-8"
                    onClick={handleButtonClick}
                    disabled={isButtonDisabled}
                  >
                    Postar
                  </button>
                  {isMessageSent ? (
                    <Button
                      type="button"
                      onClick={() => {
                        handleCopyToClipboard();
                        handleButtonClick();
                      }}
                      disabled={isButtonDisabled}
                    >
                      Copiar Mensagem
                    </Button>
                  ) : null}
                  {isMessageSent ? (
                    <Button
                      type="button"
                      type="button"
          onClick={() => {
            handleSendMessage();
            handleButtonClick();
          }}
                      disabled={isButtonDisabled}
                    >
                      Enviar WhatsApp
                    </Button>
                  ) : null}
                </div>
              </form>

              <Card
                image={product.image}
                title={product.title}
                price={product.price}
                priceoriginal={product.priceoriginal}
                linkCompra={product.linkCompra}
                data={product.data}
                hora={product.hora}
                text1={product.text1}
                text2={product.text2}
                condition={product.condition}
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
