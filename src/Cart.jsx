import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Получаем данные о корзине
  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await axios.get(
          "https://pizza-catalog-service.onrender.com/cart/get",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        alert("Failed to load cart items.");
      }
    };

    fetchCartItems();
  }, []);

  // Расчет общей суммы
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.total_price, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // Обработка оформления заказа
  const handleCheckout = async () => {
    const token = localStorage.getItem("access_token");
    setLoading(true);

    try {
      const response = await axios.delete(
        "https://pizza-catalog-service.onrender.com/cart/clear",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Order placed successfully!");
      setCartItems([]);
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart</h1>
      <div>
        {cartItems.map((item) => (
          <div
            key={item.product_id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h2>{item.product_name}</h2>
            <p>Price: {item.product_price} ₽</p>
            <p>Radius: {item.radius} cm</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: {item.total_price} ₽</p>
            <img
              src={
                "https://pizza-catalog-service.onrender.com" + item.image_url
              }
              alt={item.product_name}
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        ))}
      </div>
      <h3>Total: {totalPrice} ₽</h3>
      <button
        onClick={handleCheckout}
        disabled={loading || cartItems.length === 0}
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default Cart;
