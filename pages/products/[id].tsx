import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import axios from "axios";

import Heart from "../../public/icons/Heart";
import DownArrow from "../../public/icons/DownArrow";
import FacebookLogo from "../../public/icons/FacebookLogo";
import InstagramLogo from "../../public/icons/InstagramLogo";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GhostButton from "../../components/Buttons/GhostButton";
import Button from "../../components/Buttons/Button";
import Card from "../../components/Card/Card";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

import { apiProductsType, itemType } from "../../context/cart/cart-types";
import { useWishlist } from "../../context/wishlist/WishlistProvider";
import { useCart } from "../../context/cart/CartProvider";
import HeartSolid from "../../public/icons/HeartSolid";

SwiperCore.use([Pagination]);

type Props = {
  product: itemType;
  products: itemType[];
};

const Product: React.FC<Props> = ({ product, products }) => {
  const { addItem } = useCart();
  const { wishlist, addToWishlist, deleteWishlistItem } = useWishlist();

  const [size, setSize] = useState("M");
  const [mainImg, setMainImg] = useState(product.img1);
  const [currentQty, setCurrentQty] = useState(1);

  const alreadyWishlisted =
    wishlist?.some((w) => w.id === product.id) ?? false;

  useEffect(() => {
    setMainImg(product.img1);
  }, [product]);

  const currentItem = {
    ...product,
    qty: currentQty,
  };

  const handleWishlist = () => {
    alreadyWishlisted
      ? deleteWishlistItem?.(currentItem)
      : addToWishlist?.(currentItem);
  };

  

  return (
    <div>
      <Header title={`${product.name} - Haru Fashion`} />

      <main id="main-content">
        {/* Breadcrumb */}
        <div className="bg-lightgreen h-16 flex items-center border-t-2 border-gray200">
          <div className="app-x-padding app-max-width w-full">
            <div className="breadcrumb">
              <Link href="/">
                <a className="text-gray400">Início</a>
              </Link>{" "}
              /{" "}
              <Link href={`/product-category/${product.categoryName}`}>
                <a className="text-gray400 capitalize">
                  {product.categoryName}
                </a>
              </Link>{" "}
              / <span>{product.name}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="itemSection app-max-width app-x-padding flex flex-col md:flex-row">
          {/* Images */}
          <div className="w-full md:w-1/2 flex">
            <div className="hidden sm:block w-1/4 space-y-4 my-4">
              {[product.img1, product.img2].map(
                (img, i) =>
                  img && (
                    <Image
                      key={i}
                      src={img}
                      alt={product.name}
                      width={1000}
                      height={1282}
                      onClick={() => setMainImg(img)}
                      className={`cursor-pointer ${
                        mainImg === img
                          ? "border border-gray300"
                          : "opacity-50"
                      }`}
                    />
                  )
              )}
            </div>

            <div className="w-full sm:w-3/4">
              <Swiper slidesPerView={1} loop pagination={{ clickable: true }}>
                {[product.img1, product.img2].map(
                  (img, i) =>
                    img && (
                      <SwiperSlide key={i}>
                        <Image
                          src={img}
                          width={1000}
                          height={1282}
                          alt={product.name}
                        />
                      </SwiperSlide>
                    )
                )}
              </Swiper>
            </div>
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2 py-8 sm:pl-4">
            <h1 className="text-3xl mb-4">{product.name}</h1>

            <span className="text-2xl text-gray400 mb-2 block">
              {product.price.toLocaleString("pt-PT")} MZN
            </span>

            <p className="mb-3">{product.description}</p>

            <p className="mb-2">Disponibilidade: Em stock</p>

            <p className="mb-2">Tamanho: {size}</p>

            <div className="flex space-x-4 mb-4">
              {["S", "M", "L"].map((s) => (
                <div
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-8 h-8 flex items-center justify-center border cursor-pointer ${
                    size === s
                      ? "border-gray500"
                      : "border-gray300 text-gray400"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex border border-gray300">
                <button
                  onClick={() => setCurrentQty(Math.max(1, currentQty - 1))}
                  className="w-12"
                >
                  -
                </button>
                <div className="w-12 text-center">{currentQty}</div>
                <button
                  onClick={() => setCurrentQty(currentQty + 1)}
                  className="w-12"
                >
                  +
                </button>
              </div>

              <Button
                value="Adicionar ao carrinho"
                size="lg"
                onClick={() => addItem?.(currentItem)}
              />

              <GhostButton onClick={handleWishlist}>
                {alreadyWishlisted ? <HeartSolid /> : <Heart />}
              </GhostButton>
            </div>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between border-b py-2">
                    <span>Detalhes</span>
                    <DownArrow
                      extraClass={`${open ? "" : "rotate-180"} w-5 h-5`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-gray400">
                    {product.detail}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <div className="flex gap-4 mt-4">
              <span>Partilhar</span>
              <FacebookLogo />
              <InstagramLogo />
            </div>
          </div>
        </div>

        <div className="border-b-2 border-gray200 my-8" />

        {/* Related */}
        <div className="app-max-width app-x-padding">
          <h2 className="text-3xl mb-6">Também pode gostar</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {products.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const fallbackProduct: itemType = {
    id: 1,
    name: "Produto Indisponível",
    price: 0,
    img1: "/placeholder.png",
    img2: "/placeholder.png",
    categoryName: "geral",
  };

  const baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  let product = fallbackProduct;
  let products: itemType[] = [];

  try {
    const res = await axios.get(
      `${baseURL}/api/v1/products/${params?.id}`
    );

    const data = res.data.data;

    product = {
      id: data.id,
      name: data.name,
      price: data.price,
      img1: data.image1,
      img2: data.image2,
      categoryName: data.category?.name || "geral",
      detail: data.detail,
    };

    const related = await axios.get(
      `${baseURL}/api/v1/products?category=${product.categoryName}`
    );

    products = related.data.data.slice(0, 5).map((p: apiProductsType) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      img1: p.image1,
      img2: p.image2,
    }));
  } catch (error) {
    console.error("Erro ao carregar produto:", error);

    products = Array.from({ length: 4 }).map((_, i) => ({
      ...fallbackProduct,
      id: i + 1,
    }));
  }

  return {
    props: {
      product,
      products,
    },
  };
};

export default Product;
