import "./ShoppingCart.css";

const CartTable = ({ products, cart }) => {
  const productMapping = products.reduce((acc, item) => {
    acc[item.name] = item;
    return acc;
  }, {});

  const productRows = Object.keys(cart).map((productName) => {
    const product = productMapping[productName];

    return {
      ...product,
      quantity: cart[productName],
      totalPrice: cart[productName] * product.price,
    };
  });

  const subTotal = productRows.reduce((acc, p) => (acc += p.totalPrice), 0);

  return (
    <>
      <div className="CartTable">
        <div className="header">
          <div className="header-row">
            <span className="flex-2">Name</span>
            <span className="center">Quantity</span>
            <span className="center">Unit Price</span>
            <span className="center">Cost</span>
          </div>

          {productRows.map((product) => (
            <div key={product.name} className="product-row">
              <span className="flex-2">{product.name}</span>
              <span className="center">{product.quantity}</span>
              <span className="center">${product.price}</span>
              <span className="center">
                ${product.price * product.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="receipt">
          <div className="receipt-subtotal">
            <span className="label">Subtotal</span>
            <span />
            <span />
            <span className="center">${subTotal}</span>
          </div>
          <div className="receipt-taxes">
            <span className="label">Taxes and Fees</span>
            <span />
            <span />
            <span className="center">${subTotal * 0.1}</span>
          </div>
          <div className="receipt-total">
            <span className="label">Total</span>
            <span />
            <span />
            <span className="center">${subTotal + subTotal * 0.1}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const CartItems = ({ products, cart }) => {
  const items = Object.keys(cart).length;

  return (
    <div>
      <h3>Cart </h3>
      <br></br>
      {items ? (
        <>
          <CartTable products={products} cart={cart} />
        </>
      ) : (
        <>
          <div className="notification">
            No items added to cart yet. Start shopping now!
          </div>
        </>
      )}
    </div>
  );
};

export default function ShoppingCart({ isOpen, products, cart }) {
  return (
    <div className="ShoppingCart">
      {isOpen ? (
        <div className="open">
          <CartItems products={products} cart={cart} />
        </div>
      ) : (
        "Cart"
      )}
    </div>
  );
}
