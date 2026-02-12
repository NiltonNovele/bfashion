import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import LeftArrow from "../../public/icons/LeftArrow";
import RightArrow from "../../public/icons/RightArrow";

const testemunhos = [
  {
    texto:
      "Adorei a qualidade dos produtos! A entrega foi rápida e o atendimento excelente. Recomendo vivamente a BFashion.",
    nome: "Ana Martins",
    profissao: "Influenciadora Digital",
    imagem: "/2.png",
  },
  {
    texto:
      "A experiência de compra foi incrível. Produtos elegantes e de ótima qualidade. Voltarei a comprar!",
    nome: "Carla Mendes",
    profissao: "Estilista",
    imagem: "/3.png",
  },
  {
    texto:
      "A BFashion superou as minhas expectativas. Ótimos preços, bom atendimento e envio rápido.",
    nome: "Juliana Costa",
    profissao: "Empreendedora",
    imagem: "/1.jpeg",
  },
];

const TestiSlider: FC = () => {
  const [indexAtual, setIndexAtual] = useState(0);
  const [animacao, setAnimacao] = useState("animate__fadeInRight");

  const handleNext = useCallback(() => {
    setIndexAtual((prev) =>
      prev === testemunhos.length - 1 ? 0 : prev + 1
    );
    setAnimacao("animate__fadeInRight");
  }, []);

  const handlePrev = () => {
    setIndexAtual((prev) =>
      prev === 0 ? testemunhos.length - 1 : prev - 1
    );
    setAnimacao("animate__fadeInLeft");
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="relative w-full flex justify-center my-16 overflow-hidden">
      <div className="w-full max-w-5xl flex justify-center px-4">
        {testemunhos.map(
          (item, index) =>
            index === indexAtual && (
              <div
                key={item.nome}
                className={`flex flex-col md:flex-row items-center gap-8 bg-white shadow-lg rounded-2xl p-8 animate__animated ${animacao}`}
              >
                {/* IMAGEM */}
                <div className="relative w-40 h-56 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={item.imagem}
                    alt={item.nome}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                {/* TEXTO */}
                <div className="flex flex-col text-center md:text-left">
                  <p className="text-gray-600 italic mb-5 max-w-md leading-relaxed">
                    “{item.texto}”
                  </p>

                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.nome}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {item.profissao}
                  </span>
                </div>
              </div>
            )
        )}
      </div>

      {/* Botão anterior */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
        aria-label="Anterior"
      >
        <LeftArrow />
      </button>

      {/* Botão seguinte */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
        aria-label="Seguinte"
      >
        <RightArrow />
      </button>
    </div>
  );
};

export default TestiSlider;
