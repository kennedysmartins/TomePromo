const products = [
  {
    id: 1,
    nomeProduto:"Headset Gamer Sem Fio Logitech G435 LIGHTSPEED",
    imageURL: "https://m.media-amazon.com/images/I/81WfRjLX93L._AC_SX679_.jpg",
    linkCompra: "https://amzn.to/46iMRYh",
    categoria:"eletrônico",
    data: "21/09/23",
    hora: "12:32",
    text1:
      "🔝👌-47% de DESCONTO",
    text2: "Headset Gamer Sem Fio Logitech G435 LIGHTSPEED, Conexão USB e Bluetooth, Design Leve e Confortável, Microfone Embutido, Bateria de até 18h - Compatível com Dolby Atmos, PC, PS4, PS5, Mobile – Branco",
    text3: "🔥 R$ 374,00 em 1x até 7x sem juros",
    text4: "https://tomepromo.com.br/dsjib",
    text5: "https://tomepromo.com.br/p",
    text6: "⚠️ Essa oferta pode encerrar a qualquer momento",
    text7: "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do",
  },
  {
    id: 2,
    nomeProduto:"Lava e Seca Smart LG VC2 13kg",
    imageURL:"https://m.media-amazon.com/images/I/51iOom9qxoL._AC_SX522_.jpg",
    linkCompra:"https://amzn.to/3t2PzD1",
    categoria: "casa",
    data: "21/09/23",
    hora: "14:11",
    text1:
      "A melhor Lava e Seca!",
    text2: "Lava e Seca Smart LG VC2 13kg Aço Escovado Preto com Inteligência Artificial AIDD™ - CV9013EC4 - Motor Inverter",
    text3: "🔥 R$ 6.099,00 e até 10x sem juros",
    text4: "https://tomepromo.com.br/dsjib",
    text5: "https://tomepromo.com.br/p",
    text6: "⚠️ Essa oferta pode encerrar a qualquer momento",
    text7: "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do",
  },
  {
    id: 3,
    nomeProduto:"DURACELL - Pilha Alcalina AAA",
    imageURL:"https://m.media-amazon.com/images/I/61neCVcO5EL._AC_SX679_.jpg",
    linkCompra:"https://amzn.to/46hwlIb",
    categoria:"Pilhas Descartáveis",
    data: "21/09/23",
    hora: "15:17",
    text1:
      "Super Oferta",
    text2: "DURACELL - Pilha Alcalina AAA, Palito com 16 unidades",
    text3: "🔥 R$ 68,90  em 1x",
    text4: "https://tomepromo.com.br/dsjib",
    text5: "https://tomepromo.com.br/p",
    text6: "⚠️ Essa oferta pode encerrar a qualquer momento",
    text7: "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do",
  },
];

export function getProducts() {
  return products;
}

export function getProductById(id) {
  const result = products.filter((product) => {
    return product.id === id;
  });
  return result[0];
}
