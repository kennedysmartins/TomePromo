import "tailwindcss/tailwind.css";
import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "@/components/Container";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Bottom } from "@/components/Bottom";
import { DrawerContext } from "@/contexts/DrawerContext";
import {
  createProduct,
  urlExtractor,
  messageSend,
  messageSendTest,
} from "@/utils/api";
import { useForm } from "react-hook-form";
import { Card } from "@/components/Card";

import {
  Button,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import LinkIcon from "@mui/icons-material/Link";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { AutoAwesome } from "@mui/icons-material";
import Link from "next/link";
import { Container2 } from "@/components/Container2";

const CreateProducts = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session, status } = useSession();
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const [product, setProduct] = useState({
    id: "",
    title: "",
    currentPrice: "",
    originalPrice: "",
    recurrencePrice: "",
    category: "",
    imagePath: "",
    buyLink: "",
    productCode: "",
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
    cupom: "",
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

  if (!shouldRender) {
    return null;
  }
  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    toggleDrawer();
  };

  const analiseLink = async (link) => {
    setIsAnalyzing(true);
    handleFormReset("Search", link);
    try {
      const response = await urlExtractor(link);
      if (response && response.data && response.data.metadata) {
        const { metadata } = response.data;
        console.log("Extractor", metadata);
        const categoryString = JSON.stringify(metadata.breadcrumbs);

        // Extrair as informações desejadas do objeto metadata
        const {
          title,
          currentPrice,
          originalPrice,
          recurrencePrice,
          category,
          imagePath,
          buyLink,
          productCode,
          data,
          hora,
          cupom,
          catchyText,
          productName,
          conditionPayment,
          sponsorLink,
          announcement1,
          announcement2,
          website,
        } = metadata;

        // Atualizar o estado do componente com as informações extraídas
        setProduct((prevProduct) => ({
          ...prevProduct,
          title: title ?? prevProduct.title,
          currentPrice: formatPrice(currentPrice) ?? prevProduct.currentPrice,
          originalPrice:
            formatPrice(originalPrice) ?? prevProduct.originalPrice,
          recurrencePrice:
            formatPrice(recurrencePrice) ?? prevProduct.recurrencePrice,
          category: categoryString ?? prevProduct.category,
          imagePath: imagePath ?? prevProduct.imagePath,
          buyLink: buyLink ?? prevProduct.buyLink,
          productCode: productCode ?? prevProduct.productCode,
          linkPesquisa: link,
          data: data ?? prevProduct.data,
          hora: hora ?? prevProduct.hora,
          cupom: cupom ?? prevProduct.cupom,
          catchyText: catchyText ?? prevProduct.catchyText,
          productName: title ?? prevProduct.title,
          conditionPayment:
            conditionPayment.charAt(0).toLowerCase() +
              conditionPayment.slice(1) ?? prevProduct.conditionPayment,
          sponsorLink: sponsorLink ?? prevProduct.sponsorLink,
          announcement1: announcement1 ?? prevProduct.announcement1,
          announcement2: announcement2 ?? prevProduct.announcement2,
          website: website ?? prevProduct.website,
        }));
      }
    } catch (error) {
      console.error("Erro ao analisar o link:", error);
    } finally {
      // Lógica a ser executada independentemente do sucesso ou falha
      setIsAnalyzing(false);
    }
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
      cupom: "",
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

  const handleFormReset = (type, link) => {
    setIsCopying(false);
    setIsSending(false);
    setIsSendingTest(false);
    setIsCreating(false);
    if (type === "Search") {
      resetFormFieldsSearch(link);
    } else {
      resetFormFields();
    }
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
      cupom: "",
      catchyText: product.catchyText,
      productName: "",
      conditionPayment: "",
      sponsorLink: "https://amzn.to/3FXpmcn",
      announcement1: "⚠️ Essa oferta pode encerrar a qualquer momento",
      announcement2:
        "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador",
    });
  };

  const messageTemplate = () => {
    const productId = product.id || id;

    let messageContent = product.catchyText
      && `*${product.catchyText.trim()}*\n\n `
      : "";

      if(product.productName) {
        messageContent += `${product.productName.trim()}\n\n`
      }

    if (product.originalPrice) {
      messageContent += `De ~R$ ${formatCurrency(
        product.originalPrice
      )}~\nPor `;
    }

    messageContent += `*R$ ${formatCurrency(product.currentPrice)}* _${
      product.conditionPayment.trim().charAt(0).toLowerCase() +
      product.conditionPayment.slice(1)
    }_`;

    if (product.recurrencePrice) {
      messageContent += `\nAté *R$ ${formatCurrency(
        product.recurrencePrice
      )}* com recorrência`;
    }

    messageContent += `\n\n*🛒 Compre aqui:* https://tomepromo.com.br/p/${productId}`;

    if (product.cupom) {
      messageContent += "\n\n";
      messageContent += `🔖 *Use o cupom:* ${product.cupom.trim()}`;
    }

    messageContent += `\n\n${product.announcement1.trim()}\n\n🌐 ${
      product.website
    }`;

    return messageContent;
  };

  const handleCopyToClipboard = (id) => {
    setIsCopying(false);
    setTimeout(() => {
      setIsCopying(true);
    }, "600");
    const messageContent = messageTemplate();
    navigator.clipboard.writeText(messageContent);
  };

  const handleSendMessageTest = async () => {
    setIsSendingTest(true);
    const messageContent = messageTemplate();
    console.log(messageContent);
    const sendMessageSuccess = await messageSendTest(messageContent);
    if (sendMessageSuccess) {
      alert("Mensagem enviada com sucesso!");
    } else {
      alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
    }
    setIsSendingTest(false);
  };

  const handleSendMessage = async () => {
    setIsSending(true);
    const messageContent = messageTemplate();
    const sendMessageSuccess = await messageSend(messageContent);
    if (sendMessageSuccess) {
      alert("Mensagem enviada com sucesso!");
    } else {
      alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
    }
    setIsSending(false);
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

  const handleInputChange = (e, name) => {
    const { value } = e.target;
    // setValue((prevProduct) => ({
    //   ...prevProduct,
    //   [name]: value,
    // }));
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const addEmojiToCatchyText = (emoji) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      catchyText: prevProduct.catchyText + emoji,
    }));
  };

  const addTextToCatchyText = () => {
    const catchyTextOptions = [
      "Acaba rápido ⚡⚡",
      "Menor preço nos últimos 30 dias 🔥",
      "Menor preço já visto 😱🚨",
      "OFERTA RELÂMPAGO ⚡",
      "MUITO BARATO 🔥💪",
      "PRECINHO TOP 💋",
      "CORREEE 🏃‍♂️🏃‍♂️",
      "VAI ACABAR 🏃‍♂️🏃‍♂️🚨",
    ];

    const randomIndex = Math.floor(Math.random() * catchyTextOptions.length);
    const randomText = catchyTextOptions[randomIndex];

    setProduct((prevProduct) => ({
      ...prevProduct,
      catchyText: randomText,
    }));
  };

  function formatCurrency(amount) {
    const options = { minimumFractionDigits: 2 };
    const formattedAmount = new Intl.NumberFormat("pt-BR", options).format(
      amount
    );

    return formattedAmount;
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

  const onSubmit = async () => {
    setIsCreating(true);

    const data = product;
    console.log(data);
    const newData = {
      title: data.title.trim(),
      productName: data.productName.trim(),
      catchyText: data.catchyText.trim(),
      currentPrice: parseFloat(formatPrice(data.currentPrice)),
      originalPrice: parseFloat(formatPrice(data.originalPrice)) || 0,
      recurrencePrice: parseFloat(formatPrice(data.recurrencePrice)) || 0,
      imagePath: data.imagePath.trim(),
      conditionPayment:
        data.conditionPayment.trim().charAt(0).toLowerCase() +
        data.conditionPayment.slice(1),
      category: data.category.trim(),
      sponsorLink: data.sponsorLink.trim(),
      announcement1: data.announcement1.trim(),
      announcement2: data.announcement2.trim(),
      buyLink: data.buyLink.trim(),
      website: data.website.trim(),
      cupom: data.cupom.trim(),
      productCode: data.productCode,
    };

    console.log("newData", newData);
    const success = await createProduct(newData);

    if (success) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        id: success.id, // Assume que o retorno de sucesso contém o ID
      }));
      setIsCreating(false);
    }
  };

  return (
    <Container2 bgActive={false}>
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
              <h1 className="text-4xl py-4 ">Produtos</h1>
              <Link href="/products/create2">
                <h1 className=" text-lg">Crie um produto</h1>
              </Link>
            </div>

            <div className="flex my-8 gap-4 md:w-[50rem] w-full items-center">
              <div className="w-full">
                <div className="w-full relative">
                  <InputLabel htmlFor="outlined-adornment-linkPesquisa">
                    Extrair dados de URL
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    placeholder="https://amazon.com/dsakSIKC4"
                    value={product.linkPesquisa}
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e, "linkPesquisa")}
                    // {...register("linkPesquisa")}
                    id="outlined-adornment-linkPesquisa"
                    startAdornment={
                      <InputAdornment position="start">🌐</InputAdornment>
                    }
                    label="linkPesquisa"
                  />
                </div>
              </div>
              <div className="md:w-96 w-full flex gap-2">
                {product.linkPesquisa ? (
                  <LoadingButton
                    sx={{ padding: 1.8, marginTop: 2.6 }}
                    fullWidth
                    loading={isAnalyzing}
                    onClick={() => {
                      analiseLink(product.linkPesquisa);
                    }}
                    disabled={isAnalyzing}
                    size="large"
                    color={product.currentPrice ? "success" : "error"}
                    loadingPosition="start"
                    startIcon={<LinkIcon />}
                    variant="outlined"
                  >
                    {isAnalyzing ? "Analisando" : " Analisar "}
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    sx={{ padding: 1.8, marginTop: 2.6 }}
                    fullWidth
                    loading={isAnalyzing}
                    onClick={handlePasteFromClipboard}
                    disabled={isAnalyzing}
                    size="large"
                    loadingPosition="start"
                    startIcon={<LinkIcon />}
                    variant="outlined"
                  >
                    {isAnalyzing ? "Analisando..." : "Colar Link"}
                  </LoadingButton>
                )}
                {product.linkPesquisa && (
                  <Button
                    variant="outlined"
                    sx={{ marginTop: 2.6 }}
                    size="large"
                    color="error"
                    onClick={handleFormReset}
                    loading={isAnalyzing}
                    disabled={isAnalyzing}
                  >
                    {<DeleteOutlineIcon />}
                  </Button>
                )}
              </div>
            </div>

            <Divider />

            <div className="md:flex w-full">
              <form
                noValidate
                autoComplete="off"
                className="flex flex-col mt-8 w-96 gap-4 w-full"
                // onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <div className="flex relative">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Mensagem Chamativa"
                      placeholder="SUPER PROMOÇÃO"
                      value={product.catchyText}
                      variant="outlined"
                      color="secondary"
                      autoComplete="off"
                      onChange={(e) => handleInputChange(e, "catchyText")}
                      // {...register("catchyText")}
                    />
                    <IconButton
                      aria-label="Automatic"
                      color="secondary"
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                      onClick={() => {
                        addTextToCatchyText();
                      }}
                    >
                      <AutoAwesomeIcon />
                    </IconButton>
                  </div>
                  <div className="flex my-2 gap-2 flex-nowrap">
                    <Chip
                      label="🚨"
                      size="small"
                      onClick={() => addEmojiToCatchyText("🚨")}
                    />
                    <Chip
                      label="🔥"
                      size="small"
                      onClick={() => addEmojiToCatchyText("🔥")}
                    />
                    <Chip
                      label="😱"
                      size="small"
                      onClick={() => addEmojiToCatchyText("😱")}
                    />
                    <Chip
                      label="💪"
                      size="small"
                      onClick={() => addEmojiToCatchyText("💪")}
                    />
                    <Chip
                      label="🏃‍♂️"
                      size="small"
                      onClick={() => addEmojiToCatchyText("🏃‍♂️")}
                    />
                    <Chip
                      label="🔝"
                      size="small"
                      onClick={() => addEmojiToCatchyText("🔝")}
                    />

                    <Chip
                      label="⚡"
                      size="small"
                      onClick={() => addEmojiToCatchyText("⚡")}
                    />
                    <Chip
                      label="⏳"
                      size="small"
                      onClick={() => addEmojiToCatchyText("⏳")}
                    />
                    <Chip
                      label="💋"
                      size="small"
                      onClick={() => addEmojiToCatchyText("💋")}
                    />
                  </div>
                </div>

                <div className="flex w-full gap-2">
                  <div className="w-full">
                    <InputLabel htmlFor="outlined-adornment-originalPrice">
                      Preço Original
                    </InputLabel>
                    <OutlinedInput
                      sx={{ textDecoration: "line-through" }}
                      fullWidth
                      placeholder="20.50"
                      value={product.originalPrice}
                      autoComplete="off"
                      onChange={(e) => handleInputChange(e, "originalPrice")}
                      // {...register("originalPrice")}
                      id="outlined-adornment-originalPrice"
                      startAdornment={
                        <InputAdornment position="start">R$</InputAdornment>
                      }
                      label="originalPrice"
                    />
                  </div>

                  <div className="w-full">
                    <InputLabel htmlFor="outlined-adornment-currentPrice">
                      Preço Atual
                    </InputLabel>
                    <OutlinedInput
                      placeholder="15.50"
                      color="secondary"
                      value={product.currentPrice}
                      autoComplete="off"
                      onChange={(e) => handleInputChange(e, "currentPrice")}
                      // {...register("currentPrice")}
                      fullWidth
                      id="outlined-adornment-currentPrice"
                      startAdornment={
                        <InputAdornment position="start">R$</InputAdornment>
                      }
                      label="currentPrice"
                    />
                  </div>

                  <div className="w-full">
                    <InputLabel htmlFor="outlined-adornment-recurrencePrice">
                      Preço Recorrente
                    </InputLabel>
                    <OutlinedInput
                      placeholder="12.50"
                      value={product.recurrencePrice}
                      autoComplete="off"
                      onChange={(e) => handleInputChange(e, "recurrencePrice")}
                      // {...register("recurrencePrice")}
                      fullWidth
                      id="outlined-adornment-recurrencePrice"
                      startAdornment={
                        <InputAdornment position="start">R$</InputAdornment>
                      }
                      label="recurrencePrice"
                    />
                  </div>
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Cupom"
                    placeholder="TOMEPROMO10"
                    value={product.cupom}
                    variant="outlined"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e, "cupom")}
                    // {...register("cupom")}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Descrição"
                    multiline
                    placeholder="Headset Gamer Sem Fio Logitech G435 LIGHTSPEED, Conexão USB e Bluetooth, Design Leve e Confortável, Microfone Embutido, Bateria de até 18h - Compatível com Dolby Atmos, PC, PS4, PS5, Mobile – Branco"
                    value={product.productName}
                    variant="outlined"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e, "productName")}
                    // {...register("productName")}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Condições"
                    placeholder="em 1x até 7x sem juros"
                    value={product.conditionPayment}
                    variant="outlined"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e, "conditionPayment")}
                    // {...register("conditionPayment")}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Link Compra"
                    placeholder="https://amzn.to/3tP7mxY"
                    value={product.buyLink}
                    variant="outlined"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e, "buyLink")}
                    // {...register("buyLink")}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="URL Patrocinio"
                    placeholder="https://amzn.to/3FXpmcn"
                    value={product.sponsorLink}
                    variant="outlined"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e, "sponsorLink")}
                    // {...register("sponsorLink")}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Alerta 2"
                    placeholder="⚠️ Essa oferta pode encerrar a qualquer momento"
                    value={product.announcement1}
                    variant="outlined"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e, "announcement1")}
                    // {...register("announcement1")}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Alerta 2"
                    placeholder="⚠️ O link ou foto da promo não apareceu? Só adicionar o número do administrador"
                    value={product.announcement2}
                    variant="outlined"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e, "announcement2")}
                    // {...register("announcement2")}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Categoria"
                    placeholder="Eletrônico"
                    value={product.category}
                    variant="outlined"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e, "category")}
                    // {...register("category")}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="URL Imagem"
                    placeholder="https://m.media-amazon.com/images/I/81WfRjLX93L._AC_SX679_.jpg"
                    value={product.imagePath}
                    variant="outlined"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e, "imagePath")}
                    // {...register("imagePath")}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Alt Imagem"
                    placeholder="Headset Gamer"
                    value={product.title}
                    variant="outlined"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e, "title")}
                    // {...register("title")}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Site"
                    placeholder="Amazon"
                    value={product.website}
                    variant="outlined"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e, "website")}
                    // {...register("website")}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <LoadingButton
                    sx={{ padding: 1.8, marginTop: 2.6 }}
                    fullWidth
                    loading={isCreating}
                    onClick={onSubmit}
                    disabled={isCreating}
                    size="large"
                    loadingPosition="start"
                    startIcon={<AddIcon />}
                    variant="outlined"
                    // type="submit"
                  >
                    {isCreating && !product.id
                      ? "Adicionando..."
                      : isCreating && product.id
                      ? "Adicionando Novamente..."
                      : !isCreating && !product.id
                      ? "Adicionar Produto"
                      : "Produto Adicionado"}
                  </LoadingButton>

                  <div className="flex gap-4 w-full">
                    {product.id ? (
                      <LoadingButton
                        sx={{ padding: 1.8, marginTop: 2.6 }}
                        fullWidth
                        loading={isCreating}
                        onClick={handleCopyToClipboard}
                        disabled={isCreating || !product.id}
                        size="large"
                        color={isCopying ? "success" : "secondary"}
                        loadingPosition="start"
                        startIcon={<ContentPasteIcon />}
                        variant="outlined"
                      >
                        {isCopying ? "Copiado!" : "Copiar"}
                      </LoadingButton>
                    ) : null}
                    {product.id ? (
                      <LoadingButton
                        sx={{ padding: 1.8, marginTop: 2.6 }}
                        fullWidth
                        loading={isSending}
                        onClick={handleSendMessage}
                        disabled={isSending || !product.id}
                        size="large"
                        color={isSending ? "success" : "secondary"}
                        loadingPosition="start"
                        startIcon={<WhatsAppIcon />}
                        variant="outlined"
                      >
                        {isSending ? "Enviando" : "Enviar Grupo"}
                      </LoadingButton>
                    ) : null}
                    {product.id ? (
                      <LoadingButton
                        sx={{ padding: 1.8, marginTop: 2.6 }}
                        fullWidth
                        loading={isSendingTest}
                        onClick={handleSendMessageTest}
                        disabled={isSendingTest || !product.id}
                        size="large"
                        color={isSendingTest ? "success" : "secondary"}
                        loadingPosition="start"
                        startIcon={<WhatsAppIcon />}
                        variant="outlined"
                      >
                        {isSendingTest ? "Enviando" : "Enviar Teste"}
                      </LoadingButton>
                    ) : null}
                  </div>
                </div>
              </form>

              <div className="w-full">
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
                  cupom={product.cupom}
                />
              </div>
            </div>
          </div>
          <Bottom className={`md:hidden`} />
        </Content>
      </div>
    </Container2>
  );
};

export default CreateProducts;
