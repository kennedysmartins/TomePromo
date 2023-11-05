const products = [
  {
    id: 1,
    title:"Headset Gamer Sem Fio Logitech G435 LIGHTSPEED",
    image: "https://m.media-amazon.com/images/I/81WfRjLX93L._AC_SX679_.jpg",
    buyLink: "https://amzn.to/46iMRYh",
    categoria:"eletrônico",
    data: "21/09/23",
    hora: "12:32",
    catchyText:
      "🔝👌-47% de DESCONTO",
    productName: "Headset Gamer Sem Fio Logitech G435 LIGHTSPEED, Conexão USB e Bluetooth, Design Leve e Confortável, Microfone Embutido, Bateria de até 18h - Compatível com Dolby Atmos, PC, PS4, PS5, Mobile – Branco",
    conditionPayment: "🔥 R$ 374,00 em 1x até 7x sem juros",
    text4: "https://tomepromo.com.br/dsjib",
    sponsorLink: "https://tomepromo.com.br/p",
    announcement1: "⚠️ Essa oferta pode encerrar a qualquer momento",
    announcement2: "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do",
  },
  {
    id: 2,
    title:"Lava e Seca Smart LG VC2 13kg",
    image:"https://m.media-amazon.com/images/I/51iOom9qxoL._AC_SX522_.jpg",
    buyLink:"https://amzn.to/3t2PzD1",
    categoria: "casa",
    data: "21/09/23",
    hora: "14:11",
    catchyText:
      "A melhor Lava e Seca!",
    productName: "Lava e Seca Smart LG VC2 13kg Aço Escovado Preto com Inteligência Artificial AIDD™ - CV9013EC4 - Motor Inverter",
    conditionPayment: "🔥 R$ 6.099,00 e até 10x sem juros",
    text4: "https://tomepromo.com.br/dsjib",
    sponsorLink: "https://tomepromo.com.br/p",
    announcement1: "⚠️ Essa oferta pode encerrar a qualquer momento",
    announcement2: "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do",
  },
  {
    id: 3,
    title:"DURACELL - Pilha Alcalina AAA",
    image:"https://m.media-amazon.com/images/I/61neCVcO5EL._AC_SX679_.jpg",
    buyLink:"https://amzn.to/46hwlIb",
    categoria:"Pilhas Descartáveis",
    data: "21/09/23",
    hora: "15:17",
    catchyText:
      "Super Oferta",
    productName: "DURACELL - Pilha Alcalina AAA, Palito com 16 unidades",
    conditionPayment: "🔥 R$ 68,90  em 1x",
    text4: "https://tomepromo.com.br/dsjib",
    sponsorLink: "https://tomepromo.com.br/p",
    announcement1: "⚠️ Essa oferta pode encerrar a qualquer momento",
    announcement2: "⚠️ O link ou foto da promo não apareceu? Só adicionar o número do",
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
