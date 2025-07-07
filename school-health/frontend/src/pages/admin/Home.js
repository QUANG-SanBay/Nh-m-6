import React from 'react';
import Header from '../../components/admin/Header';
import Footer from '../../components/admin/Footer';

const AdminHome = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* ✅ Dùng Header ở đây để tránh lỗi ts(6133) */}
      <Header />

      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Chào mừng Admin!</h1>
        <p>Đây là giao diện trang quản trị hệ thống y tế học đường.</p>

        <ul>
          <li><a href="/admin/users">👥 Quản lý người dùng</a></li>
          <li><a href="/admin/nurses">🧑‍⚕️ Quản lý y tá</a></li>
          <li><a href="/admin/statistics">📊 Thống kê</a></li>
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default AdminHome;
