import React, { useEffect, useState } from 'react';
import Header from '../../components/manager/Header';
import Footer from '../../components/manager/Footer';
import '../../styles/Profile.css';

const ManagerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [managerData, setManagerData] = useState({
    name: 'Đong Văn A',
    email: 'manager@schoolhealth.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận XYZ, TP.HCM',
    department: 'THPT NTA',
    position: 'quản lý nhà trường',
    qualification: 'giáo viên xuất sắc',
    experience: '5 năm',
    specialization: 'Quản lý y tế học đường',
    certifications: 'chứng chỉ quản lý y tế, chứng chỉ giáo dục sức khỏe',
  });

  useEffect(() => {
    // Lấy username từ localStorage
    const username = localStorage.getItem('username');
    if (!username) {
      alert('Không tìm thấy thông tin đăng nhập!');
      return;
    }
    fetch(`http://localhost:8080/api/manager/profile?username=${username}`)
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Implement API call to save data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManagerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!profile) return <div>Đang tải thông tin...</div>;

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
                <img src="/manager-avatar.png" alt="Avatar" className="profile-avatar" />
                <div className="avatar-upload">
                  <label htmlFor="avatar-input" className="upload-button">
                    <i className="fas fa-camera"></i>
                    Thay đổi ảnh
                  </label>
                  <input type="file" id="avatar-input" hidden />
                </div>
              </div>
              <div className="quick-info">
                <h3>{managerData.name}</h3>
                <p className="position">{managerData.position}</p>
                <p className="department">{managerData.department}</p>
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
                        value={managerData.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{managerData.name}</p>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={managerData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{managerData.email}</p>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Số điện thoại</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={managerData.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{managerData.phone}</p>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Địa chỉ</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={managerData.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{managerData.address}</p>
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
                        value={managerData.position}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{managerData.position}</p>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Trình độ</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="qualification"
                        value={managerData.qualification}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{managerData.qualification}</p>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Kinh nghiệm</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="experience"
                        value={managerData.experience}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{managerData.experience}</p>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Chuyên môn</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="specialization"
                        value={managerData.specialization}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{managerData.specialization}</p>
                    )}
                  </div>
                  <div className="detail-item full-width">
                    <label>Chứng chỉ</label>
                    {isEditing ? (
                      <textarea
                        name="certifications"
                        value={managerData.certifications}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p>{managerData.certifications}</p>
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

export default ManagerProfile; 