import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import axios from "axios";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Buttons/Button";
import Slideshow from "../components/HeroSection/Slideshow";
import OverlayContainer from "../components/OverlayContainer/OverlayContainer";
import Card from "../components/Card/Card";
import TestiSlider from "../components/TestiSlider/TestiSlider";
import { apiProductsType, itemType } from "../context/cart/cart-types";
import LinkButton from "../components/Buttons/LinkButton";

import ourShop from "../public/bg-img/ourshop.png";

type Props = {
  products: itemType[];
};

const Home: React.FC<Props> = ({ products }) => {
  const [currentItems, setCurrentItems] = useState(products);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isFetching) return;

    const fetchData = async () => {
      try {
        const res = await axios.get("/api/products");

        const fetchedProducts = res.data.data.map((product: apiProductsType) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          img1: product.image1,
          img2: product.image2,
          qty: product.qty,
        }));

        setCurrentItems((prev) => [...prev, ...fetchedProducts]);
      } catch (error) {
        console.error("CLIENT FETCH ERROR:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [isFetching]);

  const handleSeemore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsFetching(true);
  };

  return (
    <>
      <Header />
      <Slideshow />

      <main id="main-content" className="-mt-20">
        <section className="w-full h-auto py-10 border border-b-2 border-gray100">
          <div className="app-max-width app-x-padding h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="w-full sm:col-span-2 lg:col-span-2">
              <OverlayContainer
                imgSrc="/bg-img/banner_minipage1.jpg"
                imgSrc2="/bg-img/banner_minipage1-tablet.jpg"
                imgAlt="Novas Chegadas"
              >
                <LinkButton
                  href="/product-category/new-arrivals"
                  extraClass="absolute bottom-10-per sm:right-10-per z-20"
                >
                  Novas Chegadas
                </LinkButton>
              </OverlayContainer>
            </div>

            <div className="w-full">
              <OverlayContainer imgSrc="/bg-img/banner_minipage2.jpg" imgAlt="Coleção Feminina">
                <LinkButton href="/product-category/women" extraClass="absolute bottom-10-per z-20">
                  Coleção Feminina
                </LinkButton>
              </OverlayContainer>
            </div>

            <div className="w-full">
              <OverlayContainer imgSrc="/bg-img/banner_minipage3.jpg" imgAlt="Coleção Masculina">
                <LinkButton href="/product-category/men" extraClass="absolute bottom-10-per z-20">
                  Coleção Masculina
                </LinkButton>
              </OverlayContainer>
            </div>
          </div>
        </section>

        {/* Best Selling */}
        <section className="app-max-width w-full h-full flex flex-col justify-center mt-16 mb-20">
          <div className="flex justify-center">
            <div className="w-3/4 sm:w-1/2 md:w-1/3 text-center mb-8">
              <h2 className="text-3xl mb-4">Mais Vendidos</h2>
              <span>Confira os produtos mais populares entre os nossos clientes</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 lg:gap-x-12 gap-y-6 mb-10 app-x-padding">
            {currentItems.slice(1, 5).map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="w-full hidden h-full py-16 md:flex flex-col items-center bg-lightgreen">
          <h2 className="text-3xl">Testemunhos</h2>
          <TestiSlider />
        </section>

        <section className="app-max-width app-x-padding my-16 flex flex-col">
          <div className="text-center mb-6">
            <h2 className="text-3xl">Produtos em Destaque</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
            {currentItems.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button value={!isFetching ? "Ver Mais" : "A Carregar..."} onClick={handleSeemore} />
          </div>
        </section>

        <div className="border-gray100 border-b-2"></div>

        <section className="app-max-width mt-20 mb-24 flex flex-col items-center text-center">
          <div className="textBox w-full md:w-3/4 lg:w-2/4 mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">A Nossa Loja Online</h2>

            <p className="mb-4">
              A BFashion é uma loja 100% online, criada para lhe oferecer uma experiência
              de compra simples, rápida e segura — onde quer que esteja.
            </p>

            <p className="mb-4">
              Trabalhamos diariamente para trazer as últimas tendências da moda,
              combinando qualidade, estilo e conforto em cada peça.
            </p>

            <p>
              Explore a nossa coleção, escolha os seus favoritos e receba tudo no
              conforto da sua casa, com um atendimento dedicado e confiável.
            </p>
          </div>

          <div className="w-full app-x-padding flex justify-center mt-6">
            <Image src={ourShop} alt="Loja online BFashion" className="rounded-xl shadow-md" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products?order_by=createdAt.desc&limit=10`
    );

    const products: itemType[] = res.data.data.map((product: apiProductsType) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      img1: product.image1,
      img2: product.image2,
    }));

    return {
      props: { products },
    };
  } catch (error) {
    console.error("API ERROR:", error);
    return {
      props: { products: [] },
    };
  }
};

export default Home;
