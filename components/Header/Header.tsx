import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import TopNav from "./TopNav";
import WhistlistIcon from "../../public/icons/WhistlistIcon";
import UserIcon from "../../public/icons/UserIcon";
import SearchForm from "../SearchForm/SearchForm";
import CartItem from "../CartItem/CartItem";
import Menu from "../Menu/Menu";
import AppHeader from "./AppHeader";
import { useWishlist } from "../../context/wishlist/WishlistProvider";

import { ChevronDown } from "lucide-react";
import styles from "./Header.module.css";

type Props = { title?: string };

const Header: React.FC<Props> = ({ title }) => {
  const { wishlist } = useWishlist();
  const [animate, setAnimate] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [didMount, setDidMount] = useState(false);

  const [adminOpen, setAdminOpen] = useState(false);
  const [pinVerified, setPinVerified] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const adminRef = useRef<HTMLLIElement>(null);

  const noOfWishlist = wishlist.length;

  const handleAnimate = useCallback(() => {
    if (noOfWishlist === 0) return;
    setAnimate("animate__animated animate__headShake");
  }, [noOfWishlist]);

  useEffect(() => {
    handleAnimate();
    const timer = setTimeout(() => setAnimate(""), 1000);
    return () => clearTimeout(timer);
  }, [handleAnimate]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 30);
  }, []);

  useEffect(() => {
    setDidMount(true);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (e: MouseEvent) => {
      if (adminRef.current && !adminRef.current.contains(e.target as Node)) {
        setAdminOpen(false);
        setPinInput("");
        setPinVerified(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      setDidMount(false);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleScroll]);

  if (!didMount) return null;

  const handleAdminIconClick = () => {
    if (!adminOpen) {
      setAdminOpen(true);
      setPinVerified(false);
      setPinInput("");
    } else {
      setAdminOpen(false);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "1234") {
      setPinVerified(true);
    } else {
      alert("PIN inválido!");
      setPinVerified(false);
      setPinInput("");
    }
  };

  return (
    <>
      <AppHeader title={title || "BFashion"} />
      <TopNav />

      <nav
        className={`${
          scrolled ? "bg-white sticky top-0 shadow-md z-50" : "bg-transparent"
        } w-full z-50 h-20 relative`}
      >
        <div className="app-max-width w-full">
          <div
            className={`flex justify-between align-baseline app-x-padding ${styles.mainMenu}`}
          >
            {/* Mobile Menu */}
            <div className="flex-1 lg:flex-0 lg:hidden">
              <Menu />
            </div>

            {/* Left Menu */}
            <ul className={`flex-0 lg:flex-1 flex ${styles.leftMenu}`}>
              <li><Link href="/"><a>Início</a></Link></li>
              <li><Link href="/product-category/women"><a>Mulheres</a></Link></li>
              <li><Link href="/product-category/bags"><a>Bolsas</a></Link></li>
              <li><Link href="/sobre"><a>Sobre</a></Link></li>
            </ul>

            {/* Logo */}
            <div className="flex-1 flex justify-center items-center cursor-pointer">
              <div className="w-32 h-auto">
                <Link href="/">
                  <a>
                    <Image
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

            {/* Right Menu */}
            <ul className={`flex-1 flex justify-end ${styles.rightMenu} relative`}>
              <li><SearchForm /></li>

              {/* Wishlist */}
              <li>
                <Link href="/wishlist" passHref>
                  <button type="button" className="relative">
                    <WhistlistIcon />
                    {noOfWishlist > 0 && (
                      <span className={`${animate} absolute text-xs -top-3 -right-3 bg-gray500 text-gray100 py-1 px-2 rounded-full`}>
                        {noOfWishlist}
                      </span>
                    )}
                  </button>
                </Link>
              </li>

              {/* NEW: Desktop Cart */}
              <li className="hidden lg:flex ml-4">
                <CartItem />
              </li>

              {/* Desktop Admin */}
              <li className="hidden lg:flex relative ml-4" ref={adminRef}>
                <button
                  onClick={handleAdminIconClick}
                  className="flex items-center gap-1 border border-gray-200 px-3 py-1 rounded hover:bg-gray-100 transition"
                >
                  <UserIcon />
                  <ChevronDown size={14} />
                </button>

                {adminOpen && !pinVerified && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50">
                    <form onSubmit={handlePinSubmit} className="flex flex-col gap-2">
                      <input
                        type="password"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        placeholder="Introduza o PIN"
                        className="border px-2 py-1 rounded text-sm"
                      />
                      <button type="submit" className="bg-gray500 text-white text-sm px-2 py-1 rounded">
                        OK
                      </button>
                    </form>
                  </div>
                )}

                {adminOpen && pinVerified && (
                  <ul className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <li>
                      <Link href="/orders">
                        <a className="block px-4 py-2 text-sm hover:bg-gray-100">
                          Ver Encomendas
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/coming-soon">
                        <a className="block px-4 py-2 text-sm hover:bg-gray-100">
                          Gerir Produtos
                        </a>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Mobile Cart (unchanged) */}
              <li className="lg:hidden ml-4">
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
