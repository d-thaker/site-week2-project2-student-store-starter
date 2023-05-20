import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

export default function ProductGrid({
  addToCart,
  removeFromCart,
  getQuantityOfItemInCart,
  products = [],
}) {
  return (
    <div id="Buy" className="ProductGrid">
      <div className="content">
        <h3>Best Selling Products</h3>
        <div className="grid">
          {products?.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              quantity={getQuantityOfItemInCart(product)}
              addToCart={() => addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
            />
          ))}
          {!products?.length ? (
            <div className="card">
              <p>Check your backend connection. Products not available</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
