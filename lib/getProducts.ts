import fs from "fs";
import path from "path";

export const getProducts = () => {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};
