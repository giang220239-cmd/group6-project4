<<<<<<< HEAD
import React from 'react';
=======
import React from "react";
>>>>>>> database

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;

  const getIcon = () => {
    switch (type) {
<<<<<<< HEAD
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
=======
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "📢";
>>>>>>> database
    }
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">{getIcon()}</span>
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Toast;
=======
export default Toast;
>>>>>>> database
