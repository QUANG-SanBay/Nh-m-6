import React, { useState } from 'react';
import Header from '../../components/nurse/Header';
import Footer from '../../components/nurse/Footer';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [nurseData, setNurseData] = useState({
    name: 'Nguyễn Thị An',
    email: 'nurse@schoolhealth.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận XYZ, TP.HCM',
    department: 'Phòng Y tế Học đường',
    position: 'Y tá trưởng',
    qualification: 'Cử nhân Điều dưỡng',
    experience: '5 năm',
    specialization: 'Chăm sóc sức khỏe học đường',
    certifications: 'Chứng chỉ Sơ cấp cứu, Chứng chỉ Y tế học đường'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Implement API call to save data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNurseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="nurse-layout">
      <Header />
      <main className="profile-main">
        <div className="profile-container">
          <div className="profile-header">
            <h1>Thông tin cá nhân</h1>
            {!isEditing ? (
              <button className="edit-button" onClick={handleEdit}>
                <i className="fas fa-edit"></i>
                Chỉnh sửa
              </button>
            ) : (
              <button className="save-button" onClick={handleSave}>
                <i className="fas fa-save"></i>
                Lưu thay đổi
              </button>
            )}
          </div>

          <div className="profile-content">
            <div className="profile-sidebar">
              <div className="avatar-section">
                <img src="/nurse-avatar.png" alt="Avatar" className="profile-avatar" />
                <div className="avatar-upload">
                  <label htmlFor="avatar-input" className="upload-button">
                    <i className="fas fa-camera"></i>
                    Thay đổi ảnh
                  </label>
                  <input type="file" id="avatar-input" hidden />
                </div>
              </div>
              <div className="quick-info">
                <h3>{nurseData.name}</h3>
                <p className="position">{nurseData.position}</p>
                <p className="department">{nurseData.department}</p>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-section">
                <h2>Thông tin cơ bản</h2>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Họ và tên</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={nurseData.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{nurseData.name}</p>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={nurseData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{nurseData.email}</p>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Số điện thoại</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={nurseData.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{nurseData.phone}</p>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Địa chỉ</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={nurseData.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{nurseData.address}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h2>Thông tin chuyên môn</h2>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Chức vụ</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="position"
                        value={nurseData.position}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{nurseData.position}</p>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Trình độ</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="qualification"
                        value={nurseData.qualification}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{nurseData.qualification}</p>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Kinh nghiệm</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="experience"
                        value={nurseData.experience}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{nurseData.experience}</p>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Chuyên môn</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="specialization"
                        value={nurseData.specialization}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{nurseData.specialization}</p>
                    )}
                  </div>
                  <div className="detail-item full-width">
                    <label>Chứng chỉ</label>
                    {isEditing ? (
                      <textarea
                        name="certifications"
                        value={nurseData.certifications}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{nurseData.certifications}</p>
                    )}
                  </div>
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

export default Profile; 