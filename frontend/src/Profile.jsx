import React, { useState, useEffect } from "react";
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Profile updated successfully!");
      setProfile(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    </div>
  );
};

export default Profile;