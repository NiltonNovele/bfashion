import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

/* ---------------- MONGODB ---------------- */

mongoose.connect(process.env.MONGO_URI);

const OrderSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    deliveryType: String,
    total: Number,
    cart: Array,
    status: {
      type: String,
      default: "Recebido",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
/* ---------------- CHECKOUT ---------------- */

app.post("/api/checkout", async (req, res) => {
  try {
    const { total } = req.body;

    const response = await fetch(
      "https://paysuite.tech/api/v1/payments",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSUITE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1, //amount: Math.round(total),
          reference: `BFASHION${Date.now()}`,
          description: "Finalize a sua compra na BFashion de forma rápida e segura com a sua carteira móvel preferida. Obrigado por comprar conosco!",
          return_url: "https://bfashion.sale/success", //return_url: "https://bfashion.sale/success",
        }),
      }
    );

    const data = await response.json();
    res.json({ checkout_url: data.data.checkout_url });
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

/* ---------------- SAVE ORDER ---------------- */

app.post("/api/orders", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    console.log("Order saved:", order._id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

/* ---------------- GET ORDERS ---------------- */

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

/* ---------------- UPDATE ORDER STATUS ---------------- */

app.patch("/api/orders/:id", async (req, res) => {
  try {
    const { status } = req.body;

    await Order.findByIdAndUpdate(req.params.id, { status });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

app.listen(5009, () => console.log("Server running on 5009"));
