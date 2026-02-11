import { Fragment, useState, useRef } from "react";
import { Transition, Dialog } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

import MenuIcon from "../../public/icons/MenuIcon";
import WhistlistIcon from "../../public/icons/WhistlistIcon";
import SearchIcon from "../../public/icons/SearchIcon";
import InstagramLogo from "../../public/icons/InstagramLogo";
import FacebookLogo from "../../public/icons/FacebookLogo";
import CartItem from "../CartItem/CartItem";

import { useWishlist } from "../../context/wishlist/WishlistProvider";
import { Lock } from "lucide-react";

export default function Menu() {
  const { wishlist } = useWishlist();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Admin state
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState("");
  const [pinVerified, setPinVerified] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const adminRef = useRef<HTMLDivElement>(null);
  const noOfWishlist = wishlist.length;

  function closeModal() {
    setOpen(false);
    setShowPinInput(false);
    setPin("");
    setPinVerified(false);
    setAdminOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    window.location.href = `/search?q=${searchValue}`;
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue((e.target as HTMLInputElement).value);
  };

  const handlePinSubmit = () => {
    if (pin === "1234") {
      setPinVerified(true);
      setAdminOpen(true);
      setShowPinInput(false);
    } else {
      alert("PIN inválido!");
      setPin("");
    }
  };

  return (
    <>
      {/* HEADER RIGHT AREA */}
      <div className="relative flex items-center justify-between w-full">
        {/* Menu button (near logo) */}
        <button
          type="button"
          aria-label="Menu"
          onClick={openModal}
          className="focus:outline-none"
        >
          <MenuIcon />
        </button>

        {/* Cart icon pinned to far right */}
        {/* <div className="flex items-center">
          <CartItem />
        </div> */}
      </div>

      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen">
            <Transition.Child as={Fragment}>
              <Dialog.Overlay className="fixed inset-0 bg-gray500 opacity-50" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-linear duration-600"
              enterFrom="opacity-0 -translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="ease-linear duration-300"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-full"
            >
              <div className="relative opacity-95 overflow-y-auto h-screen w-full max-w-md bg-white shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center p-6 pb-0">
                  <Link href="/">
                    <a>
                      <Image
                        src="/logo-prev.png"
                        alt="BFashion Logo"
                        width={85}
                        height={22}
                      />
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="outline-none text-3xl"
                    onClick={closeModal}
                  >
                    &#10005;
                  </button>
                </div>

                {/* Search */}
                <div className="mb-10">
                  <div className="px-6 flex flex-col">
                    <form
                      className="flex w-full items-center mt-5 mb-5 border-b-2 border-gray300"
                      onSubmit={handleSubmit}
                    >
                      <SearchIcon extraClass="text-gray300 w-6 h-6" />
                      <input
                        type="search"
                        placeholder="Procurar produtos..."
                        className="px-4 py-2 w-full focus:outline-none text-xl"
                        onChange={handleChange}
                      />
                    </form>

                    <Link href="/product-category/women">
                      <a className="menu-link" onClick={closeModal}>
                        Mulheres
                      </a>
                    </Link>

                    <Link href="/product-category/bags">
                      <a className="menu-link" onClick={closeModal}>
                        Bolsas
                      </a>
                    </Link>

                    <Link href="/sobre">
                      <a className="menu-link" onClick={closeModal}>
                        Sobre
                      </a>
                    </Link>

                    <hr className="border-gray300 my-3" />

                    <Link href="/wishlist">
                      <a
                        className="flex justify-between items-center text-xl py-2"
                        onClick={closeModal}
                      >
                        <span>Lista de desejos</span>
                        <div className="relative">
                          <WhistlistIcon />
                          {noOfWishlist > 0 && (
                            <span className="absolute -top-2 -left-6 bg-gray500 text-gray100 text-xs px-2 py-1 rounded-full">
                              {noOfWishlist}
                            </span>
                          )}
                        </div>
                      </a>
                    </Link>

                    <hr className="border-gray300 my-3" />

                    <div className="flex justify-between items-center py-3">
                      <span className="text-xl">Clique para ver carrinho</span>
                      <CartItem />
                    </div>

                    <hr className="border-gray300 my-3" />

                    {/* Minimal Admin Section */}
                    <div className="mt-6 relative" ref={adminRef}>
                      {!pinVerified && !showPinInput && (
                        <button
                          className="flex items-center gap-2 text-gray500 hover:text-gray700 text-sm transition"
                          onClick={() => setShowPinInput(true)}
                        >
                          <Lock size={16} />
                          Admin
                        </button>
                      )}

                      {showPinInput && !pinVerified && (
                        <div className="flex gap-2 items-center mt-2">
                          <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="PIN"
                            className="border border-gray-300 px-2 py-1 rounded text-sm w-full"
                          />
                          <button
                            onClick={handlePinSubmit}
                            className="bg-gray500 text-white px-3 py-1 rounded text-sm hover:bg-gray600 transition"
                          >
                            OK
                          </button>
                        </div>
                      )}

                      {pinVerified && adminOpen && (
                        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in text-sm">
                          <Link href="/orders">
                            <a
                              className="block px-4 py-2 hover:bg-gray-100 transition"
                              onClick={closeModal}
                            >
                              Ver Encomendas
                            </a>
                          </Link>
                          <Link href="/coming-soon">
                            <a
                              className="block px-4 py-2 hover:bg-gray-100 transition"
                              onClick={closeModal}
                            >
                              Gerir Produtos
                            </a>
                          </Link>
                          {/* <Link href="/admin/categories">
                            <a
                              className="block px-4 py-2 hover:bg-gray-100 transition"
                              onClick={closeModal}
                            >
                              Gerir Categorias
                            </a>
                          </Link>
                          <Link href="/admin/users">
                            <a
                              className="block px-4 py-2 hover:bg-gray-100 transition"
                              onClick={closeModal}
                            >
                              Gerir Utilizadores
                            </a>
                          </Link> */}
                        </div>
                      )}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-6 mt-6">
                      <a
                        href="https://www.facebook.com/bfashion"
                        aria-label="Facebook BFashion"
                        className="text-gray400"
                      >
                        <FacebookLogo extraClass="h-8" />
                      </a>
                      <a
                        href="https://www.instagram.com/bfashion_storee/"
                        aria-label="Instagram BFashion"
                        className="text-gray400"
                      >
                        <InstagramLogo extraClass="h-8" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
