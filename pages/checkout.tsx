import { useState, ChangeEvent } from "react";
import Image from "next/image";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Buttons/Button";
import Input from "../components/Input/Input";
import { useCart } from "../context/cart/CartProvider";
import { itemType } from "../context/wishlist/wishlist-type";
import { roundDecimal } from "../components/Util/utilFunc";

type DeliveryType = "LEVANTAMENTO" | "MAPUTO" | "OTHERS";

const ShoppingCart = () => {
  const { cart } = useCart();

  const [deli, setDeli] = useState<DeliveryType>("LEVANTAMENTO");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ---------- NUMERIC SUBTOTAL ---------- */
  const subtotalNumber = cart.reduce(
    (acc: number, item: itemType) => acc + item.price * item.qty!,
    0
  );

  let deliFee = 0;
  if (deli === "MAPUTO") deliFee = 0;
  else if (deli === "OTHERS") deliFee = 700;

  const totalNumber = subtotalNumber + deliFee;

  // ---------- FIXED INPUT HANDLER ----------
  const handleInputChange =
    (setter: (val: string) => void) =>
    (e: ChangeEvent<any>) => {
      // cast target to HTMLInputElement | HTMLTextAreaElement
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      setter(target.value);
    };

  const canProceed =
    name !== "" && email !== "" && phone !== "" && address !== "";

  const handleCheckout = async () => {
    if (!canProceed) return;

    try {
      const res = await fetch("https://api.bfashion.sale/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total: Math.round(totalNumber),
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        console.error("Server error:", text);
        return;
      }

      const data = JSON.parse(text);

      /* ---------- SAVE ORDER LOCALLY ---------- */
      localStorage.setItem(
        "bfashion_checkout",
        JSON.stringify({
          name,
          email,
          phone,
          address,
          deliveryType: deli,
          total: totalNumber,
          cart,
        })
      );

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  return (
    <div>
      <Header title="Checkout - BFashion" />

      <main className="app-max-width px-4 sm:px-8 md:px-20 w-full border-t-2 border-gray100">
        <h1 className="text-3xl mt-6 mb-6">Finalizar Compra</h1>

        {!isSubmitted ? (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* FORM */}
            <div className="w-full lg:w-7/12">
              <div className="my-4">
                <label>Nome completo</label>
                <Input
                  name="name"
                  type="text"
                  value={name}
                  extraClass="w-full mt-2"
                  border="border-2 border-gray400"
                  onChange={handleInputChange(setName)}
                />
              </div>

              <div className="my-4">
                <label>Email</label>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  extraClass="w-full mt-2"
                  border="border-2 border-gray400"
                  onChange={handleInputChange(setEmail)}
                />
              </div>

              <div className="my-4">
                <label>Telefone</label>
                <Input
                  name="phone"
                  type="text"
                  value={phone}
                  extraClass="w-full mt-2"
                  border="border-2 border-gray400"
                  onChange={handleInputChange(setPhone)}
                />
              </div>

              <div className="my-4">
                <label>Morada de entrega</label>
                <textarea
                  className="w-full mt-2 border-2 border-gray400 p-4"
                  rows={4}
                  value={address}
                  onChange={handleInputChange(setAddress)}
                />
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="w-full lg:w-5/12">
              <div className="border border-gray500 p-6 divide-y-2 divide-gray200">
                <div className="flex justify-between">
                  <span>Produto</span>
                  <span>Subtotal</span>
                </div>

                <div className="pt-2">
                  {cart.map((item) => (
                    <div className="flex justify-between mb-2" key={item.id}>
                      <span>
                        {item.name} x {item.qty}
                      </span>
                      <span>
                        MZN {roundDecimal(item.price * item.qty!)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="py-3 flex justify-between">
                  <span>Subtotal</span>
                  <span>MZN {roundDecimal(subtotalNumber)}</span>
                </div>

                {/* DELIVERY */}
                <div className="py-3">
                  <span>Entrega</span>
                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between">
                      <label>
                        <input
                          type="radio"
                          checked={deli === "LEVANTAMENTO"}
                          onChange={() => setDeli("LEVANTAMENTO")}
                        />
                        <span className="ml-2">Levantar</span>
                      </label>
                      <span>Grátis</span>
                    </div>

                    <div className="flex justify-between">
                      <label>
                        <input
                          type="radio"
                          checked={deli === "MAPUTO"}
                          onChange={() => setDeli("MAPUTO")}
                        />
                        <span className="ml-2">Entrega em Maputo</span>
                      </label>
                      <span>Grátis</span>
                    </div>

                    <div className="flex justify-between">
                      <label>
                        <input
                          type="radio"
                          checked={deli === "OTHERS"}
                          onChange={() => setDeli("OTHERS")}
                        />
                        <span className="ml-2">OutrasCidades</span>
                      </label>
                      <span>MZN 700</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between py-3 text-lg font-semibold">
                  <span>Total</span>
                  <span>MZN {roundDecimal(totalNumber)}</span>
                </div>

                {/* PAYMENT */}
                <div className="py-3">
                  <span className="font-medium">Pagamento</span>
                  <div className="border rounded-lg p-4 mt-2">
                    MPESA | MKESH | EMOLA
                  </div>
                </div>

                <Button
                  value="Prosseguir para pagamento"
                  size="xl"
                  extraClass="w-full"
                  onClick={handleCheckout}
                  disabled={!canProceed}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">
              Dados confirmados
            </h2>
            <p className="text-gray400 mb-6">
              Próximo passo: integração do pagamento.
            </p>

            <Image
              src="/logo-prev.png"
              alt="BFashion"
              width={140}
              height={40}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ShoppingCart;
