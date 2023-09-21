import React from "react";

export function Card({ text1, text2, text3, text4, text5, text6 ,text7, nomeProduto, imageURL, linkCompra, data, hora  }) {
  return (
    <main className="m-16">
      <div className="flex-col gap-3 max-w-md mx-auto justify-center pt-6">
        <div className="rounded bg-gray-50">
          <header className="flex  relative h-9 items-center">
            <div className="flex absolute -left-12 -top-[2px]">
            <a href="https://tomepromo.com.br">
              <img className="rounded-full w-8" src="/logo-tomepromo.jpeg" alt="Logo Tome Promo" />
            </a>
            <img className="w-5" src="/bubble.svg" alt="Logo WhatsApp" />
            </div>
            <h2 className="text-black ml-3 font-semibold">Tome Promo</h2>
            <i class="fab fa-whatsapp"></i>
          </header>

          <picture>
            <img
                className="w-full h-96 object-contain bg-white p-4"
              src={imageURL}
              alt={nomeProduto}
            />
          </picture>

          <main className="p-4 text-black">
            <p>
              {text1}
            </p>
            <br />
            <p>{text2}</p>
            <br />
            <strong>{text3}</strong>
            <p>
              🛒 Compre aqui:{" "}
              <a href={linkCompra}>
              {linkCompra}
              </a>
            </p>
            <br />
            <p>
              📦 Seja Amazon Prime:{" "}
              <a href={text5}>
              {text5}
              </a>
            </p>
            <p>{text6}</p>
            <p>
            {text7}
            </p>
          </main>

          <footer className=" flex justify-end px-3 text-gray-500">
            <h5>{data} {hora}</h5>
          </footer>
        </div>
        <div className="flex justify-center items-center gap-3 py-2">
          <a className="w-full whitespace-nowrap" target="_blank" href={linkCompra}><button className="bg-gray-50 text-black w-full p-2 rounded">🛒 Comprar</button></a>
          <a className="w-full whitespace-nowrap" target="_blank" href={linkCompra}><button className="bg-gray-50 text-black w-full p-2 rounded">🔗 Compartilhar</button></a>
        </div>
      </div>
    </main>
  );
}
