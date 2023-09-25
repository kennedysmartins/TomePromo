import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

export function Card({
  text1,
  text2,
  text3,
  text4,
  text5,
  text6,
  text7,
  id,
  nomeProduto,
  imageURL,
  linkCompra,
  data,
  hora,
}) {
  return (
    <main className="m-16 w-96">
      <div className="flex-col gap-3 max-w-md mx-auto justify-center pt-6">
        <div className="rounded bg-gray-50">
          <header className="flex relative h-9 items-center">
            <div className="flex absolute -left-12 -top-[2px]">
              <a href="https://tomepromo.com.br">
                <img
                  className="rounded-full w-8"
                  src="/logo-tomepromo.jpeg"
                  alt="Logo Tome Promo"
                />
              </a>
              <img className="w-5" src="/bubble.svg" alt="Logo WhatsApp" />
            </div>
            <h2 className="text-black ml-3 font-semibold">Tome Promo</h2>
          </header>

          <picture>
            <Link href={`/promo/${id}`}>
              {imageURL ? (
                <img
                  className="w-full h-96 object-contain bg-white p-4"
                  src={imageURL}
                  alt={nomeProduto}
                />
              ) : (
                <Skeleton height={384} />
              )}
            </Link>
          </picture>

          <main className="p-4 text-black">
            <p>{text1 || <Skeleton />}</p>
            <br />
            <p>{text2 || <Skeleton />}</p>
            <br />
            <strong>{text3 || <Skeleton />}</strong>
            <p>
              {linkCompra && "🛒 Compre aqui: "}
              {linkCompra ? (
                <a target="_blank" href={linkCompra}>
                  {linkCompra}
                </a>
              ) : (
                <Skeleton />
              )}
            </p>

            <br />
            <p>
              {text5 && "📦 Seja Amazon Prime: "}
              {text5 ? (
                <a target="_blank" href={text5}>
                  {text5}
                </a>
              ) : (
                <Skeleton />
              )}
            </p>

            <p>{text6 || <Skeleton />}</p>
            <p>{text7 || <Skeleton />}</p>
          </main>

          <footer className=" flex justify-end px-3 text-gray-500">
            <h5>
              {data || <Skeleton />} {hora || <Skeleton />}
            </h5>
          </footer>
        </div>
        <div className="flex justify-center items-center gap-3 py-2">
          <a
            className="w-full whitespace-nowrap"
            target="_blank"
            href={linkCompra}
          >
            {text5 ? (
              <button className="bg-gray-50 text-black w-full p-2 rounded">
                🛒 Comprar
              </button>
            ) : (
              <button className="bg-gray-50 text-black w-full p-2 rounded">
                <Skeleton />
              </button>
            )}
          </a>
          <a
            className="w-full whitespace-nowrap"
            target="_blank"
            href={linkCompra}
          >
            {text5 ? (
              <button className="bg-gray-50 text-black w-full p-2 rounded">
                🛒 Comprar
              </button>
            ) : (
              <button className="bg-gray-50 text-black w-full p-2 rounded">
                <Skeleton />
              </button>
            )}
          </a>
        </div>
      </div>
    </main>
  );
}
