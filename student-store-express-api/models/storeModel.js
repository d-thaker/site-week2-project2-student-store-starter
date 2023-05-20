const { BadRequestError, NotFoundError } = require("../utils/errors");
const { storage } = require("../data/storage");

class Store {
  static async listProducts() {
    return storage.get("products").value();
  }

  static async fetchProductById(productId) {
    const product = storage
      .get("products")
      .find({ id: Number(productId) })
      .value();

    if (product) return product;

    throw new NotFoundError("No product found with that id.");
  }

  static async purchaseProducts(cart, user) {
    if (!cart || !Object.keys(cart).length) {
      throw new BadRequestError(`No cart or items in cart found to checkout.`);
    }

    const products = storage.get("products").value();
    const subtotal = Store.calculateSubtotal(cart, products);
    const total = Store._totalWithTax(subtotal);

    const receipt = Store.createReceipt({
      cart,
      subtotal,
      total,
      products,
      user,
    });

    const purchase = {
      name: user.name,
      email: user.email,
      total,
      receipt,
    };

    storage.get("purchases").push(purchase).write();

    return purchase;
  }
}
module.exports = Store;
