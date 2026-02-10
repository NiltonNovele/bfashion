import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

import TopNav from "./TopNav";
import WhistlistIcon from "../../public/icons/WhistlistIcon";
import UserIcon from "../../public/icons/UserIcon";
import AuthForm from "../Auth/AuthForm";
import SearchForm from "../SearchForm/SearchForm";
import CartItem from "../CartItem/CartItem";
import Menu from "../Menu/Menu";
import AppHeader from "./AppHeader";
import { useWishlist } from "../../context/wishlist/WishlistProvider";

import styles from "./Header.module.css";

type Props = {
  title?: string;
};

const Header: React.FC<Props> = ({ title }) => {
  const { wishlist } = useWishlist();
  const [animate, setAnimate] = useState("");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [didMount, setDidMount] = useState<boolean>(false);

  // Número de itens na wishlist
  let noOfWishlist = wishlist.length;

  // Animação do número da wishlist
  const handleAnimate = useCallback(() => {
    if (noOfWishlist === 0) return;
    setAnimate("animate__animated animate__headShake");
  }, [noOfWishlist, setAnimate]);

  // Atualiza animação quando a wishlist muda
  useEffect(() => {
    handleAnimate();
    setTimeout(() => {
      setAnimate("");
    }, 1000);
  }, [handleAnimate]);

  // Detecta scroll para mudar fundo do menu
  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    if (offset > 30) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [setScrolled]);

  useEffect(() => {
    setDidMount(true);
    window.addEventListener("scroll", handleScroll);
    return () => setDidMount(false);
  }, [handleScroll]);

  if (!didMount) {
    return null;
  }

  return (
    <>
      {/* Cabeçalho da página */}
      <AppHeader title={title || "BFashion"} />

      {/* Botão de salto para o conteúdo principal */}
      <a
        href="#main-content"
        className="whitespace-nowrap absolute z-50 left-4 opacity-90 rounded-md bg-white px-4 py-3 transform -translate-y-40 focus:translate-y-0 transition-all duration-300"
      >
        Saltar para o conteúdo principal
      </a>

      {/* Top Navigation */}
      <TopNav />

      {/* Navegação principal */}
      <nav
        className={`${
          scrolled ? "bg-white sticky top-0 shadow-md z-50" : "bg-transparent"
        } w-full z-50 h-20 relative`}
      >
        <div className="app-max-width w-full">
          <div
            className={`flex justify-between align-baseline app-x-padding ${styles.mainMenu}`}
          >
            {/* Menu Hamburger Mobile */}
            <div className="flex-1 lg:flex-0 lg:hidden">
              <Menu />
            </div>

            {/* Menu Esquerdo */}
            <ul className={`flex-0 lg:flex-1 flex ${styles.leftMenu}`}>
              {/* <li>
                <Link href={`/coming-soon`}>
                  <a>Homens</a>
                </Link>
              </li> */}
              <li>
                <Link href={`/product-category/women`}>
                  <a>Mulheres</a>
                </Link>
              </li>
              <li>
                <Link href="/product-category/bags">
                  <a>Bolsas</a>
                </Link>
              </li>
              <li>
                <Link href="/sobre">
                  <a>Sobre</a>
                </Link>
              </li>
            </ul>

            {/* Logo */}
            <div className="flex-1 flex justify-center items-center cursor-pointer">
              <div className="w-32 h-auto">
                <Link href="/">
                  <a>
                    <Image
                      className="justify-center"
                      src="/logo-prev.png"
                      alt="BFashion Logo"
                      width={220}
                      height={50}
                      layout="responsive"
                    />
                  </a>
                </Link>
              </div>
            </div>

            {/* Menu Direito */}
            <ul className={`flex-1 flex justify-end ${styles.rightMenu}`}>
              <li>
                <SearchForm />
              </li>
              {/* <li>
                <AuthForm>
                  <UserIcon />
                </AuthForm>
              </li> */}
              <li>
                <Link href="/wishlist" passHref>
                  <button
                    type="button"
                    className="relative"
                    aria-label="Lista de desejos"
                  >
                    <WhistlistIcon />
                    {noOfWishlist > 0 && (
                      <span
                        className={`${animate} absolute text-xs -top-3 -right-3 bg-gray500 text-gray100 py-1 px-2 rounded-full`}
                      >
                        {noOfWishlist}
                      </span>
                    )}
                  </button>
                </Link>
              </li>
              <li>
                <CartItem />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
