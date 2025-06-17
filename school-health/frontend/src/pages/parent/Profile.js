import React, { useState } from 'react';
import './Profile.css';
import Header from '../../components/parent/Header';
import Footer from '../../components/parent/Footer';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    relationship: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="profile-page">
      <Header activePage="profile" />

      {/* Main Content */}
      <main className="profile-content">
        <div className="profile-container">
          <h1>Thông tin cá nhân</h1>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="fullName">Họ và tên</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="relationship">Quan hệ với học sinh</label>
              <select
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                required
              >
                <option value="">Chọn quan hệ</option>
                <option value="father">Cha</option>
                <option value="mother">Mẹ</option>
                <option value="guardian">Người giám hộ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="address">Địa chỉ</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-section">
              <h3>Thông tin liên hệ khẩn cấp</h3>
              <div className="form-group">
                <label htmlFor="emergencyContact">Tên người liên hệ</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyPhone">Số điện thoại liên hệ</label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">Lưu thông tin</button>
              <button type="button" className="btn-cancel">Hủy</button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile; 