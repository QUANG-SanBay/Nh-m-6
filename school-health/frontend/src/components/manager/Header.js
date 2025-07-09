import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/manager/home">
            <div className="logo">
              <img src="/logo192.png" alt="Logo" />
              <span>School Health</span>
            </div>
          </Link>
        </div>

        {/* ✅ Chỉ giữ lại 1 nav là Home */}
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/manager/home" className="nav-link">
                <i className="fas fa-home"></i> Trang chủ
              </Link>
            </li>
          </ul>
        </nav>

        <div className="user-section">
          <div className="search">
            <i className="fas fa-search"></i>
            <input type="search" placeholder="Tìm kiếm..." />
          </div>

          <div className="notifications">
            <button className="icon-button">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </button>
          </div>

          <div className="user-profile" onClick={toggleProfile}>
            <img src="/manager-avatar.png" alt="Avatar" className="avatar" />
            <span className="user-name">Manager Name</span>
            <i className={`fas fa-chevron-down ${isProfileOpen ? 'rotate' : ''}`}></i>

            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <img src="/manager-avatar.png" alt="Avatar" className="dropdown-avatar" />
                  <div className="dropdown-user-info">
                    <h4>Manager Name</h4>
                    <p>manager@email.com</p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/manager/profile" className="dropdown-item">
                  <i className="fas fa-user"></i>Thông tin cá nhân
                </Link>
                <Link to="/manager/settings" className="dropdown-item">
                  <i className="fas fa-cog"></i>Cài đặt
                </Link>
                <div className="dropdown-divider"></div>
                <Link to="/manager/logout" className="dropdown-item text-danger">
                  <i className="fas fa-sign-out-alt"></i>Đăng xuất
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
