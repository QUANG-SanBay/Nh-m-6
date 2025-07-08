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
          <Link to="/nurse/home">
            <div className="logo">
              <img src="/logo192.png" alt="Logo" />
              <span>School Health</span>
            </div>
          </Link>
        </div>

        <nav className="main-nav">
          <ul>
            <li><Link to="/nurse/home" className="nav-link">
              <i className="fas fa-home"></i>Home
            </Link></li>
            <li><Link to="/admin/manage_account" className="nav-link">
              <i className=""></i>Quản lí tài khoản
            </Link></li>
            <li><Link to="" className="nav-link">
              <i className=""></i>
            </Link></li>
            <li><Link to="" className="nav-link">
              <i className=""></i>
            </Link></li>
            <li><Link to="/nurse/vaccination-management" className="nav-link">
              <i className=""></i>
            </Link></li>
            <li><Link to="" className="nav-link">
              <i className=""></i>
            </Link></li>
            
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
            <img src="/admin-avatar.png" alt="Avatar" className="avatar" />
            <span className="user-name">Admin Name</span>
            <i className={`fas fa-chevron-down ${isProfileOpen ? 'rotate' : ''}`}></i>
            
            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <img src="/nurse-avatar.png" alt="Avatar" className="dropdown-avatar" />
                  <div className="dropdown-user-info">
                    <h4>Admin Name</h4>
                    <p>admin@email.com</p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/nurse/profile" className="dropdown-item">
                  <i className=""></i>
                  Thông tin cá nhân
                </Link>
                <Link to="/nurse/settings" className="dropdown-item">
                  <i className=""></i>
                  Cài đặt
                </Link>
                <div className="dropdown-divider"></div>
                <Link to="/nurse/logout" className="dropdown-item text-danger">
                  <i className=""></i>
                  Đăng xuất
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