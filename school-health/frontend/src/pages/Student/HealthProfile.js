import React, { useState, useEffect } from 'react';
import Header from '../../components/student/Header';
import Footer from '../../components/student/Footer';
import { fetchStudentHealthRecord, updateStudentHealthRecordByStudentId } from '../../api/studentApi';
import { getUserRole, getToken } from '../../utils/auth';
import './HealthProfile.css';
import { useNavigate } from 'react-router-dom';

function HealthProfile() {
  const navigate = useNavigate();
  const maHocSinh = localStorage.getItem('maHocSinh');

  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const role = getUserRole();
    if (!token || !maHocSinh || role !== 'HOC_SINH') {
      navigate('/login');
    }
  }, [navigate, maHocSinh]);

  const isFormChanged = () => {
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  };

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await fetchStudentHealthRecord(maHocSinh);
        const filledData = {
          maHoSo: data.maHoSo || '',
          chieuCao: data.chieuCao || '',
          canNang: data.canNang || '',
          nhomMau: data.nhomMau || '',
          thiLuc: data.thiLuc || '',
          thinhLuc: data.thinhLuc || '',
          tienSuDieuTri: data.tienSuDieuTri || '',
          benhManTinh: data.benhManTinh || '',
          diUng: data.diUng || '',
          ketQuaRangMieng: data.ketQuaRangMieng || '',
          ghiChu: data.ghiChu || '',
          anhHocSinh: data.anhHocSinh || '',
          maHocSinh: maHocSinh,
        };
        setOriginalData(filledData);
        setFormData(filledData);
      } catch (error) {
        const empty = {
          maHoSo: '',
          chieuCao: '',
          canNang: '',
          nhomMau: '',
          thiLuc: '',
          thinhLuc: '',
          tienSuDieuTri: '',
          benhManTinh: '',
          diUng: '',
          ketQuaRangMieng: '',
          ghiChu: '',
          anhHocSinh: '',
          maHocSinh: maHocSinh,
        };
        setOriginalData(empty);
        setFormData(empty);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, [maHocSinh]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, anhHocSinh: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing) return;
    if (!isFormChanged()) {
      alert('⚠️ Bạn chưa thay đổi thông tin nào');
      return;
    }

    const cleanedData = { ...formData };
    if (!cleanedData.anhHocSinh?.trim()) {
      delete cleanedData.anhHocSinh;
    }

    try {
      const response = await updateStudentHealthRecordByStudentId(maHocSinh, cleanedData);
      if (response?.data) {
        cleanedData.maHoSo = response.data.maHoSo;
      }
      alert('✅ Cập nhật thành công');
      setOriginalData(cleanedData);
      setFormData(cleanedData);
      setIsEditing(false);
    } catch (error) {
      alert('❌ Không thể lưu thông tin sức khỏe');
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const renderInput = (name, label, type = 'text', isTextArea = false) => (
    <div className="form-group">
      <label>{label}</label>
      {isEditing ? (
        isTextArea ? (
          <textarea name={name} value={formData[name]} onChange={handleChange} />
        ) : (
          <input type={type} name={name} value={formData[name]} onChange={handleChange} />
        )
      ) : (
        <p className="readonly-text">{formData[name] || <em>Chưa cập nhật</em>}</p>
      )}
    </div>
  );

  if (loading || !formData) {
    return (
      <div className="profile-page">
        <Header activePage="health" />
        <main className="profile-content">
          <div className="loading">⏳ Đang tải dữ liệu...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Header activePage="health" />
      <main className="profile-content">
        <div className="profile-container">
          <h1>Thông tin sức khỏe</h1>

          {!isEditing && (
            <div className="edit-button-wrapper">
              <button
                type="button"
                className="btn-edit"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Chỉnh sửa
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Ảnh học sinh:</label>
              {formData.anhHocSinh && (
                <img src={formData.anhHocSinh} alt="avatar" className="avatar-preview" />
              )}
              {isEditing && (
                <input type="file" accept="image/*" onChange={handleImageChange} />
              )}
            </div>

            {renderInput('chieuCao', 'Chiều cao (cm)', 'number')}
            {renderInput('canNang', 'Cân nặng (kg)', 'number')}
            {renderInput('nhomMau', 'Nhóm máu')}
            {renderInput('thiLuc', 'Thị lực')}
            {renderInput('thinhLuc', 'Thính lực')}
            {renderInput('tienSuDieuTri', 'Tiền sử điều trị', 'text', true)}
            {renderInput('benhManTinh', 'Bệnh mãn tính', 'text', true)}
            {renderInput('diUng', 'Dị ứng', 'text', true)}
            {renderInput('ketQuaRangMieng', 'Kết quả răng miệng', 'text', true)}
            {renderInput('ghiChu', 'Ghi chú', 'text', true)}

            {isEditing && (
              <div className="form-actions">
                <button type="submit" className="btn-save">💾 Lưu</button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>❌ Hủy</button>
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HealthProfile;
