import React, { useState, useEffect } from "react";
import axios from "axios";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [selectedRadius, setSelectedRadius] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch product list on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          "https://pizza-catalog-service.onrender.com/products/",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to load products.");
      }
    };

    fetchProducts();
  }, []);

  const handleRadiusChange = (productId, radius) => {
    setSelectedRadius((prevState) => ({
      ...prevState,
      [productId]: radius,
    }));
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("access_token"); // Берем токен из localStorage
    const radius = selectedRadius[productId] || 20; // Устанавливаем радиус по умолчанию
    setLoading(true);

    try {
      await axios.post(
        "https://pizza-catalog-service.onrender.com/cart/update",
        {
          product_id: productId,
          radius: radius,
          quantity: "+",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pizza Catalog</h1>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: {product.price} ₽</p>
          <img
            src={
              "https://pizza-catalog-service.onrender.com" + product.image_url
            }
            alt={product.name}
            style={{ width: "200px", height: "auto" }}
          />
          <div>
            <label>Choose radius: </label>
            {[20, 25, 30].map((radius) => (
              <label key={radius} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name={`radius-${product.id}`}
                  value={radius}
                  checked={selectedRadius[product.id] === radius}
                  onChange={() => handleRadiusChange(product.id, radius)}
                />
                {radius} cm
              </label>
            ))}
          </div>
          <button
            onClick={() => handleAddToCart(product.id)}
            disabled={loading}
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Store;
