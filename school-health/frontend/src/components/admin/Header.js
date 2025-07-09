import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onSearch) {
        onSearch(searchTerm);
      }
    }
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
            <li><Link to="/nurse/home" className="nav-link"><i className="fas fa-home"></i>Home</Link></li>
            <li><Link to="/admin/manage_account" className="nav-link">Quản lí tài khoản</Link></li>
            {/* ... các mục menu khác */}
          </ul>
        </nav>

        <div className="user-section">
          <div className="search">
            <i className="fas fa-search"></i>
            <input
              type="search"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          {/* phần thông báo và user profile giữ nguyên */}
        </div>
      </div>
    </header>
  );
};

export default Header;
