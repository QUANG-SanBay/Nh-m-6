import React from 'react';
import logo from '../../assets/logo.svg';
import defaultAvatar from '../../assets/default-avatar.svg';
import './Header.css';

const Header = ({ activePage }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <a className="logo-link" href="/parent/home">
            <img src={logo} alt="School Health Logo" />
            <span>School Health</span>
          </a>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><a href="/parent/home" className={activePage === 'home' ? 'active' : ''}>Trang chủ</a></li>
            <li><a href="/parent/medicine" className={activePage === 'medicine' ? 'active' : ''}>Gửi thuốc</a></li>
            <li><a href="/parent/health-info" className={activePage === 'health-info' ? 'active' : ''}>Khai báo / Cập nhật thông tin</a></li>
            <li><a href="/parent/health-results" className={activePage === 'health-results' ? 'active' : ''}>Kết quả kiểm tra</a></li>
            <li><a href="/parent/events" className={activePage === 'events' ? 'active' : ''}>Lịch sự kiện</a></li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <div className="notification">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">3</span>
        </div>
        <div className="user-profile">
          <img src={defaultAvatar} alt="User Avatar" />
          <div className="dropdown-menu">
            <a href="/parent/profile" className={activePage === 'profile' ? 'active' : ''}>Thông tin của bạn</a>
            <a href="/parent/logout">Đăng xuất</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 