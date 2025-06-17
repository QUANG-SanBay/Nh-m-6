import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Liên hệ</h4>
          <p>Email: support@schoolhealth.com</p>
          <p>Điện thoại: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h4>Liên kết nhanh</h4>
          <ul>
            <li><a href="/about">Giới thiệu</a></li>
            <li><a href="/contact">Liên hệ</a></li>
            <li><a href="/privacy">Chính sách bảo mật</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Theo dõi chúng tôi</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 School Health. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 