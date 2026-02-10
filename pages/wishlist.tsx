import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LeftArrow from "../public/icons/LeftArrow";
import Button from "../components/Buttons/Button";
import GhostButton from "../components/Buttons/GhostButton";
import { useCart } from "../context/cart/CartProvider";
import { useWishlist } from "../context/wishlist/WishlistProvider";

const Wishlist = () => {
  const { addOne } = useCart();
  const { wishlist, deleteWishlistItem, clearWishlist } = useWishlist();

  let subtotal = 0;

  return (
    <div>
      {/* ===== Cabeçalho ===== */}
      <Header title="Lista de Desejos - BFashion" />

      <main id="main-content">
        {/* ===== Título & Voltar ===== */}
        <div className="app-max-width px-4 sm:px-8 md:px-20 w-full border-t-2 border-gray100">
          <h1 className="text-2xl sm:text-4xl text-center sm:text-left mt-6 mb-2 animate__animated animate__bounce">
            Lista de Desejos
          </h1>

          <div className="mt-6 mb-3">
            <Link href="/">
              <a className="inline-block">
                <LeftArrow size="sm" extraClass="inline-block" /> Continuar a comprar
              </a>
            </Link>
          </div>
        </div>

        {/* ===== Lista de Produtos ===== */}
        <div className="app-max-width px-4 sm:px-8 md:px-20 mb-14 flex flex-col lg:flex-row">
          <div className="h-full w-full">
            <table className="w-full mb-6">
              <thead>
                <tr className="border-t-2 border-b-2 border-gray200">
                  <th className="font-normal hidden md:table-cell text-left sm:text-center py-2 xl:w-72">
                    Imagem
                  </th>
                  <th className="font-normal hidden md:table-cell text-left sm:text-center py-2 xl:w-72">
                    Produto
                  </th>
                  <th className="font-normal md:hidden text-left sm:text-center py-2 xl:w-72">
                    Detalhes
                  </th>
                  <th className="font-normal py-2 text-right">
                    Preço
                  </th>
                  <th className="font-normal hidden sm:table-cell py-2 max-w-xs">
                    Adicionar
                  </th>
                  <th className="font-normal hidden sm:table-cell py-2 text-right w-10">
                    Remover
                  </th>
                  <th className="font-normal sm:hidden py-2 text-right w-10">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {wishlist.length === 0 ? (
                  <tr className="w-full text-center h-60 border-b-2 border-gray200">
                    <td colSpan={5}>A sua lista de desejos está vazia</td>
                  </tr>
                ) : (
                  wishlist.map((item) => {
                    subtotal += item.price * item.qty!;
                    return (
                      <tr className="border-b-2 border-gray200" key={item.id}>
                        <td className="my-3 flex justify-center flex-col items-start sm:items-center">
                          <Link href={`/products/${encodeURIComponent(item.id)}`}>
                            <a>
                              <Image
                                src={item.img1 as string}
                                alt={item.name}
                                width={95}
                                height={128}
                                className="h-32 xl:mr-4"
                              />
                            </a>
                          </Link>
                          <span className="text-xs md:hidden">
                            {item.name}
                          </span>
                        </td>

                        <td className="text-center hidden md:table-cell">
                          {item.name}
                        </td>

                        <td className="text-right text-gray400">
                          {item.price} MZN
                        </td>

                        <td className="text-center hidden sm:table-cell max-w-xs text-gray400">
                          <Button
                            value="Adicionar ao carrinho"
                            extraClass="hidden sm:block m-auto"
                            onClick={() => addOne!(item)}
                          />
                        </td>

                        <td className="text-right pl-8" style={{ minWidth: "3rem" }}>
                          <Button
                            value="Adicionar"
                            onClick={() => addOne!(item)}
                            extraClass="sm:hidden mb-4 whitespace-nowrap"
                          />
                          <button
                            onClick={() => deleteWishlistItem!(item)}
                            type="button"
                            className="outline-none text-gray300 hover:text-gray500 focus:outline-none text-4xl sm:text-2xl"
                          >
                            &#10005;
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            <div>
              <GhostButton
                onClick={clearWishlist}
                extraClass="w-full sm:w-48 whitespace-nowrap"
              >
                Limpar desejos
              </GhostButton>
            </div>
          </div>
        </div>
      </main>

      {/* ===== Rodapé ===== */}
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Wishlist;
