import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useRouter } from "next/router";
import { updateProductClick } from "@/utils/api";

export function Card({
  catchyText,
  productName,
  conditionPayment,
  sponsorLink,
  announcement1,
  announcement2,
  id,
  title,
  imagePath,
  buyLink,
  data,
  hora,
  currentPrice,
  originalPrice,
  recurrencePrice,
  website,
  cupom,
}) {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const handleShare = () => {
    const shareText = `Confira esta promoção: \n\n${title} \n\n*Por apenas R$ ${formatCurrency(
      currentPrice
    )}!*\n\n🛒 *Compre aqui:* https://tomepromo.com.br/p/${id}\n\n📣 Entre em nosso grupo:\nhttps://tomepromo.com.br/g/`;

    const encodedShareText = encodeURIComponent(shareText);
    const url = `https://api.whatsapp.com/send?text=${encodedShareText}`;
    window.open(url, "_blank");
  };

  function formatCurrency(amount) {
    const options = { minimumFractionDigits: 2 };
    const formattedAmount = new Intl.NumberFormat("pt-BR", options).format(
      amount
    );

    return formattedAmount;
  }

  const handleBuyLinkClick = (id) => {
    updateProductClick(id);
  };

  return (
    <main className="md:w-[31rem] p-14 mx-auto">
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
                  className="background"
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
            <Link
              target="_blank"
              href={`${buyLink}`}
              onClick={() => handleBuyLinkClick(id)}
            >
              {imagePath ? (
                <img
                  className="w-full z-20 h-96 object-contain bg-white p-4"
                  src={imagePath}
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
            {catchyText && (
              <>
                <strong>{catchyText}</strong>
                <br />
                <br />
              </>
            )}

            <Link href={`/p/${id}`}>
              <p>{productName || <Skeleton />}</p>
            </Link>
            <br />

            {originalPrice > 0 && (
              <strong>
                De <del>R$ {formatCurrency(originalPrice)}</del>
                <br />
                Por{" "}
              </strong>
            )}
            {currentPrice && (
              <>
                {conditionPayment ? (
                  <>
                    <strong>R$ {formatCurrency(currentPrice)}</strong>{" "}
                    {conditionPayment}
                  </>
                ) : (
                  <strong>R$ {formatCurrency(currentPrice)}</strong>
                )}
              </>
            )}
            {recurrencePrice > 0 && (
              <strong>
                <br />
                Até R$ {formatCurrency(recurrencePrice)} com recorrência
              </strong>
            )}

            {cupom && (
              <>
                <br />
                <br />
                <p>
                  🔖 Utilize o cupom: <strong>{cupom}</strong>
                </p>
                <br />
              </>
            )}

            <p>
              {buyLink && "🛒 Compre aqui: "}
              {buyLink ? (
                <a
                  className="text-blue-500"
                  target="_blank"
                  href={`${buyLink}`}
                  onClick={() => handleBuyLinkClick(id)}
                >
                  {buyLink.slice(0, 24)}
                </a>
              ) : (
                <Skeleton />
              )}
            </p>

            <br />
            <p>
              {sponsorLink &&
              (sponsorLink.includes("amazon") || sponsorLink.includes("amzn"))
                ? "📦 Seja Amazon Prime: "
                : ""}
              {sponsorLink && (
                <a className="text-blue-500" target="_blank" href={sponsorLink}>
                  {sponsorLink.slice(0, 20)}
                </a>
              )}
            </p>

            <p>{announcement1 || <Skeleton />}</p>
            <p>{announcement2 || <Skeleton />}</p>
            {website && <br />}
            {website && <p>🌐 {website}</p>}
          </main>

          <footer className=" flex justify-end px-3 text-gray-500">
            <h5>
              {data} {hora}
            </h5>
          </footer>
        </div>
        <div className="flex justify-center items-center gap-3 py-2">
          <a
            className="w-full whitespace-nowrap"
            target="_blank"
            href={`${buyLink}`}
            onClick={() => handleBuyLinkClick(id)}
          >
            {buyLink ? (
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
          {buyLink ? (
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
        </div>
      </div>
    </main>
  );
}
