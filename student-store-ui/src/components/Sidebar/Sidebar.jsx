import ShoppingCart from "../ShoppingCart/ShoppingCart";
import "./Sidebar.css";

export default function Sidebar({
  isOpen,
  cart,
  products,
  toggleSidebar,
  handleOnCheckout,
  isCheckingOut,
  order,
  setOrder,
  error,
}) {
  return (
    <section className={`Sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="wrapper">
        <span
          className={`toggle-button button ${isOpen ? "open" : "closed"}`}
          onClick={toggleSidebar}
        >
          {/* <i className="material-icons md-48">arrow_forward</i> */}
          <i>=====</i>
        </span>
        <ShoppingCart
          isOpen={isOpen}
          cart={cart}
          products={products}
          toggleSidebar={toggleSidebar}
          handleOnCheckout={handleOnCheckout}
          isCheckingOut={isCheckingOut}
          error={error}
          order={order}
          setOrder={setOrder}
        />
      </div>
    </section>
  );
}
