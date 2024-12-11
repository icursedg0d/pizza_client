import React, { useState } from "react";
import axios from "axios";

// Функция для получения токена и информации о текущем пользователе
const getTokenAndUserInfo = async (
  username,
  password,
  setFromToken,
  setError
) => {
  try {
    // Получение токена
    const response = await axios.post(
      "https://pizza-auth-service.onrender.com/auth/token",
      new URLSearchParams({
        username,
        password,
        grant_type: "password",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = response.data;
    localStorage.setItem("access_token", access_token);
    alert("Успешный вход!");

    const responseToken = await axios.get(
      "https://pizza-auth-service.onrender.com/auth/read_current_user",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    setFromToken(responseToken.data);
  } catch (err) {
    setError("Ошибка входа: проверьте логин и пароль.");
    console.error(err);
  }
};

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fromToken, setFromToken] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    await getTokenAndUserInfo(username, password, setFromToken, setError);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ color: "#333", textAlign: "center" }}>Вход в систему</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontSize: "16px", color: "#555" }}>
            Логин:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontSize: "16px", color: "#555" }}>
            Пароль:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Войти
        </button>
      </form>
      {error && (
        <p
          style={{
            color: "red",
            marginTop: "20px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>
      )}
      {fromToken && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#333", fontSize: "20px" }}>
            Информация о пользователе
          </h3>
          <ul style={{ padding: "0", listStyleType: "none" }}>
            <li style={{ marginBottom: "10px", fontSize: "16px" }}>
              <strong style={{ color: "#555" }}>Имя:</strong>{" "}
              {fromToken.User.first_name}
            </li>
            <li style={{ marginBottom: "10px", fontSize: "16px" }}>
              <strong style={{ color: "#555" }}>Фамилия:</strong>{" "}
              {fromToken.User.last_name}
            </li>
            <li style={{ marginBottom: "10px", fontSize: "16px" }}>
              <strong style={{ color: "#555" }}>ID пользователя:</strong>{" "}
              {fromToken.User.id}
            </li>
            <li style={{ marginBottom: "10px", fontSize: "16px" }}>
              <strong style={{ color: "#555" }}>Администратор:</strong>{" "}
              {fromToken.User.is_admin ? "Да" : "Нет"}
            </li>
            <li style={{ fontSize: "16px" }}>
              <strong style={{ color: "#555" }}>Адрес:</strong>{" "}
              {fromToken.User.address ?? "Не указан"}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
