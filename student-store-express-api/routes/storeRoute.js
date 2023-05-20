const express = require("express");
const Store = require("../models/storeModel");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Store.listProducts();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Store.fetchProductById(productId);
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const cart = req.body.cart;
    const user = req.body.user;
    const purchase = await Store.purchaseProducts(cart, user);
    res.status(200).json({ purchase, cart });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
