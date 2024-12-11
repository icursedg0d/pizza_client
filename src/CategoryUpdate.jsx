import React, { useState } from "react";
import axios from "axios";

function CategoryUpdate() {
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateCategory = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Token not found. Please log in.");
      return;
    }

    try {
      const response = await axios.put(
        `https://pizza-catalog-service.onrender.com/category/update_category/${categoryId}`,
        {
          category_id: categoryId,
          name,
          parent_id: parentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Category updated successfully!");
      setName("");
      setParentId(0);
      setCategoryId("");
    } catch (err) {
      console.error(err);
      setError("Error updating category. Please try again.");
    }
  };

  const handleDeleteCategory = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Token not found. Please log in.");
      return;
    }

    try {
      const response = await axios.delete(
        `https://pizza-catalog-service.onrender.com/category/delete?category_id=${categoryId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Category deleted successfully!");
      setCategoryId("");
    } catch (err) {
      console.error(err);
      setError("Error deleting category. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Изменить категорию</h2>

      {/* Update Category Form */}
      <form onSubmit={handleUpdateCategory}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontSize: "16px", color: "#555" }}>
            Category ID:
            <input
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
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
            Category Name:
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
            Parent Category ID:
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
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Update Category
        </button>
      </form>

      {/* Delete Category Form */}
      <div style={{ marginTop: "20px" }}>
        <h3 style={{ textAlign: "center", color: "#333" }}>
          Удалить категорию
        </h3>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontSize: "16px", color: "#555" }}>
            Category ID:
            <input
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
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
          onClick={handleDeleteCategory}
          style={{
            padding: "10px 15px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
        >
          Delete Category
        </button>
      </div>

      {message && (
        <p
          style={{
            color: "green",
            marginTop: "10px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {message}
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
    </div>
  );
}

export default CategoryUpdate;
