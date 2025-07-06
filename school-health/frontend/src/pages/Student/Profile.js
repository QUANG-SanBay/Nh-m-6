import React, { useState } from 'react';
import './Profile.css';
import Header from '../../components/student/Header';
import Footer from '../../components/student/Footer';

const StudentProfile = () => {
  const [formData, setFormData] = useState({
    hoTen: '',
    lop: '',
    gioiTinh: '',
    ngaySinh: '',
    diaChi: '',
    tenNguoiLienHe: '',
    sdtNguoiLienHe: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
const handleSubmit = (e) => {
  e.preventDefault();
  alert('✅Hồ sơ đã lưu');
  console.log('Dữ liệu:', formData);
};
  return (
    <div className="profile-page">
      <Header activePage="profile" />

      <main className="profile-content">
        <div className="profile-container">
          <h1>Hồ sơ học sinh</h1>
          <form onSubmit={handleSubmit} className="profile-form">

            <div className="form-group">
              <label htmlFor="hoTen">Họ và tên <span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                id="hoTen"
                name="hoTen"
                value={formData.hoTen}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lop">Lớp <span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                id="lop"
                name="lop"
                value={formData.lop}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gioiTinh">Giới tính <span style={{ color: 'red' }}>*</span></label>
              <select
                id="gioiTinh"
                name="gioiTinh"
                value={formData.gioiTinh}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="ngaySinh">Ngày sinh <span style={{ color: 'red' }}>*</span></label>
              <input
                type="date"
                id="ngaySinh"
                name="ngaySinh"
                value={formData.ngaySinh}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="diaChi">Địa chỉ <span style={{ color: 'red' }}>*</span></label>
              <textarea
                id="diaChi"
                name="diaChi"
                value={formData.diaChi}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-section">
              <h3>Liên hệ khẩn cấp</h3>

              <div className="form-group">
                <label htmlFor="tenNguoiLienHe">Tên người liên hệ <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  id="tenNguoiLienHe"
                  name="tenNguoiLienHe"
                  value={formData.tenNguoiLienHe}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="sdtNguoiLienHe">Số điện thoại liên hệ <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="tel"
                  id="sdtNguoiLienHe"
                  name="sdtNguoiLienHe"
                  value={formData.sdtNguoiLienHe}
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

export default StudentProfile;
