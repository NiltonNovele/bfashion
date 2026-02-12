import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Printer } from "lucide-react";
import Button from "../components/Buttons/Button";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  img1?: string;
};

type OrderData = {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  address?: string;
  total?: number;
  items?: OrderItem[];
  cartItems?: OrderItem[]; // fallback support
};

export default function Success() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("bfashion_checkout");
    if (!saved) return;

    const parsed: OrderData = JSON.parse(saved);

    // Support both items and cartItems
    const extractedItems = parsed.items || parsed.cartItems || [];

    setOrder(parsed);
    setItems(extractedItems);

    fetch("https://api.bfashion.sale/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    }).catch(() => {});

    localStorage.removeItem("bfashion_checkout");
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>A carregar recibo...</p>
      </div>
    );
  }

  const total =
    order.total ??
    items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white print:bg-white">
      <main className="flex-grow app-max-width px-4 sm:px-8 md:px-20 py-16 border-t-2 border-gray100">
        <div className="max-w-2xl mx-auto border border-gray200 rounded-2xl p-8 shadow-sm print:shadow-none print:border-none">
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-prev.png"
              alt="BFashion"
              width={140}
              height={40}
            />
          </div>

          {/* Success Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold mb-2">
              Pagamento efectuado com sucesso 🎉
            </h1>
            <p className="text-gray500">
              Status do Pedido:{" "}
              <span className="font-semibold text-green-600">Pago</span>
            </p>
            <p className="text-sm text-gray400 mt-2">
              ⚠️ Tire um screenshot deste recibo para sua segurança.
            </p>
          </div>

          {/* Customer Info */}
          <div className="mb-6 border-b pb-4">
            <h2 className="font-semibold mb-2">Informações do Cliente</h2>
            <p><strong>Nome:</strong> {order.customerName || "-"}</p>
            <p><strong>Email:</strong> {order.customerEmail || "-"}</p>
            <p><strong>Telefone:</strong> {order.customerPhone || "-"}</p>
            <p><strong>Morada:</strong> {order.address || "-"}</p>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h2 className="font-semibold mb-4">Itens Comprados</h2>

            {items.length === 0 ? (
              <p className="text-gray500">Nenhum item encontrado.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray500">
                        Quantidade: {item.qty}
                      </p>
                    </div>

                    <p className="font-semibold">
                      {(item.price * item.qty).toFixed(2)}€
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between text-lg font-semibold border-t pt-4">
            <span>Total Pago</span>
            <span>{total.toFixed(2)}MZN</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              <Printer size={18} />
              Imprimir Recibo
            </button>

            <Link href="/">
              <Button value="Voltar à Página Inicial" size="lg" />
            </Link>
          </div>
        </div>

        {/* Developer credit */}
        <div className="text-center mt-8 text-sm text-gray400 flex items-center justify-center gap-2 print:hidden">
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
