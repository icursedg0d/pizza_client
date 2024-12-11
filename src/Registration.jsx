import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Очистить предыдущие ошибки

    try {
      const response = await axios.post(
        "https://pizza-auth-service.onrender.com/auth/",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          address: address,
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        alert("Регистрация успешна!");
      }
    } catch (err) {
      setError("Ошибка регистрации. Пожалуйста, попробуйте снова.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Форма регистрации</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Имя:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Фамилия:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Электронная почта:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Пароль:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Адрес:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Регистрация прошла успешно!</p>}
    </div>
  );
}

export default RegistrationForm;
