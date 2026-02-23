import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    image1: String,
    image2: String,
    description: String,
    detail: String,
    category: {
      name: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
