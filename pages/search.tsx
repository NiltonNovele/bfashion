import { GetServerSideProps } from "next";
import Link from "next/link";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Card from "../components/Card/Card";
import { apiProductsType, itemType } from "../context/cart/cart-types";
import axios from "axios";

type Props = {
  items: itemType[];
  searchWord: string;
};

const Search: React.FC<Props> = ({ items, searchWord }) => {
  return (
    <div>
      {/* ===== Cabeçalho ===== */}
      <Header title="Pesquisa | BFashion" />

      <main id="main-content">
        {/* ===== Navegação (Breadcrumb) ===== */}
        <div className="bg-lightgreen h-16 w-full flex items-center">
          <div className="app-x-padding app-max-width w-full">
            <div className="breadcrumb">
              <Link href="/">
                <a className="text-gray400">Início</a>
              </Link>{" "}
              / <span>Resultados da pesquisa</span>
            </div>
          </div>
        </div>

        {/* ===== Título e informação ===== */}
        <div className="app-x-padding app-max-width w-full mt-8">
          <h1 className="text-3xl mb-2">
            Resultados da pesquisa: &quot;{searchWord}&quot;
          </h1>

          {items.length > 0 && (
            <div className="flex justify-between mt-6">
              <span>
                A mostrar <strong>{items.length}</strong> produto(s)
              </span>
            </div>
          )}
        </div>

        {/* ===== Conteúdo principal ===== */}
        <div className="app-x-padding app-max-width mt-3 mb-14">
          {items.length < 1 ? (
            <div className="flex justify-center items-center h-72 text-gray-500">
              Nenhum resultado encontrado para a sua pesquisa.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
              {items.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ===== Rodapé ===== */}
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { q = "" },
}) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_PROD_BACKEND_URL}/api/v1/products/search?q=${q}`
  );

  const fetchedProducts: apiProductsType[] = res.data.data.map(
    (product: apiProductsType) => ({
      ...product,
      img1: product.image1,
      img2: product.image2,
    })
  );

  return {
    props: {
      items: fetchedProducts,
      searchWord: q,
    },
  };
};

export default Search;
