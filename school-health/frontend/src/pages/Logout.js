import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import './Logout.css';

function Logout() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Đang đăng xuất...');

  useEffect(() => {
    // Sử dụng utility function để đăng xuất
    logout();
    
    // Hiển thị thông báo đăng xuất thành công
    setTimeout(() => {
      setMessage('Đăng xuất thành công!');
    }, 1000);
    
    // Chuyển về trang đăng nhập sau 2 giây
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }, [navigate]);

  return (
    <div className="logout-container">
      <div className="logout-content">
        <div className="logout-icon">
          <i className="fas fa-sign-out-alt"></i>
        </div>
        <h2>{message}</h2>
        <div className="loading-spinner"></div>
        <p>Bạn sẽ được chuyển về trang đăng nhập trong giây lát</p>
      </div>
    </div>
  );
}

export default Logout; 