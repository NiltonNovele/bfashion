import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { roundDecimal } from "../components/Util/utilFunc";
import { Package, User, Truck, Filter } from "lucide-react";

type OrderType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryType: string;
  total: number;
  cart: any[];
  status: string;
  createdAt: string;
};

const statusOptions = [
  "Recebido",
  "Em processamento",
  "Sem stock",
  "Cancelado",
  "Enviado",
  "Entregue",
  "Completo",
];

const statusStyles: Record<string, string> = {
  Recebido: "bg-blue-50 text-blue-700 border-blue-200",
  "Em processamento": "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Sem stock": "bg-orange-50 text-orange-700 border-orange-200",
  Cancelado: "bg-red-50 text-red-700 border-red-200",
  Enviado: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Entregue: "bg-green-50 text-green-700 border-green-200",
  Completo: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function Orders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("Todos");

  const loadOrders = async () => {
    const res = await fetch("https://api.bfashion.sale/api/orders");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`https://api.bfashion.sale/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    loadOrders();
  };

  const filteredOrders =
    filterStatus === "Todos"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  // ---------- STATUS CARD DATA ----------
  const statusCounts: Record<string, number> = {};
  statusOptions.forEach((status) => {
    statusCounts[status] = orders.filter((o) => o.status === status).length;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Encomendas - BFashion" />

      <main className="app-max-width px-6 md:px-20 py-8 flex-grow">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-semibold">Gestão de Encomendas</h1>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {filteredOrders.length} encomendas
            </div>

            <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg">
              <Filter size={16} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-sm outline-none bg-transparent"
              >
                <option>Todos</option>
                {statusOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* STATUS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {statusOptions.map((status) => (
            <div
              key={status}
              className={`flex flex-col p-4 rounded-xl border ${statusStyles[status]} bg-opacity-20`}
            >
              <span className="text-xs font-semibold text-gray-500">
                {status}
              </span>
              <span className="text-2xl font-bold mt-1">
                {statusCounts[status]}
              </span>
            </div>
          ))}
        </div>

        {/* ORDERS GRID */}
        {loading ? (
          <p>A carregar encomendas...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
              >
                {/* TOP */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <Package size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Encomenda</p>
                      <p className="text-xs text-gray-500 truncate">
                        {order._id}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full border font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* CUSTOMER & DELIVERY */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <User size={14} />
                      <span className="font-medium">Cliente</span>
                    </div>
                    <p>{order.name}</p>
                    <p className="text-gray-500">{order.phone}</p>
                    <p className="text-gray-500 truncate">{order.email}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Truck size={14} />
                      <span className="font-medium">Entrega</span>
                    </div>
                    <p className="truncate">{order.address}</p>
                    <p className="text-gray-500">{order.deliveryType}</p>
                  </div>
                </div>

                {/* PRODUCTS */}
                <div className="border-t pt-3 text-xs space-y-2 mb-3">
                  {order.cart.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between bg-gray-50 px-3 py-1 rounded-lg"
                    >
                      <span>
                        {item.name} × {item.qty}
                      </span>
                      <span className="font-medium">
                        MZN {roundDecimal(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* TOTAL + STATUS SELECT */}
                <div className="flex justify-between items-center mt-2">
                  <div className="font-semibold text-sm">
                    Total: MZN {roundDecimal(order.total)}
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border border-gray-200 text-xs px-2 py-1 rounded"
                  >
                    {statusOptions.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* CREATION DATE */}
                <div className="text-[10px] text-gray-400 mt-2">
                  Criado em {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
