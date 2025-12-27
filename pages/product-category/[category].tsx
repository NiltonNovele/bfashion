import Link from "next/link";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Util/Pagination";
import { apiProductsType, itemType } from "../../context/cart/cart-types";
import DownArrow from "../../public/icons/DownArrow";

type OrderType = "latest" | "price" | "price-desc";

type Props = {
  items: itemType[];
  page: number;
  numberOfProducts: number;
  orderby: OrderType;
};

const ProductCategory: React.FC<Props> = ({
  items,
  page,
  numberOfProducts,
  orderby,
}) => {
  const router = useRouter();
  const { category } = router.query;

  const lastPage = Math.ceil(numberOfProducts / 10);

  const capitalizedCategory =
    typeof category === "string"
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : "";

  const firstIndex = page === 1 ? 1 : page * 10 - 9;
  const lastIndex = page * 10;

  const baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  return (
    <div>
      <Header title={`${capitalizedCategory} - BFashion`} />

      <main id="main-content">
        {/* Breadcrumb */}
        <div className="bg-lightgreen h-16 w-full flex items-center">
          <div className="app-x-padding app-max-width w-full">
            <div className="breadcrumb">
              <Link href="/">
                <a className="text-gray400">Início</a>
              </Link>{" "}
              / <span className="capitalize">{capitalizedCategory}</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="app-x-padding app-max-width w-full mt-8">
          <h3 className="text-4xl mb-2 capitalize">
            {capitalizedCategory}
          </h3>

          <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-0 justify-between mt-4 sm:mt-6">
            <span>
              A mostrar {firstIndex} –{" "}
              {numberOfProducts < lastIndex
                ? numberOfProducts
                : lastIndex}{" "}
              de {numberOfProducts} produtos
            </span>

            {category !== "new-arrivals" && (
              <SortMenu orderby={orderby} />
            )}
          </div>
        </div>

        {/* Products */}
        <div className="app-x-padding app-max-width mt-3 mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10">
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>

          {category !== "new-arrivals" && (
            <Pagination
              currentPage={page}
              lastPage={lastPage}
              orderby={orderby}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
  locale,
}) => {
  const page = Number(query.page || 1);
  const orderby = (query.orderby as OrderType) || "latest";
  const category = params?.category as string;

  let items: itemType[] = [];
  let numberOfProducts = 0;

  const baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  const fallbackProduct: itemType = {
    id: 1,
    name: "Produto indisponível",
    price: 0,
    img1: "/placeholder.png",
    img2: "/placeholder.png",
  };

  try {
    const orderMap: Record<string, string> = {
      latest: "createdAt.desc",
      price: "price",
      "price-desc": "price.desc",
    };

    const start = page === 1 ? 0 : (page - 1) * 10;

    if (category !== "new-arrivals") {
      const countRes = await axios.get(
        `${baseURL}/api/v1/products?category=${category}`
      );

      numberOfProducts = countRes.data.count;
    } else {
      numberOfProducts = 10;
    }

    const url =
  category === "new-arrivals"
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products?order_by=createdAt.desc&limit=10`
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products?order_by=${orderMap[orderby]}&offset=${start}&limit=10&category=${category}`;

const res = await axios.get(url);

    items = res.data.data.map((product: apiProductsType) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      img1: product.image1,
      img2: product.image2,
    }));
  } catch (error) {
    console.error("❌ Erro ao carregar produtos:", error);

    items = Array.from({ length: 6 }).map((_, i) => ({
      ...fallbackProduct,
      id: i + 1,
    }));

    numberOfProducts = items.length;
  }

  return {
    props: {
      items,
      numberOfProducts,
      page,
      orderby,
      messages: (await import(`../../messages/common/${locale}.json`)).default,
    },
  };
};

const SortMenu: React.FC<{ orderby: OrderType }> = ({ orderby }) => {
  const router = useRouter();
  const { category } = router.query;

  const labelMap = {
    latest: "Mais recentes",
    price: "Preço (baixo → alto)",
    "price-desc": "Preço (alto → baixo)",
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center">
        {labelMap[orderby]} <DownArrow />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 bg-white border p-1 z-10">
        {Object.entries(labelMap).map(([key, label]) => (
          <Menu.Item key={key}>
            {({ active }) => (
              <button
                onClick={() =>
                  router.push(`/product-category/${category}?orderby=${key}`)
                }
                className={`block w-full px-4 py-2 text-left ${
                  active ? "bg-gray100" : ""
                }`}
              >
                {label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default ProductCategory;
