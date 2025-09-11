import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    price: Number,
    qty: Number,
    image: String,
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [ItemSchema],
    total: Number,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
