import Link from "next/link";
import InstagramLogo from "../../public/icons/InstagramLogo";
import FacebookLogo from "../../public/icons/FacebookLogo";
import styles from "./Header.module.css";

const newsItems = [
  "20% de desconto em todas as bolsas para a noite de Ano Novo!",
  "Envio grátis em compras acima de 5000MZN!",
  "Inscreva-se na nossa newsletter e receba ofertas exclusivas!",
];

const TopNav = () => {
  return (
    <div className="bg-gray500 text-gray100 hidden lg:flex items-center px-4 h-10 overflow-hidden relative">
      {/* Social icons */}
      <div className="flex items-center gap-4 z-10">
        <Link href="https://www.instagram.com/bfashion_storee/">
          <a aria-label="Instagram BFashion">
            <InstagramLogo />
          </a>
        </Link>
      </div>

      {/* Horizontal scrolling news ticker */}
      <div className="flex-1 overflow-hidden relative h-full mx-6">
        <div className="flex animate-scroll whitespace-nowrap">
          {/* Replicate news items 3 times for seamless loop */}
          {[...newsItems, ...newsItems, ...newsItems].map((item, index) => (
            <div
              key={index}
              className="inline-block px-8 text-white font-medium text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
