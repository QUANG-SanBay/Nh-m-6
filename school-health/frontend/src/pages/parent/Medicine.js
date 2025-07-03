import React, { useState, useEffect } from 'react';
import './Medicine.css';
import Header from '../../components/parent/Header';
import Footer from '../../components/parent/Footer';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080/api';

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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Thêm useEffect để tự động điền thông tin khi nhập mã học sinh
  useEffect(() => {
    const loadStudentInfo = async () => {
      if (!formData.studentId) return;
      
      try {
        setLoading(true);
        
        // Gọi API để lấy thông tin hồ sơ sức khỏe của học sinh
        const response = await fetch(`${API_BASE}/hoso-suckhoe/hocsinh/${formData.studentId}`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (Array.isArray(data) && data.length > 0) {
            const hoSo = data[0];
            setFormData(prev => ({
              ...prev,
              fullName: hoSo.hocSinh.hoTen || prev.fullName,
              dateOfBirth: hoSo.hocSinh.ngaySinh ? formatDate(hoSo.hocSinh.ngaySinh) : prev.dateOfBirth,
              gender: hoSo.hocSinh.gioiTinh || prev.gender,
              class: hoSo.hocSinh.lop || prev.class,
              address: hoSo.hocSinh.diaChi || prev.address,
              healthInfo: {
                height: hoSo.chieuCao ? hoSo.chieuCao.toString() : prev.healthInfo.height,
                weight: hoSo.canNang ? hoSo.canNang.toString() : prev.healthInfo.weight,
                vision: hoSo.thiLuc || prev.healthInfo.vision,
                hearing: hoSo.thinhLuc || prev.healthInfo.hearing,
                dental: hoSo.ketQuaRangMieng || prev.healthInfo.dental
              },
              photo: hoSo.anhHocSinh ? 
                (hoSo.anhHocSinh.startsWith('data:') ? 
                  hoSo.anhHocSinh : 
                  `${API_BASE}${hoSo.anhHocSinh}`) 
                : prev.photo
            }));
            
            setMessage('Đã tải thông tin học sinh thành công');
            setMessageType('success');
          } else {
            setMessage('Không tìm thấy thông tin học sinh với mã này');
            setMessageType('error');
          }
        } else {
          setMessage('Không tìm thấy thông tin học sinh với mã này');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Error loading student info:', error);
        setMessage('Lỗi khi tải thông tin học sinh');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };

    // Debounce để tránh gọi API quá nhiều lần
    const timeoutId = setTimeout(() => {
      if (formData.studentId && formData.studentId.length >= 3) {
        loadStudentInfo();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.studentId]);

  // Hàm hỗ trợ định dạng ngày từ dạng Date sang yyyy-MM-dd
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
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

    // Clear message khi user thay đổi mã học sinh
    if (name === 'studentId') {
      setMessage('');
      setMessageType('');
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

    if (!formData.medicineAmount) {
      setMessage('Vui lòng nhập liều lượng thuốc');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Create medicine request payload theo format API yêu cầu thuốc
      const medicineRequest = {
        hocSinh: {
          maHocSinh: formData.studentId
        },
        lieuLuong: formData.medicineAmount,
        moTa: `Thông tin sức khỏe: Chiều cao: ${formData.healthInfo.height}cm, Cân nặng: ${formData.healthInfo.weight}kg, Thị lực: ${formData.healthInfo.vision}, Thính lực: ${formData.healthInfo.hearing}, Răng miệng: ${formData.healthInfo.dental}`,
        tinhTrangDacBiet: formData.specialCondition,
        ghiChu: `Thông tin bổ sung: Họ tên: ${formData.fullName}, Ngày sinh: ${formData.dateOfBirth}, Giới tính: ${formData.gender}, Lớp: ${formData.class}, Địa chỉ: ${formData.address}. ${formData.photo ? "Đã đính kèm ảnh" : "Không có ảnh đính kèm"}`
      };

      // Call API để tạo yêu cầu thuốc
      const response = await fetch(`${API_BASE}/yeu-cau-thuoc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicineRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Có lỗi xảy ra khi gửi yêu cầu thuốc');
      }

      // Remove unused result variable
      await response.json();
      
      setMessage('Gửi yêu cầu nhận thuốc thành công! Vui lòng chờ nhân viên y tế xử lý.');
      setMessageType('success');
      
      // Reset form after successful submission
      setFormData({
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
      
    } catch (error) {
      console.error('Error creating medicine request:', error);
      setMessage(error.message || 'Có lỗi xảy ra khi gửi yêu cầu thuốc');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medicine-page">
      <Header activePage="medicine" />
      
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang xử lý...</p>
        </div>
      )}

      <main className="medicine-content">
        <div className="medicine-container">
          <h1>Yêu cầu nhận thuốc</h1>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <form className="medicine-form" onSubmit={handleSubmit}>
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
                      required
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
                      required
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
                    required
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
                    required
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
                    required
                  />
                </div>
              </div>
            </div>

            {/* Thông tin thuốc */}
            <div className="form-section">
              <h3>Thông tin thuốc</h3>
              
              <div className="form-group">
                <label>Liều lượng:</label>
                <input
                  type="text"
                  name="medicineAmount"
                  value={formData.medicineAmount}
                  onChange={handleChange}
                  placeholder="Nhập liều lượng thuốc cần dùng (VD: 2 viên/ngày, 5ml/lần)"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Tình trạng đặc biệt/Dị ứng:</label>
                <textarea
                  name="specialCondition"
                  value={formData.specialCondition}
                  onChange={handleChange}
                  placeholder="Mô tả tình trạng bệnh hiện tại, dị ứng, các điều trị đang thực hiện..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => window.history.back()}>
                Hủy
              </button>
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Medicine;