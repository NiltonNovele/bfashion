import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";


import Button from "../components/Buttons/Button";

export default function Success() {
  useEffect(() => {
  const saved = localStorage.getItem("bfashion_checkout");
  if (!saved) return;

  const orderData = JSON.parse(saved);

  fetch("http://localhost:5009/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  localStorage.removeItem("bfashion_checkout");
}, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow app-max-width px-4 sm:px-8 md:px-20 py-16 border-t-2 border-gray100">
        <div className="max-w-xl mx-auto text-center border border-gray200 rounded-2xl p-10 shadow-sm">
          
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-prev.png"
              alt="BFashion"
              width={140}
              height={40}
            />
          </div>

          <h1 className="text-3xl font-semibold mb-4">
            Pagamento efectuado com sucesso 🎉
          </h1>

          <p className="text-gray500 mb-8">
            Obrigado pela sua compra. O seu pedido foi registado e será
            processado em breve.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                value="Voltar à página inicial"
                size="lg"
                extraClass="w-full sm:w-auto"
              />
            </Link>

            <Link href="/shop">
              <Button
                value="Ver mais artigos"
                size="lg"
                extraClass="w-full sm:w-auto bg-black text-white"
              />
            </Link>
          </div>
        </div>

        {/* Developer credit */}
        <div className="text-center mt-8 text-sm text-gray400 flex items-center justify-center gap-2">
  <BadgeCheck size={16} className="opacity-70" />
  Desenvolvido pela{" "}
  <a
    href="https://synctechx.com"
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium hover:text-gray600 transition-colors"
  >
    SynctechX
  </a>
</div>
      </main>
    </div> 
  );
}
