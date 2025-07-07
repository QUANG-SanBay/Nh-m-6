import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../components/manager/Header';
import Footer from '../../../components/manager/Footer';
import './EditStudentHealth.css'; // Sẽ tạo file CSS sau

const EditStudentHealth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { student } = location.state || {};
  
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!student) {
      // Nếu không có dữ liệu, quay về trang danh sách
      navigate('/manager/student-health');
    } else {
      // Khởi tạo form với dữ liệu của học sinh
      setFormData({
        ...student,
        height: student.height || '',
        weight: student.weight || '',
        bloodType: student.bloodType || 'A+',
        allergies: student.allergies ? student.allergies.join(', ') : '',
        medicalHistory: student.medicalHistory ? student.medicalHistory.join(', ') : '',
      });
    }
  }, [student, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Xử lý dữ liệu mảng trước khi "lưu"
    const updatedStudent = {
      ...formData,
      allergies: formData.allergies.split(',').map(item => item.trim()).filter(Boolean),
      medicalHistory: formData.medicalHistory.split(',').map(item => item.trim()).filter(Boolean),
    };

    // Giả lập lưu vào API
    setTimeout(() => {
      console.log('Updated Student:', updatedStudent);
      setSaving(false);
      // Gửi dữ liệu đã cập nhật về trang danh sách
      navigate('/manager/student-health', { state: { updatedStudent } });
    }, 1000);
  };

  if (!formData) {
    return <div>Đang tải...</div>; // Hoặc một component loading đẹp hơn
  }

  return (
    <div className="nurse-layout">
      <Header />
      <main className="edit-student-main">
        <div className="edit-student-container">
          <div className="page-header">
            <h1>Chỉnh sửa hồ sơ sức khỏe</h1>
            <button className="back-button" onClick={() => navigate('/manager/student-health')}>
              <i className="fas fa-arrow-left"></i>
              Quay lại danh sách
            </button>
          </div>
          
          <form onSubmit={handleFormSubmit} className="edit-form">
            <div className="form-section">
              <h3 className="section-title">Thông tin cá nhân</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Mã học sinh</label>
                  <input type="text" value={formData.studentId} disabled />
                </div>
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Lớp</label>
                  <input type="text" name="class" value={formData.class} onChange={handleInputChange} required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Chỉ số sức khỏe</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Chiều cao (cm)</label>
                  <input type="number" name="height" value={formData.height} onChange={handleInputChange} placeholder="Nhập chiều cao" />
                </div>
                <div className="form-group">
                  <label>Cân nặng (kg)</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="Nhập cân nặng" />
                </div>
                <div className="form-group">
                  <label>Nhóm máu</label>
                  <select name="bloodType" value={formData.bloodType} onChange={handleInputChange}>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3 className="section-title">Thông tin y tế</h3>
              <div className="form-group">
                <label>Dị ứng (cách nhau bởi dấu phẩy)</label>
                <textarea name="allergies" value={formData.allergies} onChange={handleInputChange} placeholder="VD: Phấn hoa, Hải sản..."></textarea>
              </div>
              <div className="form-group">
                <label>Tiền sử bệnh án (cách nhau bởi dấu phẩy)</label>
                <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleInputChange} placeholder="VD: Hen suyễn, Đau dạ dày..."></textarea>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-black" disabled={saving}>
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    Lưu thay đổi
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditStudentHealth; 