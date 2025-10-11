import React from 'react';

const Header = ({ totalUsers }) => {
  const getCurrentTime = () => {
    return new Date().toLocaleString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <header className="app-header fade-in">
      <div className="header-content">
        <div className="header-main">
          <h1 className="app-title">🏢 Hệ Thống Quản Lý User</h1>
          <p className="app-subtitle">Quản lý thông tin người dùng một cách dễ dàng và hiệu quả</p>
        </div>
        
        <div className="header-info">
          <div className="time-info">
            <span className="time-icon">🕒</span>
            <span className="time-text">{getCurrentTime()}</span>
          </div>
          <div className="status-info">
            <span className="status-dot"></span>
            <span className="status-text">Hệ thống hoạt động bình thường</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;