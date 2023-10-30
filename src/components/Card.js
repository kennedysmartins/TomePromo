import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useRouter } from 'next/router';

export function Card({
  text1,
  text2,
  condition,
  text5,
  text6,
  text7,
  id,
  title,
  image,
  linkCompra,
  data,
  hora,
  price,
  priceoriginal,
}) {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const handleShare = () => {
    const shareText = `Confira esta promoção: ${title} por apenas R$ ${price}! 
Saiba mais em: https://tomepromo.com.br/promo/${id}

Entre em nosso grupo de promoções:
https://tomepromo.com.br/grupo`;

    const encodedShareText = encodeURIComponent(shareText);
    const url = `https://api.whatsapp.com/send?text=${encodedShareText}`;
    window.open(url, '_blank');
};
  return (
    <main className="w-[500px] p-14 mx-auto">
      <div className="flex-col gap-3 max-w-md mx-auto justify-center pt-6">
        <div
          className={`${
            theme === "dark" ? "bg-gray-700 " : "bg-zinc-50  "
          } rounded `}
        >
          <header className="flex relative h-9 items-center">
            <div
              className="flex absolute -left-12 -top-[2px] "
              style={{ clipPath: "inset(0 0 5px 0)" }}
            >
              <a href="https://tomepromo.com.br">
                <img
                  className="rounded-full w-8"
                  src="/logo-tomepromo.jpeg"
                  alt="Logo Tome Promo"
                />
              </a>
              <svg
                className="w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 21"
              >
                <path
                  class="background"
                  fill={`${theme === "dark" ? "#374151 " : "#fbfbfb  "} `}
                  d="M8,1 L9,1 L9,20 L8,20 L8,18 C7.807,15.161 7.124,12.233 5.950,9.218 C5.046,6.893 3.504,4.733 1.325,2.738 L1.325,2.738 C0.917,2.365 0.89,1.732 1.263,1.325 C1.452,1.118 1.72,1 2,1 L8,1 Z"
                />
              </svg>
            </div>
            <h2
              className={`${
                theme === "dark" ? "text-white " : "text-black  "
              }  ml-3 font-semibold`}
            >
              Tome Promo
            </h2>
          </header>

          <picture>
            <Link href={`/promo/${id}`}>
              {image ? (
                <img
                  className="w-full z-20 h-96 object-contain bg-white p-4"
                  src={image}
                  alt={title}
                />
              ) : (
                <Skeleton height={384} />
              )}
            </Link>
          </picture>

          <main
            className={`${
              theme === "dark" ? "text-white " : "text-black  "
            } p-4 `}
          >
            <p>{text1 || <Skeleton />}</p>
            <br />
            <p>{text2 || <Skeleton />}</p>
            <br />

            {priceoriginal && (
              <strong>
                De R$<del>{priceoriginal}</del>
                <br />Por </strong>
            )}
            {price && (
              <strong>
                {`R$ ${price} ${condition}` ? (
                  `R$ ${price} ${condition}`
                ) : (
                  <Skeleton />
                )}
              </strong>
            )}

            <p>
              {linkCompra && "🛒 Compre aqui: "}
              {linkCompra ? (
                <a target="_blank" href={`${linkCompra}?source=tomepromo08-20`}>
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
        href={`${linkCompra}?source=tomepromo08-20`}
      >
        {text5 ? (
          <button
            className={`${
              theme === "dark"
                ? "text-white bg-gray-700 "
                : "text-black bg-gray-50  "
            }   w-full p-2 rounded`}
          >
            🛒 Comprar
          </button>
        ) : (
          <button
            className={`${
              theme === "dark"
                ? "text-white bg-gray-700 "
                : "text-black bg-gray-50  "
            }   w-full p-2 rounded`}
          >
            <Skeleton />
          </button>
        )}
      </a>
      <button
        className={`${
          theme === "dark"
            ? "text-white bg-gray-700 "
            : "text-black bg-gray-50  "
        }  w-full p-2 rounded`}
        onClick={handleShare}
      >
        🔗 Compartilhar
      </button>
    </div>
      </div>
    </main>
  );
}
