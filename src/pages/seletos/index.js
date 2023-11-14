import Head from "next/head";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { ContentHome } from "@/components/ContentHome";
import { Header } from "@/components/Header";
import { getProductGroups, getProducts } from "@/utils/api";
import { useEffect, useState, useRef } from "react";
import "tailwindcss/tailwind.css";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Link from "next/link";

export default function Seletos() {
  const [productGroups, setProductGroups] = useState([]);

  useEffect(() => {
    const fetchProductGroups = async () => {
      const dataProductGroups = await getProductGroups();
      console.log(dataProductGroups);
      setProductGroups(dataProductGroups);
    };
    fetchProductGroups();
  }, []);

  return (
    <Container>
      <Head>
        <title>TomePromo</title>
        <meta property="og:title" content="TomePromo" />
        <meta
          property="og:image"
          content="https://www.tomepromo.com.br/logo-tomepromo1.jpeg"
        />
        <meta property="og:url" content={`https://tomepromo.com.br`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TomePromo" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta
          name="description"
          content="Quer promoção? então Tome! - TomePromo"
        />
      </Head>
      <Header />
      <ContentHome>
        <ul className="flex flex-col mt-12 px-auto list-none">
          {productGroups.map((productGroup) => (
            <li key={productGroup.id} className="my-4 gap-3">
              <Link href={`/seletos/${productGroup.id}`}>
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
      </ContentHome>
    </Container>
  );
}
