import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({
  product,
  quantity,
  addToCart,
  removeFromCart,
}) {
  return (
    <div className="ProductCard">
      <div className="media">
        <Link to={`/${product.id}`}>
          <img src={product.image} alt="product cover" />
        </Link>
      </div>
      <div className="product-info">
        <div className="info">
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>
        </div>
        <div className="actions">
          <div className="buttons">
            <i className="material-icons" onClick={addToCart}>
              add
            </i>
            <i className="material-icons" onClick={removeFromCart}>
              remove
            </i>
          </div>

          <span className="quantity">
            <span className="amt">{quantity}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
