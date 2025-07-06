import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/student/Header';
import Footer from '../../components/student/Footer';

function StudentHome() {
  return (
    <div className="student-home">
      <Header activePage="home" />

      <main className="main-content">
        <div className="welcome-section">
          <h1>Chào mừng bạn đến với Hệ thống Quản lý Y tế Học đường</h1>
          <p>Tại đây bạn có thể xem thông tin sức khỏe, lịch hẹn, và nhiều chức năng hữu ích khác.</p>
        </div>

        <div className="quick-actions">
          <div className="action-card">
            <a className="action-link" href="/student/health-info">
              <i className="fas fa-user-md"></i>
              <h3>Thông tin sức khỏe</h3>
              <p>Xem thông tin khám sức khỏe của bạn</p>
            </a>
          </div>

          <div className="action-card">
            <a className="action-link" href="/student/events">
              <i className="fas fa-calendar-alt"></i>
              <h3>Lịch hẹn y tế</h3>
              <p>Xem các lịch khám và sự kiện y tế</p>
            </a>
          </div>

          <div className="action-card">
            <a className="action-link" href="/student/medical-history">
              <i className="fas fa-file-medical-alt"></i>
              <h3>Lịch sử khám</h3>
              <p>Xem lịch sử khám bệnh và tiêm chủng</p>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default StudentHome;
