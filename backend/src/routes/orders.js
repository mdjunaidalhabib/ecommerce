import { Router } from "express";
import Order from "../models/Order.js";

const router = Router();

function isAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Unauthorized" });
}

router.post("/", isAuth, async (req, res) => {
  const order = await Order.create({
    user: req.user._id,
    items: req.body.items,
    total: req.body.total,
  });
  res.status(201).json(order);
});

router.get("/me", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

export default router;
