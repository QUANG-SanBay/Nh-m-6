import React, { useState, useEffect } from 'react';
import './Profile.css';
import Header from '../../components/student/Header';
import Footer from '../../components/student/Footer';
import { fetchStudentById, updateStudentById } from '../../api/studentApi';
import { getUserId } from '../../utils/auth';

const StudentProfile = () => {
  const maHocSinh = getUserId();

  const [formData, setFormData] = useState({
    hoTen: '',
    lop: '',
    gioiTinh: '',
    ngaySinh: '',
    diaChi: '',
    tenNguoiLienHe: '',
    sdtNguoiLienHe: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await fetchStudentById(maHocSinh);
        setFormData(data);
        setOriginalData(data);
      } catch (error) {
        console.error('❌ Lỗi khi lấy dữ liệu học sinh:', error);
        alert('Không thể tải dữ liệu hồ sơ học sinh');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [maHocSinh]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudentById(maHocSinh, formData);
      alert('✅ Hồ sơ đã được cập nhật');
      setOriginalData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật hồ sơ:', error);
      alert('Không thể lưu hồ sơ học sinh');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const renderInput = (name, type = "text", isTextArea = false) => {
    const commonProps = {
      name,
      value: formData[name],
      onChange: handleChange,
      required: true,
      disabled: !isEditing
    };

    if (isTextArea) {
      return <textarea {...commonProps} />;
    }

    if (type === "select") {
      return (
        <select {...commonProps}>
          <option value="">-- Chọn giới tính --</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      );
    }

    return <input type={type} {...commonProps} />;
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Header activePage="profile" />
        <main className="profile-content">
          <div className="loading">⏳ Đang tải thông tin học sinh...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Header activePage="profile" />
      <main className="profile-content">
        <div className="profile-container">
          <h1>Hồ sơ học sinh</h1>

          {!isEditing && (
            <div className="edit-button-wrapper">
              <button
                type="button"
                className="btn-edit"
                onClick={handleEdit}
              >
                ✏️ Chỉnh sửa
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Họ và tên <span className="required">*</span></label>
              {renderInput("hoTen")}
            </div>
            <div className="form-group">
              <label>Lớp <span className="required">*</span></label>
              {renderInput("lop")}
            </div>
            <div className="form-group">
              <label>Giới tính <span className="required">*</span></label>
              {renderInput("gioiTinh", "select")}
            </div>
            <div className="form-group">
              <label>Ngày sinh <span className="required">*</span></label>
              {renderInput("ngaySinh", "date")}
            </div>
            <div className="form-group">
              <label>Địa chỉ <span className="required">*</span></label>
              {renderInput("diaChi", "text", true)}
            </div>

            <div className="form-section">
              <h3>Liên hệ khẩn cấp</h3>
              <div className="form-group">
                <label>Tên người liên hệ <span className="required">*</span></label>
                {renderInput("tenNguoiLienHe")}
              </div>
              <div className="form-group">
                <label>Số điện thoại liên hệ <span className="required">*</span></label>
                {renderInput("sdtNguoiLienHe", "tel")}
              </div>
            </div>

            {isEditing && (
              <div className="form-actions">
                <button type="submit" className="btn-save">💾 Lưu thông tin</button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>❌ Hủy</button>
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentProfile;
