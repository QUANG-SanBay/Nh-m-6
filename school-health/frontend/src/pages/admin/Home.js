import React from 'react';
import Header from '../../components/admin/Header';
import Footer from '../../components/admin/Footer';

const AdminHome = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* ✅ Dùng Header ở đây để tránh lỗi ts(6133) */}
      <Header />

      
      <Footer />
    </div>
  );
};

export default AdminHome;
