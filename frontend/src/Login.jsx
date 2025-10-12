import React, { useState } from "react";
<<<<<<< HEAD
import axios from "axios";
import "./Login.css";
=======
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";
import "./Login2.css";
>>>>>>> database

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
<<<<<<< HEAD
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
=======
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [tokenData, setTokenData] = useState("");
  const navigate = useNavigate();
>>>>>>> database

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    try {
=======

    // Validation
    if (!formData.email.trim()) {
      setMessage({ type: "error", text: "Email không được để trống" });
      return;
    }
    if (!formData.password.trim()) {
      setMessage({ type: "error", text: "Mật khẩu không được để trống" });
      return;
    }

    try {
      setLoading(true);
      setMessage("");

>>>>>>> database
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
<<<<<<< HEAD
      setMessage(response.data.message);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token); // Lưu token vào localStorage
    } catch (error) {
      setMessage(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Đăng nhập</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          Đăng nhập
        </button>
      </form>
      {message && <p className="login-message">{message}</p>}
      {token && <p className="login-token">JWT Token: {token}</p>}
=======

      // Lưu token và user info vào localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setTokenData(response.data.token);
        setShowToken(true);
      }

      setMessage({
        type: "success",
        text: response.data.message || "Đăng nhập thành công!",
      });

      // Chuyển hướng sau 3 giây
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Login error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Đăng nhập thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTokenData("");
    setShowToken(false);
    setMessage({ type: "success", text: "Đăng xuất thành công!" });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">🔑 Đăng Nhập</h2>
          <p className="login-subtitle">Đăng nhập vào hệ thống quản lý user</p>
        </div>

        {!showToken ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                📧 Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập địa chỉ email..."
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                🔒 Mật Khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu..."
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="form-input"
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Đang đăng nhập...
                </>
              ) : (
                <>🚀 Đăng Nhập</>
              )}
            </button>
          </form>
        ) : (
          <div className="token-section">
            <div className="token-info">
              <h3>✅ Đăng nhập thành công!</h3>
              <p>JWT Token của bạn:</p>
              <div className="token-display">
                <code>{tokenData}</code>
              </div>
              <div className="token-actions">
                <button
                  onClick={() => navigator.clipboard.writeText(tokenData)}
                  className="btn btn-outline"
                >
                  📋 Copy Token
                </button>
                <button onClick={handleLogout} className="btn btn-danger">
                  🚪 Đăng Xuất
                </button>
              </div>
            </div>
          </div>
        )}

        {!showToken && (
          <div className="login-footer">
            <p>
              Chưa có tài khoản? <a href="/signup">Đăng ký tại đây</a>
            </p>
            <p>
              <a href="/forgot-password" className="forgot-password-link">
                🔐 Quên mật khẩu?
              </a>
            </p>
          </div>
        )}
      </div>

      {message && (
        <Toast
          message={message.text}
          type={message.type}
          onClose={() => setMessage("")}
        />
      )}
>>>>>>> database
    </div>
  );
};

export default Login;
