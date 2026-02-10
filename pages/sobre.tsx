import React from "react";
import Image from "next/image";
import { GetStaticProps } from "next";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import OverlayContainer from "../components/OverlayContainer/OverlayContainer";
import Button from "../components/Buttons/Button";
import Input from "../components/Input/Input";

import aboutHero from "../public/og.png";
import ceo1 from "../public/bander.png";
import ceo2 from "../public/bibi.png";

const Sobre = () => {
  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh]">
        <OverlayContainer
          imgSrc="/og1.png"
          imgAlt="Sobre a BFashion"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 bg-black/40">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              Sobre a BFashion
            </h1>
            <p className="max-w-2xl text-lg">
              Moda que inspira confiança, estilo e autenticidade.
            </p>
          </div>
        </OverlayContainer>
      </section>

      <main className="app-max-width app-x-padding my-20">
        {/* SOBRE A MARCA */}
        <section className="text-center mb-20">
          <h2 className="text-3xl mb-6">Quem Somos</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-4">
            A <strong>BFashion</strong> é uma loja online criada com o propósito
            de tornar a moda acessível, moderna e cheia de personalidade.
            Trabalhamos diariamente para oferecer peças que combinam conforto,
            qualidade e elegância.
          </p>
          <p className="max-w-3xl mx-auto text-gray-600">
            Acreditamos que a moda é uma forma de expressão e que cada pessoa
            merece sentir-se confiante no que veste — em qualquer ocasião.
          </p>
        </section>

        {/* MISSÃO / VISÃO / VALORES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          <div className="p-6 border rounded-xl shadow-sm text-center">
            <h3 className="text-xl mb-4 font-semibold">Missão</h3>
            <p className="text-gray-600">
              Proporcionar uma experiência de compra simples, segura e moderna,
              oferecendo produtos de qualidade que valorizam o estilo pessoal
              de cada cliente.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm text-center">
            <h3 className="text-xl mb-4 font-semibold">Visão</h3>
            <p className="text-gray-600">
              Tornar-se uma referência nacional no comércio online de moda,
              reconhecida pela confiança, inovação e proximidade com o cliente.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm text-center">
            <h3 className="text-xl mb-4 font-semibold">Valores</h3>
            <p className="text-gray-600">
              Qualidade, transparência, compromisso, criatividade e respeito
              pelos nossos clientes.
            </p>
          </div>
        </section>

        {/* FUNDADORES */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl">Fundadores</h2>
            <p className="text-gray-600 mt-2">
              As mentes por trás da BFashion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* CEO 1 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src={ceo1}
                alt="Bander Artista"
                className="rounded-xl shadow-md"
              />
              <h3 className="text-xl mt-4 font-semibold">Bander Artista</h3>
              <span className="text-gray-500 mb-3">CEO & Co-Fundador</span>
              <p className="text-gray-600 max-w-md">
                Visionário e apaixonado por moda, lidera a BFashion com foco em
                inovação, qualidade e crescimento sustentável.
              </p>
            </div>

            {/* CEO 2 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src={ceo2}
                alt="Bibi Daude"
                className="rounded-xl shadow-md"
              />
              <h3 className="text-xl mt-4 font-semibold">Bibi Daude</h3>
              <span className="text-gray-500 mb-3">CEO & Co-Fundadora</span>
              <p className="text-gray-600 max-w-md">
                Responsável pela identidade da marca, comunicação e experiência
                do cliente, garantindo autenticidade em cada detalhe.
              </p>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="text-center py-20 bg-lightgreen rounded-2xl px-6">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-4xl font-semibold mb-4">
      Junte-se à Nossa Comunidade
    </h2>

    <p className="text-gray-700 mb-10">
      Descubra as últimas tendências, novidades exclusivas e uma nova forma
      de viver a moda.
    </p>

    {/* NEWSLETTER CARD */}
    <div className="bg-white shadow-md rounded-2xl p-8">
      <h4 className="text-2xl font-semibold mb-2">Newsletter</h4>

      <p className="text-gray-600 mb-6">
        Seja o primeiro a saber sobre novas chegadas, promoções e descontos.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Input
          label="Email"
          name="email"
          type="email"
          extraClass="w-full sm:w-80"
        />

        <Button
          size="lg"
          value="Subscrever"
          extraClass="w-full sm:w-auto tracking-wider"
        />
      </div>
    </div>
  </div>
</section>

      </main>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: {
        ...require(`../messages/common/${locale}.json`),
      },
    },
  };
};

export default Sobre;
