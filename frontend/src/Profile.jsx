import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Failed to fetch profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8080/api/auth/profile",
        profile,
=======
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";
import AvatarUpload from "./AvatarUpload";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    avatar: "",
    isActive: true,
    lastLogin: "",
    createdAt: "",
    updatedAt: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", avatar: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage({
          type: "error",
          text: "Vui lòng đăng nhập để xem profile",
        });
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setProfile(response.data.profile);
        setFormData({
          name: response.data.profile.name,
          email: response.data.profile.email,
          avatar: response.data.profile.avatar || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (error.response?.status === 401) {
        setMessage({ type: "error", text: "Phiên đăng nhập đã hết hạn" });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setMessage({ type: "error", text: "Lỗi khi tải thông tin profile" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpdate = (updatedUser) => {
    setProfile((prev) => ({
      ...prev,
      avatar: updatedUser.avatar || { url: "", publicId: "" },
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Tên không được để trống" });
      return;
    }
    if (!formData.email.trim()) {
      setMessage({ type: "error", text: "Email không được để trống" });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:8080/api/profile",
        formData,
>>>>>>> database
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
<<<<<<< HEAD
      setMessage("Profile updated successfully!");
      setProfile(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
=======

      if (response.data.success) {
        setProfile(response.data.profile);
        setFormData({
          name: response.data.profile.name,
          email: response.data.profile.email,
          avatar: response.data.profile.avatar || "",
        });
        setEditMode(false);
        setMessage({ type: "success", text: response.data.message });

        // Update user in localStorage
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...currentUser,
            name: response.data.profile.name,
            email: response.data.profile.email,
            avatar: response.data.profile.avatar,
          })
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Lỗi khi cập nhật profile",
      });
    } finally {
      setLoading(false);
>>>>>>> database
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
<<<<<<< HEAD
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {message && <p className="profile-message">{message}</p>}
      <form onSubmit={handleUpdate} className="profile-form">
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
          className="profile-input"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          className="profile-input"
        />
        <button type="submit" className="profile-button">
          Update Profile
        </button>
      </form>
=======
    setFormData({ ...formData, [name]: value });
  };

  const handleEditToggle = () => {
    if (editMode) {
      // Reset form data if cancelling edit
      setFormData({
        name: profile.name,
        email: profile.email,
        avatar: profile.avatar || "",
      });
    }
    setEditMode(!editMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMessage({ type: "success", text: "Đăng xuất thành công!" });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("vi-VN");
  };

  if (loading && !profile.id) {
    return (
      <div className="profile-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Đang tải thông tin profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.avatar?.url ||
            (typeof profile.avatar === "string" && profile.avatar) ? (
              <img src={profile.avatar?.url || profile.avatar} alt="Avatar" />
            ) : (
              <div className="avatar-placeholder">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-title">
            <h2>👤 Thông Tin Cá Nhân</h2>
            <p className="profile-subtitle">
              Quản lý thông tin tài khoản của bạn
            </p>
          </div>
        </div>

        <div className="profile-body">
          {!editMode ? (
            // View Mode
            <div className="profile-info">
              <div className="info-grid">
                <div className="info-item">
                  <label>🆔 ID:</label>
                  <span>{profile.id}</span>
                </div>
                <div className="info-item">
                  <label>👤 Họ và Tên:</label>
                  <span>{profile.name}</span>
                </div>
                <div className="info-item">
                  <label>📧 Email:</label>
                  <span>{profile.email}</span>
                </div>
                <div className="info-item">
                  <label>🎭 Vai trò:</label>
                  <span className={`role-badge role-${profile.role}`}>
                    {profile.role === "admin" ? "👑 Admin" : "👥 User"}
                  </span>
                </div>
                <div className="info-item">
                  <label>🟢 Trạng thái:</label>
                  <span
                    className={`status-badge ${
                      profile.isActive ? "active" : "inactive"
                    }`}
                  >
                    {profile.isActive ? "✅ Hoạt động" : "❌ Vô hiệu hóa"}
                  </span>
                </div>
                <div className="info-item">
                  <label>🕐 Đăng nhập lần cuối:</label>
                  <span>{formatDate(profile.lastLogin)}</span>
                </div>
                <div className="info-item">
                  <label>📅 Ngày tạo tài khoản:</label>
                  <span>{formatDate(profile.createdAt)}</span>
                </div>
                <div className="info-item">
                  <label>📝 Cập nhật lần cuối:</label>
                  <span>{formatDate(profile.updatedAt)}</span>
                </div>
              </div>

              <div className="profile-actions">
                <button onClick={handleEditToggle} className="btn btn-primary">
                  ✏️ Chỉnh Sửa Thông Tin
                </button>
                <button onClick={handleLogout} className="btn btn-danger">
                  🚪 Đăng Xuất
                </button>
              </div>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleUpdate} className="profile-form">
              <div className="form-group">
                <label className="form-label" htmlFor="edit-name">
                  👤 Họ và Tên
                </label>
                <input
                  id="edit-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên..."
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="edit-email">
                  📧 Email
                </label>
                <input
                  id="edit-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ email..."
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="edit-avatar">
                  🖼️ Avatar URL (Tùy chọn)
                </label>
                <input
                  id="edit-avatar"
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="form-input"
                  disabled={loading}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="btn btn-outline"
                  disabled={loading}
                >
                  ❌ Hủy
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Đang cập nhật...
                    </>
                  ) : (
                    <>✅ Cập Nhật</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Avatar Upload Section */}
      <AvatarUpload
        user={profile}
        onAvatarUpdate={handleAvatarUpdate}
        authToken={localStorage.getItem("token")}
      />

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

<<<<<<< HEAD
export default Profile;
=======
export default Profile;
>>>>>>> database
