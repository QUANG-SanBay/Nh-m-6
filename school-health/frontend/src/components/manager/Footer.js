import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Thông tin liên hệ</h3>
            <p>Hệ thống quản lý y tế học đường</p>
            <p>Email: support@schoolhealth.com</p>
            <p>Điện thoại: (123) 456-7890</p>
          </div>
          <div className="footer-section">
            <h3>Liên kết nhanh</h3>
            <ul>
              <li><a href="/manager/help">Hướng dẫn sử dụng</a></li>
              <li><a href="/manager/support">Hỗ trợ kỹ thuật</a></li>
              <li><a href="/manager/privacy">Chính sách bảo mật</a></li>
              <li><a href="/manager/terms">Điều khoản sử dụng</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Thông tin ngắn gọn</h3>
            <p>Hệ thống quản lý y tế học đường giúp theo dõi và quản lý sức khỏe học sinh hiệu quả.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 School Health Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 