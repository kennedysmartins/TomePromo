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
import {
  createProduct,
  urlExtractor,
  messageSend,
  messageSendTest,
} from "@/utils/api";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/Textarea";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { BsWhatsapp, BsFillClipboard2Fill, BsLink45Deg } from "react-icons/bs";
import {
  MdPublishedWithChanges,
  MdOutlineContentPasteSearch,
  MdDeleteOutline,
} from "react-icons/md";
import { Box, TextField } from "@mui/material";

const CreateProducts2 = () => {
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const { register, handleSubmit, setValue } = useForm();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  const [product, setProduct] = useState({
    id: "",
    title: "",
    currentPrice: "",
    originalPrice: "",
    category: "",
    imagePath: "",
    buyLink: "",
    linkPesquisa: "",
    data: "",
    hora: "",
    catchyText: "",
    productName: "",
    conditionPayment: "",
    sponsorLink: "",
    announcement1: "",
    announcement2: "",
    website: "",
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
      sponsorLink: "https://amzn.to/3FXpmcn",
      announcement1: "⚠️ Essa oferta pode encerrar a qualquer momento",
      announcement2:
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

  function isFloat(value) {
    const floatValue = parseFloat(value);
    return (
      !isNaN(floatValue) &&
      Number.isFinite(floatValue) &&
      Number.isInteger(floatValue) === false
    );
  }

  const formatPrice = (currentPrice) => {
    if (currentPrice) {
      let priceWithoutSymbol = currentPrice.replace(/^R\$\s?/, "");

      if (
        priceWithoutSymbol.includes(",") &&
        priceWithoutSymbol.includes(".")
      ) {
        priceWithoutSymbol = priceWithoutSymbol.replace(/\./g, "");
        priceWithoutSymbol = priceWithoutSymbol.replace(/\,/g, ".");
      } else {
        priceWithoutSymbol = priceWithoutSymbol.replace(/\,/g, ".");
      }
      parseFloat(priceWithoutSymbol);

      return priceWithoutSymbol;
    }
    return currentPrice;
  };

  const onSubmit = async (data) => {
    console.log("Preço ao submit", data.currentPrice);
    console.log("Preço da variável produto", product.currentPrice);

    const newData = {
      title: data.title.trim(),
      productName: data.productName.trim(),
      catchyText: data.catchyText.trim(),
      currentPrice: parseFloat(formatPrice(data.currentPrice)),
      originalPrice: parseFloat(formatPrice(data.originalPrice)) || 0,
      recurrencePrice: parseFloat(formatPrice(data.recurrencePrice)) || 0,
      imagePath: data.imagePath.trim(),
      conditionPayment: data.conditionPayment.trim(),
      category: data.category.trim(),
      sponsorLink: data.sponsorLink.trim(),
      announcement1: data.announcement1.trim(),
      announcement2: data.announcement2.trim(),
      buyLink: data.buyLink.trim(),
      website: data.website.trim(),
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
      id: "",
      title: "",
      currentPrice: "",
      originalPrice: "",
      recurrencePrice: "",
      category: "",
      imagePath: "",
      website: "",
      buyLink: "",
      linkPesquisa: "",
      catchyText: "",
      productName: "",
      conditionPayment: "",
      sponsorLink: "https://amzn.to/3FXpmcn",
      announcement1: "⚠️ Essa oferta pode encerrar a qualquer momento",
      announcement2:
        "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador",
    });
  };

  const resetFormFieldsSearch = (link) => {
    setProduct({
      id: "",
      title: "",
      currentPrice: "",
      originalPrice: "",
      recurrencePrice: "",
      category: "",
      linkPesquisa: link,
      buyLink: link,
      imagePath: "",
      website: "",
      catchyText: product.catchyText,
      productName: "",
      conditionPayment: "",
      sponsorLink: "https://amzn.to/3FXpmcn",
      announcement1: "⚠️ Essa oferta pode encerrar a qualquer momento",
      announcement2:
        "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador",
    });
  };

  const analiseLink = async (link) => {
    try {
      setIsAnalyzing(true);
      handleFormReset("Search", link);
      const response = await urlExtractor(link);
      console.log(response);
      if (response && response.data && response.data.metadata) {
        const { metadata } = response.data;
        console.log(metadata);
        const firstPart = metadata.title ? metadata.title.split(",")[0] : "";
        const categoryString = JSON.stringify(metadata.breadcrumbs);

        setProduct((prevProduct) => ({
          ...prevProduct,
          title: firstPart || prevProduct.title,
          productName: metadata.title || prevProduct.title,
          currentPrice:
            formatPrice(metadata.currentPrice) || prevProduct.currentPrice,
          recurrencePrice:
            formatPrice(metadata.recurrencePrice) ||
            prevProduct.recurrencePrice,
          originalPrice:
            formatPrice(metadata.originalPrice) || prevProduct.originalPrice,
          imagePath: metadata.imagePath || prevProduct.imagePath,
          conditionPayment:
            metadata.conditionPayment || prevProduct.conditionPayment,
          category: categoryString || prevProduct.category,
          buyLink: metadata.buyLink || link,
          website: metadata.website|| prevProduct.website,
          sponsorLink: "https://amzn.to/3FXpmcn",
          announcement1: "⚠️ Essa oferta pode encerrar a qualquer momento",
          announcement2:
            "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador",
        }));

        // Verifica se cada valor existe antes de definir
        setValue("title", firstPart || "");
        setValue("productName", metadata.title || "");
        setValue("currentPrice", formatPrice(metadata.currentPrice) || "");
        setValue("originalPrice", formatPrice(metadata.originalPrice) || "");
        setValue(
          "recurrencePrice",
          formatPrice(metadata.recurrencePrice) || ""
        );
        setValue("imagePath", metadata.imagePath || "");
        setValue("conditionPayment", metadata.conditionPayment || "");
        setValue("category", categoryString || "");
        setValue("buyLink", metadata.buyLink || link);
        setValue("sponsorLink", "https://amzn.to/3FXpmcn");
        setValue(
          "announcement1",
          "⚠️ Essa oferta pode encerrar a qualquer momento"
        );
        setValue(
          "announcement2",
          "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador"
        );
      }
    } catch (error) {
      console.error("Erro ao analisar o link:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFormReset = (type, link) => {
    if (type === "Search") {
      resetFormFieldsSearch(link);
    } else {
      resetFormFields();
    }
  };

  const handleButtonClick = () => {
    setButtonDisabled(true);

    // Habilita o botão após 5 segundos
    setTimeout(() => {
      setButtonDisabled(false);
    }, 1000);
  };

  function formatCurrency(amount) {
    const options = { minimumFractionDigits: 2 };
    const formattedAmount = new Intl.NumberFormat("pt-BR", options).format(
      amount
    );

    return formattedAmount;
  }

  const handleSendMessageTest = async () => {
    const productId = product.id || id;

    let messageContent = product.catchyText
      ? `*${product.catchyText.trim()}*\n\n${product.productName.trim()}\n\n`
      : "";

    if (product.originalPrice) {
      messageContent += `De ~R$ ${formatCurrency(
        product.originalPrice
      )}~\nPor `;
    }

    messageContent += `*R$ ${formatCurrency(
      product.currentPrice
    )}* ${product.conditionPayment.trim()}\n\n*🛒 Compre aqui:* https://tomepromo.com.br/p/${productId}\n\n${product.announcement1.trim()}`;

    const sendMessageSuccess = await messageSendTest(messageContent);
    if (sendMessageSuccess) {
      alert("Mensagem enviada com sucesso!");
    } else {
      alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
    }
  };

  const handleSendMessage = async () => {
    const productId = product.id || id;

    let messageContent = product.catchyText
      ? `*${product.catchyText.trim()}*\n\n${product.productName.trim()}\n\n`
      : "";

    if (product.originalPrice) {
      messageContent += `De ~R$ ${formatCurrency(
        product.originalPrice
      )}~\nPor `;
    }

    messageContent += `*R$ ${formatCurrency(
      product.currentPrice
    )}* ${product.conditionPayment.trim()}\n\n*🛒 Compre aqui:* https://tomepromo.com.br/p/${productId}\n\n${product.announcement1.trim()}`;

    const sendMessageSuccess = await messageSend(messageContent);
    if (sendMessageSuccess) {
      alert("Mensagem enviada com sucesso!");
    } else {
      alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
    }
  };

  const handleCopyToClipboard = (id) => {
    const productId = product.id || id;

    let messageContent = product.catchyText
      ? `*${product.catchyText.trim()}*\n\n${product.productName.trim()}\n\n`
      : "";

    if (product.originalPrice) {
      messageContent += `De ~R$ ${formatCurrency(
        product.originalPrice
      )}~\nPor `;
    }

    messageContent += `*R$ ${formatCurrency(
      product.currentPrice
    )}* ${product.conditionPayment.trim()}\n\n*🛒 Compre aqui:* https://tomepromo.com.br/p/${productId}\n\n${product.announcement1.trim()}`;

    navigator.clipboard.writeText(messageContent).then(() => {
      alert("Copiado para a área de transferência");
    });
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setProduct((prevProduct) => ({
        ...prevProduct,
        linkPesquisa: text,
        buyLink: text,
      }));
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
                className="w-64"
                value={product.linkPesquisa || ""}
                placeholder="Link do produto"
                onChange={(e) => handleInputChange(e, "linkPesquisa")}
              />

              {product.linkPesquisa ? (
                <Button
                  onClick={() => analiseLink(product.linkPesquisa)}
                  icon={MdOutlineContentPasteSearch}
                  disabled={isAnalyzing}
                  className="w-40"
                >
                  {isAnalyzing ? "Analisando" : "Verificar link"}
                </Button>
              ) : (
                <Button
                  onClick={handlePasteFromClipboard}
                  icon={BsFillClipboard2Fill}
                  className="w-40"
                >
                  Colar Link
                </Button>
              )}
              {product.linkPesquisa && !isAnalyzing ? (
                <Button
                  onClick={handleFormReset}
                  icon={MdDeleteOutline}
                  className="w-40"
                >
                  Limpar
                </Button>
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
                    {...register("catchyText")}
                    value={product.catchyText}
                    placeholder="🔝👌-47% de DESCONTO"
                    required
                    onChange={(e) => handleInputChange(e, "catchyText")}
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
                  <label htmlFor="currentPrice">Preço</label>
                  <Input
                    {...register("currentPrice")}
                    placeholder="1999.99"
                    required
                    value={product.currentPrice}
                    onChange={(e) => handleInputChange(e, "currentPrice")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="originalPrice">Preço Original</label>
                  <Input
                    {...register("originalPrice")}
                    placeholder="2200.99"
                    value={product.originalPrice}
                    onChange={(e) => handleInputChange(e, "originalPrice")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="productName">Descrição</label>
                  <Textarea
                    required
                    rows="5"
                    {...register("productName")}
                    placeholder="Headset Gamer Sem Fio Logitech G435 LIGHTSPEED, Conexão USB e Bluetooth, Design Leve e Confortável, Microfone Embutido, Bateria de até 18h - Compatível com Dolby Atmos, PC, PS4, PS5, Mobile – Branco"
                    value={product.productName}
                    onChange={(e) => handleInputChange(e, "productName")}
                  ></Textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="category">Condições</label>
                  <Input
                    {...register("conditionPayment")}
                    value={product.conditionPayment}
                    placeholder="em 1x até 7x sem juros"
                    onChange={(e) => handleInputChange(e, "conditionPayment")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="buyLink">Link de compra</label>
                  <div className="flex">
                    <Input
                      {...register("buyLink")}
                      value={product.buyLink}
                      placeholder="https://amzn.to/3tP7mxY"
                      required
                      onChange={(e) => handleInputChange(e, "buyLink")}
                    />
                    {product.buyLink != product.linkPesquisa && (
                      <div className="flex justify-content items-center p-2 bg-green-500 rounded-full m-2 text-black">
                        <BsLink45Deg />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Seja Amazon Prime</label>
                  <Input
                    {...register("sponsorLink")}
                    placeholder="https://amzn.to/3FXpmcn"
                    value={product.sponsorLink}
                    onChange={(e) => handleInputChange(e, "sponsorLink")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Alerta</label>
                  <Input
                    {...register("announcement1")}
                    value={product.announcement1}
                    placeholder="⚠️ Essa oferta pode encerrar a qualquer momento"
                    onChange={(e) => handleInputChange(e, "announcement1")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Alerta 2</label>
                  <Input
                    {...register("announcement2")}
                    value={product.announcement2}
                    placeholder="⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador"
                    onChange={(e) => handleInputChange(e, "announcement2")}
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
                  <label htmlFor="imagePath">Imagem</label>
                  <Input
                    {...register("imagePath")}
                    placeholder="https://m.media-amazon.com/images/I/81WfRjLX93L._AC_SX679_.jpg"
                    required
                    value={product.imagePath}
                    onChange={(e) => handleInputChange(e, "imagePath")}
                  />
                </div>
                <div
                  className="mb-4"
                >
                  <TextField
                  fullWidth 
                    id="outlined-basic"
                    label="Site"
                    {...register("website")}

                    placeholder="Amazon"
                    value={product.website}
                    variant="outlined"
                    onChange={(e) => handleInputChange(e, "website")}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    icon={MdPublishedWithChanges}
                    className="bg-blue-500 text-white font-semibold py-2 rounded px-8"
                  >
                    Postar
                  </Button>
                  <div className="flex gap-4 w-full">
                    {product.id ? (
                      <Button
                        icon={BsFillClipboard2Fill}
                        type="button"
                        onClick={handleCopyToClipboard}
                      >
                        Copiar
                      </Button>
                    ) : null}
                    {product.id ? (
                      <Button
                        type="button"
                        icon={BsWhatsapp}
                        onClick={async () => {
                          setIsSending(true);
                          await handleSendMessage();
                          setIsSending(false);
                        }}
                        disabled={isSending || !product.id}
                      >
                        {isSending ? "Enviando" : "Enviar Grupo"}
                      </Button>
                    ) : null}
                    {product.id ? (
                      <Button
                        type="button"
                        icon={BsWhatsapp}
                        onClick={async () => {
                          setIsSending(true);
                          await handleSendMessageTest();
                          setIsSending(false);
                        }}
                        disabled={isSending || !product.id}
                      >
                        {isSending ? "Enviando" : "Grupo Teste"}
                      </Button>
                    ) : null}
                  </div>
                </div>
              </form>

              <Card
                imagePath={product.imagePath}
                title={product.title}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                recurrencePrice={product.recurrencePrice}
                buyLink={product.buyLink}
                data={product.data}
                hora={product.hora}
                catchyText={product.catchyText}
                productName={product.productName}
                conditionPayment={product.conditionPayment}
                sponsorLink={product.sponsorLink}
                announcement1={product.announcement1}
                announcement2={product.announcement2}
                website={product.website}
              />
            </div>
          </div>
          <Bottom className={`md:hidden`} />
        </Content>
      </div>
    </Container>
  );
};

export default CreateProducts2;
