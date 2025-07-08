import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../components/manager/Header';
import Footer from '../../../components/manager/Footer';
import './StudentHealthDetail.css';

const StudentHealthDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - replace with API call
  const [studentHealth, setStudentHealth] = useState({
    id: id,
    name: 'Nguyễn Văn A',
    studentId: 'HS001',
    class: '10A1',
    dateOfBirth: '2008-05-15',
    gender: 'Nam',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    height: 165,
    weight: 55,
    bloodType: 'A+',
    vision: '20/20',
    teethCondition: 'Tốt',
    generalHealth: 'Bình thường',
    specialConditions: 'Không có',
    lastExamDate: '2024-01-15',
    avatar: 'https://via.placeholder.com/150' // Thêm avatar mặc định
  });

  const handleSave = () => {
    // API call to save changes
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentHealth(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="nurse-layout">
      <Header />
      <main className="health-detail-main">
        <div className="health-detail-container">
          <div className="detail-header">
            <div className="header-left">
              <button className="back-button" onClick={() => navigate('/manager/student-health')}>
                <i className="fas fa-arrow-left"></i>
                Quay lại
              </button>
              <h1>Hồ sơ sức khỏe học sinh</h1>
            </div>
            <div className="header-actions">
              {!isEditing ? (
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  <i className="fas fa-edit"></i>
                  Chỉnh sửa
                </button>
              ) : (
                <>
                  <button className="cancel-button" onClick={() => setIsEditing(false)}>
                    <i className="fas fa-times"></i>
                    Hủy
                  </button>
                  <button className="save-button" onClick={handleSave}>
                    <i className="fas fa-save"></i>
                    Lưu thay đổi
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="health-record">
            <div className="record-section">
              <div className="student-avatar">
                <img src={studentHealth.avatar} alt={`${studentHealth.name}'s avatar`} />
                {isEditing && (
                  <div className="avatar-edit">
                    <input
                      type="text"
                      name="avatar"
                      value={studentHealth.avatar}
                      onChange={handleInputChange}
                      placeholder="Nhập URL ảnh đại diện"
                    />
                  </div>
                )}
              </div>
              <h2>Thông tin chung</h2>
              <div className="info-grid">
                <div className="info-group">
                  <label>Họ và tên</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={studentHealth.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.name}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Mã học sinh</label>
                  <span>{studentHealth.studentId}</span>
                </div>
                <div className="info-group">
                  <label>Lớp</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="class"
                      value={studentHealth.class}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.class}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Ngày sinh</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={studentHealth.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{new Date(studentHealth.dateOfBirth).toLocaleDateString('vi-VN')}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Giới tính</label>
                  {isEditing ? (
                    <select name="gender" value={studentHealth.gender} onChange={handleInputChange}>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  ) : (
                    <span>{studentHealth.gender}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Địa chỉ</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={studentHealth.address}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.address}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="record-section">
              <h2>Thông tin sức khỏe</h2>
              <div className="info-grid">
                <div className="info-group">
                  <label>Chiều cao (cm)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="height"
                      value={studentHealth.height}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.height}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Cân nặng (kg)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="weight"
                      value={studentHealth.weight}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.weight}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Nhóm máu</label>
                  {isEditing ? (
                    <select name="bloodType" value={studentHealth.bloodType} onChange={handleInputChange}>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  ) : (
                    <span>{studentHealth.bloodType}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Thị lực</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="vision"
                      value={studentHealth.vision}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.vision}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Tình trạng răng miệng</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="teethCondition"
                      value={studentHealth.teethCondition}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.teethCondition}</span>
                  )}
                </div>
                <div className="info-group full-width">
                  <label>Tình trạng sức khỏe chung</label>
                  {isEditing ? (
                    <textarea
                      name="generalHealth"
                      value={studentHealth.generalHealth}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.generalHealth}</span>
                  )}
                </div>
                <div className="info-group full-width">
                  <label>Bệnh đặc biệt</label>
                  {isEditing ? (
                    <textarea
                      name="specialConditions"
                      value={studentHealth.specialConditions}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.specialConditions}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Ngày khám gần nhất</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="lastExamDate"
                      value={studentHealth.lastExamDate}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{new Date(studentHealth.lastExamDate).toLocaleDateString('vi-VN')}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentHealthDetail; 