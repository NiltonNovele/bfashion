import type { NextApiRequest, NextApiResponse } from "next";
import products from "../../../../data/products.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  res.status(200).json({ data: product });
}
