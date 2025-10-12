<<<<<<< HEAD
import React from 'react';
=======
import React from "react";
>>>>>>> database

const Statistics = ({ totalUsers, recentUsers = [] }) => {
  return (
    <div className="statistics-container">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{totalUsers}</div>
            <div className="stat-label">Tổng Users</div>
          </div>
        </div>
<<<<<<< HEAD
        
=======

>>>>>>> database
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{recentUsers.length}</div>
            <div className="stat-label">Users Hoạt Động</div>
          </div>
        </div>
<<<<<<< HEAD
        
=======

>>>>>>> database
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-number">
<<<<<<< HEAD
              {totalUsers > 0 ? Math.round((recentUsers.length / totalUsers) * 100) : 0}%
=======
              {totalUsers > 0
                ? Math.round((recentUsers.length / totalUsers) * 100)
                : 0}
              %
>>>>>>> database
            </div>
            <div className="stat-label">Tỷ Lệ Hoạt Động</div>
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Statistics;
=======
export default Statistics;
>>>>>>> database
