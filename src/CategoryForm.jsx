import React, { useState } from "react";
import axios from "axios";

function CategoryForm() {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Токен не найден. Пожалуйста, войдите в систему.");
      return;
    }

    try {
      const response = await axios.post(
        "https://pizza-catalog-service.onrender.com/category/create",
        {
          name: name,
          parent_id: parentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponseMessage("Категория успешно добавлена!");
      setName("");
      setParentId(0);
    } catch (err) {
      console.error(err);
      setError(
        "Ошибка при добавлении категории. Пожалуйста, попробуйте снова."
      );
    }
  };

  const handleGetCategories = async () => {
    try {
      const response = await axios.get(
        "https://pizza-catalog-service.onrender.com/category/all_categories",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setCategories(response.data);
    } catch (err) {
      console.error("Ошибка при получении категорий:", err);
      setError("Ошибка при получении категорий.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ color: "#333", textAlign: "center" }}>Добавить категорию</h2>
      <form onSubmit={handleCategorySubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontSize: "16px", color: "#555" }}>
            Имя категории:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontSize: "16px", color: "#555" }}>
            ID родительской категории:
            <input
              type="number"
              value={parentId}
              onChange={(e) => setParentId(Number(e.target.value))}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Добавить категорию
        </button>
      </form>

      {responseMessage && (
        <p
          style={{
            color: "green",
            marginTop: "10px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {responseMessage}
        </p>
      )}
      {error && (
        <p
          style={{
            color: "red",
            marginTop: "10px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>
      )}

      <button
        onClick={handleGetCategories}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "background-color 0.3s",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
      >
        Получить категории
      </button>

      {categories.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#333", fontSize: "20px" }}>Список категорий</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              padding: "10px",
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  textAlign: "center",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>
                  <strong>Имя:</strong> {category.name}
                </p>
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>
                  <strong>ID:</strong> {category.id}
                </p>
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>
                  <strong>Slug:</strong> {category.slug}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryForm;
