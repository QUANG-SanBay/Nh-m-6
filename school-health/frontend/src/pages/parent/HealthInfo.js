import React, { useState, useEffect } from 'react';
import { updateHealthInfo, getHealthInfoByStudentId, createHealthRecordForStudent } from '../../api/parentApi';
import Header from '../../components/parent/Header';
import Footer from '../../components/parent/Footer';
import './HealthInfo.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080/api';

const HealthInfo = () => {
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
    specialCondition: '',
    photo: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Lấy dữ liệu hồ sơ sức khỏe hiện có
  useEffect(() => {
    const loadHealthInfo = async () => {
      if (!formData.studentId) return;
      
      try {
        setLoading(true);
        const data = await getHealthInfoByStudentId(formData.studentId);
        
        if (Array.isArray(data) && data.length > 0) {
          const hoSo = data[0];
          const studentInfo = hoSo.hocSinh || {};
          setFormData(prev => ({
            ...prev,
            fullName: studentInfo.hoTen || prev.fullName,
            dateOfBirth: studentInfo.ngaySinh ? formatDate(studentInfo.ngaySinh) : prev.dateOfBirth,
            gender: studentInfo.gioiTinh || prev.gender,
            class: studentInfo.lop || prev.class,
            address: studentInfo.diaChi || prev.address,
            healthInfo: {
              height: hoSo.chieuCao ? hoSo.chieuCao.toString() : '',
              weight: hoSo.canNang ? hoSo.canNang.toString() : '',
              vision: hoSo.thiLuc || '',
              hearing: hoSo.thinhLuc || '',
              dental: hoSo.ketQuaRangMieng || ''
            },
            specialCondition: hoSo.diUng || hoSo.benhManTinh || '',
            photo: hoSo.anhHocSinh ? 
              (hoSo.anhHocSinh.startsWith('data:') ? 
                hoSo.anhHocSinh : 
                `${API_BASE}${hoSo.anhHocSinh}`) 
              : null
          }));
        }
      } catch (error) {
        console.error('Error loading health info:', error);
        setMessage('Không thể tải thông tin hồ sơ sức khỏe');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };

    if (formData.studentId) {
      loadHealthInfo();
    }
  }, [formData.studentId]);

  // Hàm hỗ trợ định dạng ngày từ dạng Date sang yyyy-MM-dd
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Hàm chuyển đổi ngày từ yyyy-MM-dd sang Date object
  const parseDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('healthInfo.')) {
      const healthField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        healthInfo: {
          ...prev.healthInfo,
          [healthField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Hàm nén ảnh
  const compressImage = (base64Image, maxWidth = 400, quality = 0.5) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Tính toán kích thước mới
        let { width, height } = img;
        
        // Giảm kích thước nếu ảnh quá lớn
        if (width > maxWidth || height > maxWidth) {
          const ratio = Math.min(maxWidth / width, maxWidth / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Vẽ ảnh với kích thước mới
        ctx.drawImage(img, 0, 0, width, height);
        
        // Chuyển đổi thành base64 với chất lượng thấp hơn
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.src = base64Image;
    });
  };

  // Cập nhật hàm xử lý ảnh
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Giảm giới hạn kích thước file
      if (file.size > 2 * 1024 * 1024) { // 2MB
        setMessage('Kích thước ảnh không được vượt quá 2MB');
        setMessageType('error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // Nén ảnh với chất lượng thấp hơn
          const compressedImage = await compressImage(e.target.result, 300, 0.4);
          
          // Kiểm tra kích thước sau khi nén
          const sizeInBytes = compressedImage.length * 0.75; // Ước tính kích thước
          if (sizeInBytes > 500 * 1024) { // 500KB
            setMessage('Ảnh sau khi nén vẫn quá lớn. Vui lòng chọn ảnh khác.');
            setMessageType('error');
            return;
          }
          
          setFormData(prev => ({
            ...prev,
            photo: compressedImage
          }));
          
          setMessage('Ảnh đã được nén và tải lên thành công');
          setMessageType('success');
        } catch (error) {
          setMessage('Lỗi khi xử lý ảnh');
          setMessageType('error');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.studentId) {
      setMessage('Vui lòng nhập mã học sinh');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const healthData = {
        studentId: formData.studentId,
        chieuCao: formData.healthInfo.height,
        canNang: formData.healthInfo.weight,
        thiLuc: formData.healthInfo.vision,
        thinhLuc: formData.healthInfo.hearing,
        ketQuaRangMieng: formData.healthInfo.dental,
        diUng: formData.specialCondition,
        benhManTinh: '',
        tienSuDieuTri: '',
        ghiChu: '',
        anhHocSinh: formData.photo,
        nhomMau: '',
        tinhTrangSucKhoe: 'Bình thường'
      };

      await updateHealthInfo(healthData);
      setMessage('Cập nhật hồ sơ sức khỏe thành công!');
      setMessageType('success');
      
    } catch (error) {
      setMessage(error.message || 'Có lỗi xảy ra khi cập nhật hồ sơ sức khỏe');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="health-info-page">
      <Header activePage="health-info" />
      
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang xử lý...</p>
        </div>
      )}
      
      <main className="health-info-content">
        <div className="health-info-container">
          <h1>Khai báo / Cập nhật thông tin sức khỏe</h1>
          
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}
          
          <form className="health-info-form" onSubmit={handleSubmit}>
            {/* Ảnh học sinh */}
            <div className="student-photo">
              <div className="photo-upload">
                {formData.photo ? (
                  <img src={formData.photo} alt="Ảnh học sinh" />
                ) : (
                  <div className="photo-placeholder">
                    <i className="fas fa-user"></i>
                    <span>Ảnh học sinh</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="photo-input"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="upload-button">
                  <i className="fas fa-camera"></i>
                  Chọn ảnh
                </label>
              </div>
            </div>

            {/* Thông tin cá nhân */}
            <div className="form-section">
              <h3>Thông tin cá nhân</h3>
              
              <div className="form-row">
                <label>Mã học sinh:</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Họ và tên:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Ngày sinh:</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Giới tính:</label>
                  <select
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
                  <label>Lớp:</label>
                  <input
                    type="text"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group full-width">
                  <label>Địa chỉ:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Thông tin sức khỏe */}
            <div className="form-section">
              <h3>Thông tin sức khỏe</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Chiều cao:</label>
                  <div className="input-unit">
                    <input
                      type="number"
                      name="healthInfo.height"
                      value={formData.healthInfo.height}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      placeholder="Nhập chiều cao"
                    />
                    <span className="unit">cm</span>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Cân nặng:</label>
                  <div className="input-unit">
                    <input
                      type="number"
                      name="healthInfo.weight"
                      value={formData.healthInfo.weight}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      placeholder="Nhập cân nặng"
                    />
                    <span className="unit">kg</span>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Thị lực:</label>
                  <input
                    type="text"
                    name="healthInfo.vision"
                    value={formData.healthInfo.vision}
                    onChange={handleChange}
                    placeholder="VD: 10/10, 8/10"
                  />
                </div>
                
                <div className="form-group">
                  <label>Thính lực:</label>
                  <input
                    type="text"
                    name="healthInfo.hearing"
                    value={formData.healthInfo.hearing}
                    onChange={handleChange}
                    placeholder="VD: Bình thường, Kém"
                  />
                </div>
                
                <div className="form-group">
                  <label>Răng miệng:</label>
                  <input
                    type="text"
                    name="healthInfo.dental"
                    value={formData.healthInfo.dental}
                    onChange={handleChange}
                    placeholder="VD: Tốt, Sâu răng"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label>Tình trạng đặc biệt/Dị ứng:</label>
                  <textarea
                    name="specialCondition"
                    value={formData.specialCondition}
                    onChange={handleChange}
                    placeholder="Mô tả các tình trạng đặc biệt, dị ứng, bệnh mãn tính..."
                  />
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => window.history.back()}>
                Hủy
              </button>
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Đang cập nhật...' : 'Cập nhật hồ sơ'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HealthInfo;