import React from 'react';
import './HealthResults.css';
import Header from '../../components/parent/Header';
import Footer from '../../components/parent/Footer';

const HealthResults = () => {
  const studentData = {
    fullName: 'Nguyễn Văn A',
    dateOfBirth: '2010-01-01',
    gender: 'Nam',
    studentId: '2024001',
    class: '10A1',
    address: '123 Đường ABC, Quận XYZ, TP.HCM',
    healthInfo: {
      height: '170',
      weight: '60',
      vision: '10/10',
      hearing: 'Bình thường',
      dental: 'Tốt'
    },
    specialCondition: 'Không có tình trạng đặc biệt',
    result: 'Tốt'
  };

  return (
    <div className="health-results-page">
      <Header activePage="health-results" />

      <main className="health-results-content">
        <div className="health-results-container">
          <h1>Kết quả kiểm tra sức khỏe</h1>

          <div className="health-results-form">
            <div className="student-photo">
              <div className="photo-placeholder">
                3x4
              </div>
            </div>

            <div className="form-row">
              <label>Họ và tên:</label>
              <input type="text" value={studentData.fullName} readOnly />
            </div>

            <div className="form-section">
              <h3>Thông tin chung:</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Ngày sinh:</label>
                  <input type="text" value={studentData.dateOfBirth} readOnly />
                </div>
                <div className="form-group">
                  <label>Giới tính:</label>
                  <input type="text" value={studentData.gender} readOnly />
                </div>
                <div className="form-group">
                  <label>MSHS:</label>
                  <input type="text" value={studentData.studentId} readOnly />
                </div>
                <div className="form-group">
                  <label>Lớp:</label>
                  <input type="text" value={studentData.class} readOnly />
                </div>
                <div className="form-group full-width">
                  <label>Địa chỉ:</label>
                  <input type="text" value={studentData.address} readOnly />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Thông tin sức khỏe:</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Chiều cao:</label>
                  <div className="input-unit">
                    <input type="text" value={studentData.healthInfo.height} readOnly />
                    <span className="unit">cm</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Cân nặng:</label>
                  <div className="input-unit">
                    <input type="text" value={studentData.healthInfo.weight} readOnly />
                    <span className="unit">kg</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Thị lực:</label>
                  <input type="text" value={studentData.healthInfo.vision} readOnly />
                </div>
                <div className="form-group">
                  <label>Thính lực:</label>
                  <input type="text" value={studentData.healthInfo.hearing} readOnly />
                </div>
                <div className="form-group">
                  <label>Răng miệng:</label>
                  <input type="text" value={studentData.healthInfo.dental} readOnly />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Tình trạng đặc biệt:</h3>
              <textarea 
                value={studentData.specialCondition}
                readOnly
                placeholder="Bệnh mãn tính, dị ứng, phẫu thuật, tiền sử bệnh, các điều trị..."
              />
            </div>

            <div className="result-section">
              <label>Kết quả:</label>
              <div className={`result-value ${studentData.result.toLowerCase()}`}>
                {studentData.result}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HealthResults; 