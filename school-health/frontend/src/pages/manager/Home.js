import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/manager/Header';
import Footer from '../../components/manager/Footer';
import '../../styles/Home.css';

const Home = () => {
  return (
    <div className="nurse-layout">
      <Header />
      <main className="nurse-main">
        <div className="dashboard-container">
          <h1 className="dashboard-title">Bảng điều khiển Y tá trường</h1>
          
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Học sinh khám hôm nay</h3>
              <div className="stat-value">25</div>
              <div className="stat-change positive">+5 so với hôm qua</div>
            </div>
            <div className="stat-card">
              <h3>Sự kiện y tế chờ xử lý</h3>
              <div className="stat-value">8</div>
              <div className="stat-change negative">+3 sự kiện mới</div>
            </div>
            <div className="stat-card">
              <h3>Cảnh báo y tế</h3>
              <div className="stat-value">0</div>
              <div className="stat-change">Cập nhật 2h trước</div>
            </div>
          </div>

          <div className="dashboard-sections">
            <section className="quick-actions-section">
              <h2>Thao tác nhanh</h2>
              <div className="actions-grid">
                <button className="action-button">
                  <span className="action-icon">📝</span>
                  <span>Tạo hồ sơ mới</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">💊</span>
                  <span>Quản lý thuốc</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">🏥</span>
                  <span>Kiểm tra y tế</span>
                </button>
                <Link to="/nurse/events" className="action-button">
                  <span className="action-icon">📅</span>
                  <span>Sự kiện y tế</span>
                </Link>
              </div>
            </section>

            <section className="recent-activities-section">
              <h2>Hoạt động gần đây</h2>
              <div className="activities-list">
                <div className="activity-item">
                  <span className="activity-time">10:30</span>
                  <div className="activity-content">
                    <h4>Khám sức khỏe định kỳ</h4>
                    <p>Lớp 10A - 30 học sinh</p>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-time">09:15</span>
                  <div className="activity-content">
                    <h4>Cập nhật hồ sơ</h4>
                    <p>Nguyễn Văn A - Lớp 11B</p>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-time">08:45</span>
                  <div className="activity-content">
                    <h4>Xử lý sự cố y tế</h4>
                    <p>Phòng Y tế - Sơ cứu học sinh</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home; 