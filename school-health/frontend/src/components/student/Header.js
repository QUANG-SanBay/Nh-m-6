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
            <li><a href="/student/home" className={activePage === 'home' ? 'active' : ''}>Trang chủ</a></li>
            <li><a href="/student/health" className={activePage === 'health' ? 'active' : ''}>Sức Khỏe</a></li>
            <li><a href="/student/events" className={activePage === 'events' ? 'active' : ''}>Lịch sự kiện</a></li>
            <li><a href="/student/medical-history" className={activePage === 'medical-history' ? 'active' : ''}>Lịch sử khám bệnh/Điều trị</a></li>

            
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
            <a href="/student/profile" className={activePage === 'profile' ? 'active' : ''}>Thông tin của bạn</a>
            <a href="/logout">Đăng xuất</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 