import React from 'react';
import './Home.css';
import Header from '../../components/parent/Header';
import Footer from '../../components/parent/Footer';

const Home = () => {
  return (
    <div className="parent-home">
      <Header activePage="home" />

      {/* Main Content */}
      <main className="main-content">
        <div className="welcome-section">
          <h1>Chào mừng đến với Hệ thống Quản lý Y tế Học đường</h1>
          <p>Nơi quản lý thông tin sức khỏe và theo dõi tình trạng sức khỏe của con bạn</p>
        </div>

        <div className="quick-actions">
          <div className="action-card">
            <a className="action-link" href="/parent/medicine">
              <i className="fas fa-pills"></i>
              <h3>Gửi thuốc</h3>
              <p>Gửi thuốc cho con bạn tại trường</p>
            </a>
          </div>
          <div className="action-card">
            <a className="action-link" href="/parent/health-info">
              <i className="fas fa-file-medical"></i>
              <h3>Khai báo thông tin</h3>
              <p>Cập nhật thông tin sức khỏe của con</p>
            </a>
          </div>
          <div className="action-card">
            <a className="action-link" href="/parent/events">
              <i className="fas fa-calendar-check"></i>
              <h3>Lịch hẹn</h3>
              <p>Xem lịch hẹn y tế của con</p>
            </a>
          </div>
          <div className="action-card">
            <a className="action-link" href="/parent/health-results">
              <i className="fas fa-chart-line"></i>
              <h3>Kết quả kiểm tra</h3>
              <p>Xem kết quả kiểm tra sức khỏe</p>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home; 