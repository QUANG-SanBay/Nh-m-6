import React, { useState, useEffect } from 'react';
import './HealthInfo.css';
import Header from '../../components/parent/Header';
import Footer from '../../components/parent/Footer';

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

  // Lấy dữ liệu hồ sơ sức khỏe hiện có
  useEffect(() => {
    if (formData.studentId) {
      setLoading(true);
      fetch(`${API_BASE}/hoso-suckhoe/hocsinh/${formData.studentId}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            // Map dữ liệu từ backend sang formData nếu cần
            const hs = data[0];
            setFormData(prev => ({
              ...prev,
              fullName: hs.hocSinh?.hoTen || '',
              dateOfBirth: hs.hocSinh?.ngaySinh || '',
              gender: hs.hocSinh?.gioiTinh || '',
              studentId: hs.hocSinh?.maHocSinh || '',
              class: hs.hocSinh?.lop || '',
              address: hs.hocSinh?.diaChi || '',
              healthInfo: {
                height: hs.chieuCao || '',
                weight: hs.canNang || '',
                vision: hs.thiLuc || '',
                hearing: hs.thinhLuc || '',
                dental: hs.ketQuaRangMieng || ''
              },
              specialCondition: hs.benhManTinh || '',
              // photo: null // Không xử lý ảnh ở backend
            }));
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [formData.studentId]);

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
    setLoading(true);
    setMessage('');
    // Chuẩn bị dữ liệu gửi lên backend
    const payload = {
      // map lại đúng trường backend nếu cần
      maHoSo: undefined, // để backend tự sinh hoặc cập nhật
      diUng: '',
      benhManTinh: formData.specialCondition,
      tienSuDieuTri: '',
      thiLuc: formData.healthInfo.vision,
      thinhLuc: formData.healthInfo.hearing,
      lichSuTiemChung: '',
      ghiChu: '',
      ngayCapNhatCuoi: new Date().toISOString().slice(0, 10),
      chieuCao: formData.healthInfo.height,
      canNang: formData.healthInfo.weight,
      ketQuaRangMieng: formData.healthInfo.dental,
      hocSinh: {
        maHocSinh: formData.studentId,
        hoTen: formData.fullName,
        ngaySinh: formData.dateOfBirth,
        gioiTinh: formData.gender,
        lop: formData.class,
        diaChi: formData.address
      }
    };
    fetch(`${API_BASE}/hoso-suckhoe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Cập nhật thất bại');
      })
      .then(() => {
        setMessage('Cập nhật/Khai báo thành công!');
        setLoading(false);
      })
      .catch(() => {
        setMessage('Cập nhật/Khai báo thất bại!');
        setLoading(false);
      });
  };

  return (
    <div className="health-info-page">
      <Header activePage="health-info" />

      <main className="health-info-content">
        <div className="health-info-container">
          <h1>Khai báo / Cập nhật thông tin sức khỏe</h1>

          <form className="health-info-form" onSubmit={handleSubmit}>
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
              <h3>Tình trạng đặc biệt:</h3>
              <textarea
                id="specialCondition"
                name="specialCondition"
                value={formData.specialCondition}
                onChange={handleChange}
                placeholder="Bệnh mãn tính, dị ứng, phẫu thuật, tiền sử bệnh, các điều trị..."
              />
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

export default HealthInfo; 