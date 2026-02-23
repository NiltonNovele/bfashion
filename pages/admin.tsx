import { useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Eye,
  EyeOff,
  ShoppingBag,
  Handbag,
  Package,
  Layers,
} from "lucide-react";

type ProductType = {
  _id: string;
  name: string;
  price: number;
  image1: string;
  image2: string;
  description?: string;
  category?: { name: string };
  visible?: boolean;
};

export default function AdminProducts() {
  const initialMockProducts: ProductType[] = [
    { _id: "1", name: "Office Midi Dress", price: 6000, image1: "", image2: "", description: "Elegant office-ready dress.", category: { name: "women" }, visible: true },
    { _id: "2", name: "Summer Dress", price: 6000, image1: "", image2: "", description: "Light and fresh for warm days.", category: { name: "women" }, visible: true },
    { _id: "3", name: "Long Maxi Dress", price: 6000, image1: "", image2: "", description: "Flowy and modern silhouette.", category: { name: "women" }, visible: false },
    { _id: "4", name: "Office Tote Bag", price: 7000, image1: "", image2: "", description: "Spacious and minimal design.", category: { name: "bags" }, visible: true },
    { _id: "5", name: "Mini Crossbody Bag", price: 4200, image1: "", image2: "", description: "Compact everyday essential.", category: { name: "bags" }, visible: true },
  ];

  const [products, setProducts] = useState<ProductType[]>(initialMockProducts);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "women",
    visible: true,
  });

  const saveProduct = () => {
    if (!form.name || !form.price) return;

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p._id === editingProduct._id
            ? {
                ...p,
                name: form.name,
                price: Number(form.price),
                description: form.description,
                category: { name: form.category },
                visible: form.visible,
              }
            : p
        )
      );
    } else {
      const newProduct: ProductType = {
        _id: Date.now().toString(),
        name: form.name,
        price: Number(form.price),
        description: form.description,
        image1: "",
        image2: "",
        category: { name: form.category },
        visible: form.visible,
      };

      setProducts((prev) => [newProduct, ...prev]);
    }

    closeModal();
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const toggleVisibility = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, visible: !p.visible } : p
      )
    );
  };

  const openEdit = (product: ProductType) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price.toString(),
      description: product.description || "",
      category: product.category?.name || "women",
      visible: product.visible ?? true,
    });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditingProduct(null);
    setForm({
      name: "",
      price: "",
      description: "",
      category: "women",
      visible: true,
    });
  };

  const total = products.length;
  const women = products.filter((p) => p.category?.name === "women").length;
  const bags = products.filter((p) => p.category?.name === "bags").length;
  const visible = products.filter((p) => p.visible).length;
  const hidden = products.filter((p) => !p.visible).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Products Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and monitor your store products
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-black text-black px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md hover:scale-[1.03] transition"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <StatCard title="Total" value={total} icon={<Layers size={18} />} />
          <StatCard title="Women" value={women} icon={<ShoppingBag size={18} />} />
          <StatCard title="Bags" value={bags} icon={<Handbag size={18} />} />
          <StatCard title="Visible" value={visible} icon={<Eye size={18} />} />
          <StatCard title="Hidden" value={hidden} icon={<EyeOff size={18} />} />
        </div>

        {/* PRODUCTS */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-semibold text-lg">
                    {product.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    MZN {product.price}
                  </p>
                </div>

                <span className="text-xs bg-black/5 px-3 py-1 rounded-full capitalize">
                  {product.category?.name}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                {product.description}
              </p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => toggleVisibility(product._id)}
                  className={`flex items-center gap-1 text-sm font-medium ${
                    product.visible
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {product.visible ? (
                    <>
                      <Eye size={16} /> Visible
                    </>
                  ) : (
                    <>
                      <EyeOff size={16} /> Hidden
                    </>
                  )}
                </button>

                <div className="flex gap-4 text-gray-600">
                  <button
                    onClick={() => openEdit(product)}
                    className="hover:text-black transition"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {openModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-8 rounded-3xl shadow-2xl space-y-6">
              <h2 className="text-xl font-semibold">
                {editingProduct ? "Edit Product" : "New Product"}
              </h2>

              <div className="space-y-4">
                <input
                  placeholder="Product Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                />

                <input
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                />

                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                />

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="women">Women</option>
                  <option value="bags">Bags</option>
                </select>

                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={form.visible}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        visible: e.target.checked,
                      })
                    }
                  />
                  Visible in store
                </label>

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={closeModal}
                    className="w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveProduct}
                    className="w-full bg-black text-white py-3 rounded-xl hover:scale-[1.02] transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 flex justify-between items-center">
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {title}
        </p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="bg-black/5 p-3 rounded-xl text-gray-700">
        {icon}
      </div>
    </div>
  );
}