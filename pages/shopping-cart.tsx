import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LeftArrow from "../public/icons/LeftArrow";
import Button from "../components/Buttons/Button";
import GhostButton from "../components/Buttons/GhostButton";
import { GetStaticProps } from "next";
import { roundDecimal } from "../components/Util/utilFunc";
import { useCart } from "../context/cart/CartProvider";
import { useRouter } from "next/router";

const ShoppingCart = () => {
  const router = useRouter();
  const [deli, setDeli] = useState("Maputo");
  const { cart, addOne, removeItem, deleteItem, clearCart } = useCart();

  let subtotal = 0;

  // DELIVERY PRICES
  const deliveryPrices: Record<string, number> = {
    Maputo: 0,
    Gaza: 350,
    Inhambane: 350,
    Sofala: 450,
    Manica: 450,
    Tete: 550,
    Zambézia: 550,
    Nampula: 600,
    "Cabo Delgado": 650,
    Niassa: 700,
  };

  const deliFee = deliveryPrices[deli] ?? 0;

  return (
    <div>
      {/* ===== Cabeçalho ===== */}
      <Header title="Carrinho de Compras - BFashion" />

      <main id="main-content">
        {/* ===== Título e voltar ===== */}
        <div className="app-max-width px-4 sm:px-8 md:px-20 w-full border-t-2 border-gray100">
          <h1 className="text-2xl sm:text-4xl text-center sm:text-left mt-6 mb-2 animate__animated animate__bounce">
            Carrinho de Compras
          </h1>

          <div className="mt-6 mb-3">
            <Link href="/">
              <a className="inline-block">
                <LeftArrow size="sm" extraClass="inline-block" /> Continuar a comprar
              </a>
            </Link>
          </div>
        </div>

        {/* ===== Conteúdo do Carrinho ===== */}
        <div className="app-max-width px-4 sm:px-8 md:px-20 mb-14 flex flex-col lg:flex-row">
          {/* Produtos */}
          <div className="h-full w-full lg:w-4/6 mr-4">
            <table className="w-full mb-6">
              <thead>
                <tr className="border-t-2 border-b-2 border-gray200">
                  <th className="font-normal text-left sm:text-center py-2 xl:w-72">
                    Detalhes do Produto
                  </th>
                  <th className="font-normal py-2 hidden sm:block text-right">
                    Preço Unitário
                  </th>
                  <th className="font-normal py-2">Quantidade</th>
                  <th className="font-normal py-2 text-right">Total</th>
                  <th
                    className="font-normal py-2 text-right"
                    style={{ minWidth: "3rem" }}
                  ></th>
                </tr>
              </thead>

              <tbody>
                {cart.length === 0 ? (
                  <tr className="w-full text-center h-60 border-b-2 border-gray200">
                    <td colSpan={5}>O seu carrinho está vazio</td>
                  </tr>
                ) : (
                  cart.map((item) => {
                    subtotal += item.price * item.qty!;
                    return (
                      <tr className="border-b-2 border-gray200" key={item.id}>
                        <td className="my-3 flex flex-col xl:flex-row items-start sm:items-center xl:space-x-2 text-center xl:text-left">
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
                          <span>{item.name}</span>
                        </td>

                        <td className="text-right text-gray400 hidden sm:table-cell">
                          MZN {roundDecimal(item.price)}
                        </td>

                        <td>
                          <div className="w-12 h-32 sm:h-auto sm:w-3/4 md:w-2/6 mx-auto flex flex-col-reverse sm:flex-row border border-gray300 sm:divide-x-2 divide-gray300">
                            <div
                              onClick={() => removeItem!(item)}
                              className="h-full w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100"
                            >
                              −
                            </div>
                            <div className="h-full w-12 flex justify-center items-center pointer-events-none">
                              {item.qty}
                            </div>
                            <div
                              onClick={() => addOne!(item)}
                              className="h-full w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100"
                            >
                              +
                            </div>
                          </div>
                        </td>

                        <td className="text-right text-gray400">
                          MZN {roundDecimal(item.price * item.qty!)}
                          <br />
                          <span className="text-xs">
                            (MZN {roundDecimal(item.price)})
                          </span>
                        </td>

                        <td className="text-right" style={{ minWidth: "3rem" }}>
                          <button
                            onClick={() => deleteItem!(item)}
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

            <GhostButton
              onClick={clearCart}
              extraClass="hidden sm:inline-block"
            >
              Limpar carrinho
            </GhostButton>
          </div>

          {/* Resumo */}
          <div className="h-full w-full lg:w-4/12 mt-10 lg:mt-0">
            <div className="border border-gray500 divide-y-2 divide-gray200 p-6">
              <h2 className="text-xl mb-3">Resumo do Carrinho</h2>

              <div className="flex justify-between py-2">
                <span className="uppercase">Subtotal</span>
                <span>MZN {roundDecimal(subtotal)}</span>
              </div>

              {/* <div className="py-3">
                <span className="uppercase">Entrega</span>

                <div className="mt-3 space-y-2">
                  <div className="space-y-3 border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Entrega por província</h4>

                    {Object.entries(deliveryPrices).map(([name, price]) => (
                      <div key={name} className="flex justify-between items-center">
                        <label className="cursor-pointer flex items-center gap-2">
                          <input
                            type="radio"
                            name="deli"
                            checked={deli === name}
                            onChange={() => setDeli(name)}
                          />
                          {name}
                        </label>

                        <span className="font-medium">
                          {price === 0 ? "Grátis" : `MZN ${price.toFixed(2)}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}

              <div className="flex justify-between py-3">
                <span>Total</span>
                <span>MZN {roundDecimal(subtotal + deliFee)}</span>
              </div>

              <Button
                value="Finalizar Compra"
                size="xl"
                extraClass="w-full"
                onClick={() => router.push(`/checkout`)}
                disabled={cart.length < 1}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default ShoppingCart;
