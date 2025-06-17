import React, { useState } from 'react';
import './Medicine.css';
import Header from '../../components/parent/Header';
import Footer from '../../components/parent/Footer';

const Medicine = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    studentId: '',
    class: '',
    address: '',
    healthInfo: {
      height: '',
      weight: '',
      vision: '',
      hearing: '',
      dental: ''
    },
    medicineAmount: '',
    specialCondition: '',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="medicine-page">
      <Header activePage="medicine" />

      <main className="medicine-content">
        <div className="medicine-container">
          <h1>Yêu cầu nhận thuốc</h1>

          <form className="medicine-form" onSubmit={handleSubmit}>
            <div className="student-photo">
              <div className="photo-upload">
                {formData.photo ? (
                  <img src={formData.photo} alt="Student" />
                ) : (
                  <div className="photo-placeholder">
                    3x4
                  </div>
                )}
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="photo-input"
                />
                <label htmlFor="photo" className="upload-button">
                  Tải ảnh lên
                </label>
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="fullName">Họ và tên:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-section">
              <h3>Thông tin chung:</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Ngày sinh:</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Giới tính:</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="studentId">MSHS:</label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="class">Lớp:</label>
                  <input
                    type="text"
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="address">Địa chỉ:</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Thông tin sức khỏe:</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="height">Chiều cao:</label>
                  <div className="input-unit">
                    <input
                      type="number"
                      id="height"
                      name="healthInfo.height"
                      value={formData.healthInfo.height}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.1"
                    />
                    <span className="unit">cm</span>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="weight">Cân nặng:</label>
                  <div className="input-unit">
                    <input
                      type="number"
                      id="weight"
                      name="healthInfo.weight"
                      value={formData.healthInfo.weight}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.1"
                    />
                    <span className="unit">kg</span>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="vision">Thị lực:</label>
                  <input
                    type="text"
                    id="vision"
                    name="healthInfo.vision"
                    value={formData.healthInfo.vision}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hearing">Thính lực:</label>
                  <input
                    type="text"
                    id="hearing"
                    name="healthInfo.hearing"
                    value={formData.healthInfo.hearing}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dental">Răng miệng:</label>
                  <input
                    type="text"
                    id="dental"
                    name="healthInfo.dental"
                    value={formData.healthInfo.dental}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label htmlFor="medicineAmount">Liều lượng:</label>
                <input
                  type="text"
                  id="medicineAmount"
                  name="medicineAmount"
                  value={formData.medicineAmount}
                  onChange={handleChange}
                  required
                  placeholder="Nhập liều lượng thuốc cần dùng"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Tình trạng đặc biệt:</h3>
              <textarea
                id="specialCondition"
                name="specialCondition"
                value={formData.specialCondition}
                onChange={handleChange}
                placeholder="Nhập tình trạng bệnh hiện tại, dị ứng, các điều trị..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">Gửi yêu cầu</button>
              <button type="button" className="btn-cancel">Hủy</button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Medicine; 