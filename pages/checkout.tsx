import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Buttons/Button";
import Input from "../components/Input/Input";
import { useCart } from "../context/cart/CartProvider";
import { useAuth } from "../context/AuthContext";
import { itemType } from "../context/wishlist/wishlist-type";
import { roundDecimal } from "../components/Util/utilFunc";

type PaymentType = "CASH_ON_DELIVERY" | "BANK_TRANSFER";
type DeliveryType = "STORE_PICKUP" | "YANGON" | "OTHERS";

type Order = {
  orderNumber: number;
  customerId: number;
  shippingAddress: string;
  township?: null | string;
  city?: null | string;
  state?: null | string;
  zipCode?: null | string;
  orderDate: string;
  paymentType: PaymentType;
  deliveryType: DeliveryType;
  totalPrice: number;
  deliveryDate: string;
};

const ShoppingCart = () => {
  const { cart, clearCart } = useCart();
  const auth = useAuth();

  const [deli, setDeli] = useState<DeliveryType>("STORE_PICKUP");
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>(
    "CASH_ON_DELIVERY"
  );

  // Campos do formulário
  const [name, setName] = useState(auth.user?.fullname || "");
  const [email, setEmail] = useState(auth.user?.email || "");
  const [phone, setPhone] = useState(auth.user?.phone || "");
  const [password, setPassword] = useState("");
  const [diffAddr, setDiffAddr] = useState(false);
  const [address, setAddress] = useState(auth.user?.shippingAddress || "");
  const [shippingAddress, setShippingAddress] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [orderError, setOrderError] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

  const products = cart.map((item) => ({
    id: item.id,
    quantity: item.qty,
  }));

  useEffect(() => {
    if (!isOrdering) return;

    setErrorMsg("");

    const registerUser = async () => {
      if (!auth.user) {
        const regResponse = await auth.register!(
          email,
          name,
          password,
          address,
          phone
        );
        if (!regResponse.success) {
          setIsOrdering(false);
          if (regResponse.message === "alreadyExists") {
            setErrorMsg("O email já existe");
          } else {
            setErrorMsg("Ocorreu um erro ao registar o utilizador");
          }
          return false;
        }
      }
    };

    const makeOrder = async () => {
      if (auth.user) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders`,
            {
              customerId: auth!.user!.id,
              shippingAddress: shippingAddress ? shippingAddress : address,
              totalPrice: subtotal,
              deliveryDate: new Date().setDate(new Date().getDate() + 7),
              paymentType: paymentMethod,
              deliveryType: deli,
              products,
              sendEmail,
            }
          );
          if (res.data.success) {
            setCompletedOrder(res.data.data);
            clearCart!();
            setIsOrdering(false);
          } else {
            setOrderError("Ocorreu um erro ao processar a encomenda");
          }
        } catch (err) {
          setOrderError("Ocorreu um erro ao processar a encomenda");
        }
      }
    };

    registerUser();
    makeOrder();
  }, [isOrdering, auth.user]);

  useEffect(() => {
    if (auth.user) {
      setName(auth.user.fullname);
      setEmail(auth.user.email);
      setAddress(auth.user.shippingAddress || "");
      setPhone(auth.user.phone || "");
    } else {
      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
    }
  }, [auth.user]);

  let disableOrder = true;

  if (!auth.user) {
    disableOrder =
      name !== "" && email !== "" && phone !== "" && address !== "" && password !== ""
        ? false
        : true;
  } else {
    disableOrder =
      name !== "" && email !== "" && phone !== "" && address !== "" ? false : true;
  }

  const subtotal = roundDecimal(
    cart.reduce(
      (acc: number, item: itemType) => acc + item.price * item.qty!,
      0
    )
  );

  let deliFee = 0;
  if (deli === "YANGON") deliFee = 2.0;
  else if (deli === "OTHERS") deliFee = 7.0;

  // Type-safe handlers
  const handleInputChange = (setter: (val: string) => void) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(e.target.value);
  };

  return (
    <div>
      <Header title={`Carrinho de Compras - BFashion`} />

      <main id="main-content">
        <div className="app-max-width px-4 sm:px-8 md:px-20 w-full border-t-2 border-gray100">
          <h1 className="text-2xl sm:text-4xl text-center sm:text-left mt-6 mb-2 animate__animated animate__bounce">
            Finalizar Compra
          </h1>
        </div>

        {!completedOrder ? (
          <div className="app-max-width px-4 sm:px-8 md:px-20 mb-14 flex flex-col lg:flex-row">
            <div className="h-full w-full lg:w-7/12 mr-8">
              {errorMsg && <span className="text-red-600 font-semibold">{errorMsg}</span>}

              <div className="my-4">
                <label className="text-lg">Nome</label>
                <Input
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleInputChange(setName)}
                  required
                  extraClass="w-full mt-1 mb-2"
                  border="border-2 border-gray400"
                />
              </div>

              <div className="my-4">
                <label className="text-lg">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  readOnly={!!auth.user}
                  onChange={handleInputChange(setEmail)}
                  required
                  extraClass={`w-full mt-1 mb-2 ${auth.user ? "bg-gray100 cursor-not-allowed" : ""}`}
                  border="border-2 border-gray400"
                />
              </div>

              {!auth.user && (
                <div className="my-4">
                  <label className="text-lg">Palavra-passe</label>
                  <Input
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    required
                    extraClass="w-full mt-1 mb-2"
                    border="border-2 border-gray400"
                  />
                </div>
              )}

              <div className="my-4">
                <label className="text-lg">Telefone</label>
                <Input
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={handleInputChange(setPhone)}
                  required
                  extraClass="w-full mt-1 mb-2"
                  border="border-2 border-gray400"
                />
              </div>

              <div className="my-4">
                <label className="text-lg">Morada</label>
                <textarea
                  className="w-full mt-1 mb-2 border-2 border-gray400 p-4 outline-none"
                  rows={4}
                  value={address}
                  onChange={handleInputChange(setAddress)}
                />
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={diffAddr}
                  onChange={() => setDiffAddr(!diffAddr)}
                  className="mr-2"
                />
                <span>Utilizar morada de envio diferente</span>
              </div>

              {diffAddr && (
                <div className="my-4">
                  <label>Morada de envio</label>
                  <textarea
                    className="w-full mt-1 mb-2 border-2 border-gray400 p-4 outline-none"
                    rows={4}
                    value={shippingAddress}
                    onChange={handleInputChange(setShippingAddress)}
                  />
                </div>
              )}

              {!auth.user && (
                <div className="text-sm text-gray400 mt-4">
                  Nota: Será criado automaticamente uma conta com os dados fornecidos.
                </div>
              )}
            </div>

            <div className="h-full w-full lg:w-5/12 mt-10 lg:mt-4">
              <div className="border border-gray500 p-6 divide-y-2 divide-gray200">
                <div className="flex justify-between">
                  <span className="text-base uppercase mb-3">Produto</span>
                  <span className="text-base uppercase mb-3">Subtotal</span>
                </div>

                <div className="pt-2">
                  {cart.map((item) => (
                    <div className="flex justify-between mb-2" key={item.id}>
                      <span className="text-base font-medium">
                        {item.name} <span className="text-gray400">x {item.qty}</span>
                      </span>
                      <span className="text-base">MZN {roundDecimal(item.price * item.qty!)}</span>
                    </div>
                  ))}
                </div>

                <div className="py-3 flex justify-between">
                  <span className="uppercase">Subtotal</span>
                  <span>MZN {subtotal}</span>
                </div>

                <div className="py-3">
                  <span className="uppercase">Entrega</span>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <input
                          type="radio"
                          name="deli"
                          value="STORE_PICKUP"
                          checked={deli === "STORE_PICKUP"}
                          onChange={() => setDeli("STORE_PICKUP")}
                        />
                        <label className="ml-2 cursor-pointer">Levantar</label>
                      </div>
                      <span>Grátis</span>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <input
                          type="radio"
                          name="deli"
                          value="YANGON"
                          checked={deli === "YANGON"}
                          onChange={() => setDeli("YANGON")}
                        />
                        <label className="ml-2 cursor-pointer">Dentro de Maputo</label>
                      </div>
                      <span>MZN 200.00</span>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <input
                          type="radio"
                          name="deli"
                          value="OTHERS"
                          checked={deli === "OTHERS"}
                          onChange={() => setDeli("OTHERS")}
                        />
                        <label className="ml-2 cursor-pointer">Outras cidades</label>
                      </div>
                      <span>MZN 700.00</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between py-3">
                  <span className="uppercase">Total Geral</span>
                  <span>MZN {roundDecimal(+subtotal + deliFee)}</span>
                </div>

                <div className="grid gap-4 mt-2 mb-4">
                  <label className="flex flex-col bg-white p-5 rounded-lg shadow-md border border-gray300 cursor-pointer relative">
                    Dinheiro na entrega
                    <input
                      type="radio"
                      name="payment"
                      value="CASH_ON_DELIVERY"
                      className="absolute h-0 w-0"
                      onChange={() => setPaymentMethod("CASH_ON_DELIVERY")}
                    />
                    {paymentMethod === "CASH_ON_DELIVERY" && (
                      <span className="absolute inset-0 border-2 border-gray500 rounded-lg bg-opacity-10"></span>
                    )}
                  </label>

                  <label className="flex flex-col bg-white p-5 rounded-lg shadow-md border border-gray300 cursor-pointer relative">
                    Pagamento seguro online 
                    <span className="text-gray400 text-sm mt-1">
                      MPESA | MKESH | EMOLA | VISA
                    </span>
                    <input
                      type="radio"
                      name="payment"
                      value="BANK_TRANSFER"
                      className="absolute h-0 w-0"
                      onChange={() => setPaymentMethod("BANK_TRANSFER")}
                    />
                    {paymentMethod === "BANK_TRANSFER" && (
                      <span className="absolute inset-0 border-2 border-gray500 rounded-lg bg-opacity-10"></span>
                    )}
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={sendEmail}
                    onChange={() => setSendEmail(!sendEmail)}
                    className="mr-2"
                  />
                  <span>Enviar confirmação de encomenda por email</span>
                </div>

                <Button
                  value="Efetuar Encomenda"
                  size="xl"
                  extraClass="w-full"
                  onClick={() => setIsOrdering(true)}
                  disabled={disableOrder}
                />

                {orderError && <span className="text-red-600">{orderError}</span>}
              </div>
            </div>
          </div>
        ) : (
          <div className="app-max-width px-4 sm:px-8 md:px-20 mb-14 mt-6">
            <div className="text-gray400 text-base">
              Obrigado pela sua encomenda! A sua encomenda foi recebida com sucesso.
            </div>

            <div className="flex flex-col md:flex-row mt-4">
              <div className="w-full md:w-1/2 border border-gray500 p-6 divide-y-2 divide-gray200">
                <div className="flex justify-between">
                  <span className="uppercase">Número da Encomenda</span>
                  <span>{completedOrder?.orderNumber}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Email</span>
                  <span>{auth.user?.email}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Data da Encomenda</span>
                  <span>{new Date(completedOrder!.orderDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Data de Entrega</span>
                  <span>{new Date(completedOrder!.deliveryDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Método de Pagamento</span>
                  <span>{completedOrder?.paymentType === "CASH_ON_DELIVERY" ? "Dinheiro na Entrega" : "Transferência Bancária"}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Método de Entrega</span>
                  <span>
                    {completedOrder?.deliveryType === "STORE_PICKUP"
                      ? "Levantar na Loja"
                      : completedOrder?.deliveryType === "YANGON"
                      ? "Dentro de Yangon"
                      : "Outras Cidades"}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="uppercase">Total</span>
                  <span>MZN {completedOrder?.totalPrice}</span>
                </div>
              </div>

              <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-8 flex justify-center items-center">
                {completedOrder?.paymentType === "BANK_TRANSFER" ? (
                  <div>
                    <h2 className="text-xl font-bold mb-2">Detalhes Bancários</h2>
                    <div className="flex justify-between w-full">
                      <span>Sat Naing - AYA Bank</span>
                      <span>20012345678</span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span>CB Bank</span>
                      <span>0010123456780959</span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span>KPay</span>
                      <span>095096051</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-3/4">
                    <Image
                      src="/logo.svg"
                      alt="BFashion"
                      width={220}
                      height={50}
                      layout="responsive"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ShoppingCart;
