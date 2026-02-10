import type { NextApiRequest, NextApiResponse } from "next";
import products from "../../../../data/products.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    category,
    order_by,
    offset = "0",
    limit = "10",
  } = req.query;

  let data = [...products];

  // Filter by category
  if (category) {
    data = data.filter(
      (p) => p.category.name === String(category)
    );
  }

  // Sorting
  if (order_by === "createdAt.desc") {
    data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  }

  if (order_by === "price") {
    data.sort((a, b) => a.price - b.price);
  }

  if (order_by === "price.desc") {
    data.sort((a, b) => b.price - a.price);
  }

  const start = Number(offset);
  const end = start + Number(limit);

  res.status(200).json({
    count: data.length,
    data: data.slice(start, end),
  });
}
