import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Đăng ký</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tên"
          value={formData.name}
          onChange={handleChange}
          required
          className="signup-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          Đăng ký
        </button>
      </form>
      {message && <p className="signup-message">{message}</p>}
    </div>
  );
};

export default SignUp;
