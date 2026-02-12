import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import axios from "axios";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Buttons/Button";
import VideoNewsCarousel from "../components/VideoNewsCarousel/VideoNewsCarousel";
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
        <section className="w-full h-auto py-14 border-b border-gray-200 bg-white">
  <div className="app-max-width app-x-padding h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    
    {/* NEW ARRIVALS (FEATURED) */}
    <div className="w-full sm:col-span-2 lg:col-span-2 group">
      <div className="relative overflow-hidden rounded-2xl shadow-md">
        <OverlayContainer
          imgSrc="/new.jpg"
          imgSrc2="/new.jpg"
          imgAlt="Novas Chegadas"
        >
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-all duration-300" />
          
          <LinkButton
            href="/product-category/new-arrivals"
            extraClass="absolute bottom-8 left-8 z-20 group-hover:scale-105 transition-transform"
          >
            Novas Chegadas
          </LinkButton>
        </OverlayContainer>
      </div>
    </div>

    {/* WOMEN (NOW WIDER) */}
    <div className="w-full sm:col-span-2 lg:col-span-2 group">
      <div className="relative overflow-hidden rounded-2xl shadow-md">
        <OverlayContainer imgSrc="/female.jpg" imgAlt="Coleção Feminina">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />

          <LinkButton
            href="/product-category/women"
            extraClass="absolute bottom-8 left-8 z-20 group-hover:scale-105 transition-transform"
          >
            Coleção Feminina
          </LinkButton>
        </OverlayContainer>
      </div>
    </div>

    {/* MALE (KEEP COMMENTED) */}
    {/*
    <div className="w-full group">
      <div className="relative overflow-hidden rounded-2xl shadow-md">
        <OverlayContainer imgSrc="/male.webp" imgAlt="Coleção Masculina">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />

          <LinkButton
            href="/product-category/men"
            extraClass="absolute bottom-6 left-6 z-20 group-hover:scale-105 transition-transform"
          >
            Coleção Masculina
          </LinkButton>
        </OverlayContainer>
      </div>
    </div>
    */}
    
  </div>
</section>



        {/*carousel*/}
        <VideoNewsCarousel />


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
      
      {/* Floating WhatsApp Button */}
<a
  href="https://wa.link/k92vbs"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-green fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-3 py-2 rounded-full shadow-md transition-all duration-300"
>
  {/* WhatsApp SVG icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.52 3.48A11.78 11.78 0 0 0 12.04 0C5.4 0 .02 5.38.02 12c0 2.12.55 4.19 1.6 6.02L0 24l6.2-1.62A11.93 11.93 0 0 0 12.04 24c6.63 0 12.02-5.38 12.02-12 0-3.2-1.25-6.21-3.54-8.52zM12.04 21.8c-1.84 0-3.64-.5-5.2-1.44l-.37-.22-3.68.96.98-3.58-.24-.37A9.74 9.74 0 0 1 2.3 12c0-5.37 4.37-9.74 9.74-9.74 2.6 0 5.04 1.01 6.88 2.86A9.66 9.66 0 0 1 21.78 12c0 5.37-4.37 9.8-9.74 9.8zm5.35-7.33c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.21-.45-2.3-1.44-.85-.76-1.42-1.7-1.58-1.99-.17-.29-.02-.45.12-.6.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36s-1 1-.98 2.43c.02 1.43 1.03 2.8 1.18 2.99.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.63.61.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
  </svg>

  <span className="text-xs font-medium">
    Fale connosco
  </span>
</a>


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
