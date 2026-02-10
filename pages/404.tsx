import Image from "next/image";
import Link from "next/link";

import AppHeader from "../components/Header/AppHeader";

const Custom404 = () => {
  return (
    <>
      <AppHeader title="Página Não Encontrada - Haru Fashion" />
      <div className="flex flex-col h-screen justify-center items-center">
        <h1 className="text-2xl">Página Não Encontrada</h1>
        <Image
          src="/bg-img/404.svg"
          alt="Página 404 Não Encontrada"
          width={400}
          height={300}
        />
        <span className="text-gray400">
          Voltar para a{" "}
          <Link href="/">
            <a className="underline font-bold hover:text-gray500">página inicial</a>
          </Link>
          ?
        </span>
      </div>
    </>
  );
};

export default Custom404;
