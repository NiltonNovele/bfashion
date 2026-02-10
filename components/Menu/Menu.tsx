import { Fragment, useState } from "react";
import { Menu as HMenu, Transition, Dialog } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

import MenuIcon from "../../public/icons/MenuIcon";
import WhistlistIcon from "../../public/icons/WhistlistIcon";
import SearchIcon from "../../public/icons/SearchIcon";
import InstagramLogo from "../../public/icons/InstagramLogo";
import FacebookLogo from "../../public/icons/FacebookLogo";
import CartItem from "../CartItem/CartItem";

import { useWishlist } from "../../context/wishlist/WishlistProvider";

export default function Menu() {
  const { wishlist } = useWishlist();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const noOfWishlist = wishlist.length;

  function closeModal() {
    setOpen(false);
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
        
        <div className="flex items-center">
          <CartItem />
        </div>
      </div>

      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          style={{ zIndex: 99999 }}
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
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-linear duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
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
