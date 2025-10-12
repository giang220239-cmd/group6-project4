<<<<<<< HEAD
import React from 'react';
=======
import React from "react";
>>>>>>> database

const SearchBar = ({ searchTerm, onSearchChange, totalUsers }) => {
  return (
    <div className="search-container">
      <div className="search-input-group">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm user theo tên hoặc email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
<<<<<<< HEAD
          <button 
            className="search-clear"
            onClick={() => onSearchChange('')}
=======
          <button
            className="search-clear"
            onClick={() => onSearchChange("")}
>>>>>>> database
            title="Xóa tìm kiếm"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="search-results-info">
          Tìm thấy {totalUsers} kết quả cho "{searchTerm}"
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default SearchBar;
=======
export default SearchBar;
>>>>>>> database
