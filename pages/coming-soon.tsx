import Image from "next/image";
import Link from "next/link";
import { Instagram, ShoppingBag } from "lucide-react"; // Lucide Instagram icon

import AppHeader from "../components/Header/AppHeader";

const ComingSoon = () => {
  return (
    <>
      <AppHeader title="BFashion - Em Breve!" />
      <div className="flex flex-col h-screen justify-center items-center bg-gray-50 px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-wider mb-4 text-gray-800">
          Seção em Construção
        </h1>
        <h2 className="text-xl text-gray-600 mb-6 max-w-md">
          Esta secção ainda não está disponível e encontra-se em construção. Estamos a preparar conteúdos relevantes e novidades para si!
        </h2>

        <Image
          src="/bg-img/coding.svg"
          alt="Em construção"
          width={400}
          height={300}
          className="mb-6"
        />

        <p className="text-gray-500 mb-6 max-w-sm">
          Fique atento(a) às atualizações e novidades seguindo a nossa página no Instagram para mais detalhes.
        </p>

        {/* Visit Instagram button with Lucide icon */}
        <Link href="https://www.instagram.com/bfashion">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors mb-4 flex items-center gap-2"
          >
            <Instagram size={20} />
            Visite o nosso Instagram
          </a>
        </Link>

        {/* BFashion Store link */}
        {/* <Link href="/">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors mb-4 flex items-center gap-2"
          >
            Loja BFashion
            <ShoppingBag size={20} />
          </a>
        </Link> */}

        <Link href="/">
          <a className="underline font-bold text-gray-600 hover:text-gray-800 mt-2">
            Voltar à página inicial
          </a>
        </Link>
      </div>
    </>
  );
};

export default ComingSoon;
