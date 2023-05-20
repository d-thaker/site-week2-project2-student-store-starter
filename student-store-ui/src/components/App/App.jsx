import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";

import {
  removeFromCart,
  addToCart,
  getQuantityOfItemInCart,
  getTotalItemsInCart,
} from "../../utils/cartHelper";
import "./App.css";
import Hero from "../Hero/Hero";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  const handleRemoveItemToCart = (item) => setCart(removeFromCart(cart, item));
  const handleAddItemToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleOnCheckout = async () => {
    setIsCheckingOut(true);

    try {
      const res = await axios.post("http://localhost:3001/store", {
        cart,
      });
      if (res?.data?.purchase) {
        setIsCheckingOut(false);
        setCart({});
        setOrder(res.data);
      } else {
        setError("Error checking out.");
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setError(message ?? String(err));
    } finally {
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true);

      try {
        const res = await axios.get("http://localhost:3001/store");
        if (res?.data?.products) {
          setProducts(res.data.products);
        } else {
          setError("Error fetching products.");
        }
      } catch (err) {
        console.log(err);
        const message = err?.response?.data?.error?.message;
        setError(message ?? String(err));
      } finally {
        setIsFetching(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleAddItemToCart}
          removeFromCart={handleRemoveItemToCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <Navbar />
          <Hero />
          <Search
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleAddItemToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleRemoveItemToCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleAddItemToCart}
                  removeFromCart={handleRemoveItemToCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                  getTotalItemsInCart={handleGetTotalCartItems}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
