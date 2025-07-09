import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../components/manager/Header';
import Footer from '../../../components/manager/Footer';
import { fetchStudentById, fetchStudentHealthRecord, updateStudentHealthRecordByStudentId, createStudentHealthRecord } from '../../../api/studentApi';
import './StudentHealthDetail.css';

const StudentHealthDetailManager = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentHealth, setStudentHealth] = useState(null);
  const [healthRecord, setHealthRecord] = useState(null);

  // Load student and health record data
  const loadStudentData = async () => {
    try {
      setLoading(true);
      
      // Fetch student basic info
      const studentData = await fetchStudentById(id);
      
      // Fetch health record
      let healthRecordData = null;
      try {
        healthRecordData = await fetchStudentHealthRecord(id);
      } catch (healthError) {
        // Health record might not exist, which is a valid case
        console.log(`No health record found for student ${id}. A new one can be created.`);
      }
      
      // Combine student data with health record
      const combinedData = {
        id: studentData.maHocSinh,
        name: studentData.hoTen,
        studentId: studentData.maHocSinh,
        class: studentData.lop,
        dateOfBirth: studentData.ngaySinh,
        gender: studentData.gioiTinh,
        address: studentData.diaChi,
        height: healthRecordData?.chieuCao || 0,
        weight: healthRecordData?.canNang || 0,
        bloodType: healthRecordData?.nhomMau || 'Chưa xác định',
        vision: healthRecordData?.thiLuc || 'Chưa kiểm tra',
        hearing: healthRecordData?.thinhLuc || 'Chưa kiểm tra',
        teethCondition: healthRecordData?.ketQuaRangMieng || 'Chưa kiểm tra',
        generalHealth: healthRecordData?.tinhTrangSucKhoe || 'Chưa đánh giá',
        allergies: healthRecordData?.diUng || 'Không có',
        chronicDiseases: healthRecordData?.benhManTinh || 'Không có',
        medicalHistory: healthRecordData?.tienSuDieuTri || 'Không có',
        vaccinationHistory: healthRecordData?.lichSuTiemChung || 'Chưa cập nhật',
        notes: healthRecordData?.ghiChu || '',
        lastExamDate: healthRecordData?.ngayCapNhatCuoi || 'Chưa cập nhật',
        avatar: healthRecordData?.anhHocSinh || 'https://via.placeholder.com/150'
      };
      
      setStudentHealth(combinedData);
      setHealthRecord(healthRecordData);
      
    } catch (error) {
      console.error('Error loading student data:', error);
      setError('Không thể tải thông tin học sinh. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadStudentData();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      const healthData = {
        chieuCao: parseFloat(studentHealth.height) || 0,
        canNang: parseFloat(studentHealth.weight) || 0,
        nhomMau: studentHealth.bloodType,
        thiLuc: studentHealth.vision,
        thinhLuc: studentHealth.hearing,
        ketQuaRangMieng: studentHealth.teethCondition,
        tinhTrangSucKhoe: studentHealth.generalHealth,
        diUng: studentHealth.allergies,
        benhManTinh: studentHealth.chronicDiseases,
        tienSuDieuTri: studentHealth.medicalHistory,
        lichSuTiemChung: studentHealth.vaccinationHistory,
        ghiChu: studentHealth.notes,
        anhHocSinh: studentHealth.avatar
      };
      
      if (healthRecord && healthRecord.maHoSo) {
        // Update existing health record
        const updatedRecord = {
          ...healthRecord,
          ...healthData
        };
        
        await updateStudentHealthRecordByStudentId(id, updatedRecord);
        alert('Cập nhật hồ sơ sức khỏe thành công!');
      } else {
        // Create new health record
        const healthDataForCreation = {
            ...healthData,
            maHocSinh: id
        };
        const result = await createStudentHealthRecord(healthDataForCreation);
        setHealthRecord(result); // Save the newly created record info
        alert('Tạo mới hồ sơ sức khỏe thành công!');
      }
      
      setIsEditing(false);
      // Reload data to show the latest updates
      loadStudentData();

    } catch (error) {
      console.error('Error saving student health data:', error);
      setError('Không thể lưu thông tin sức khỏe. Vui lòng thử lại.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally, you can reload the data to discard unsaved changes
    // loadStudentData();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentHealth(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="nurse-layout">
        <Header />
        <main className="health-detail-main">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Đang tải thông tin học sinh...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="nurse-layout">
        <Header />
        <main className="health-detail-main">
          <div className="error-container">
            <div className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className="retry-button">
                Thử lại
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!studentHealth) {
    return (
      <div className="nurse-layout">
        <Header />
        <main className="health-detail-main">
          <div className="error-container">
            <div className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              <p>Không tìm thấy thông tin học sinh.</p>
              <button onClick={() => navigate('/manager/student-health')} className="retry-button">
                Quay lại danh sách
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="nurse-layout">
        <Header />
        <main className="health-detail-main">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Đang tải thông tin học sinh...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="nurse-layout">
        <Header />
        <main className="health-detail-main">
          <div className="error-container">
            <div className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              <p>{error}</p>
              <button onClick={() => navigate('/manager/student-health')} className="retry-button">
                Quay lại danh sách
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!studentHealth) {
    return (
      <div className="nurse-layout">
        <Header />
        <main className="health-detail-main">
          <div className="error-container">
            <div className="error-message">
              <i className="fas fa-user-slash"></i>
              <p>Không tìm thấy thông tin học sinh</p>
              <button onClick={() => navigate('/manager/student-health')} className="retry-button">
                Quay lại danh sách
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="nurse-layout">
      <Header />
      <main className="health-detail-main">
        <div className="health-detail-container">
          <div className="detail-header">
            <div className="header-left">
              <button className="back-button" onClick={() => navigate('/manager/student-health')}>
                <i className="fas fa-arrow-left"></i>
                Quay lại
              </button>
              <h1>Hồ sơ sức khỏe học sinh</h1>
            </div>
            <div className="header-actions">
              {!isEditing ? (
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  <i className="fas fa-edit"></i>
                  Chỉnh sửa
                </button>
              ) : (
                <>
                  <button className="cancel-button" onClick={() => setIsEditing(false)}>
                    <i className="fas fa-times"></i>
                    Hủy
                  </button>
                  <button className="save-button" onClick={handleSave}>
                    <i className="fas fa-save"></i>
                    Lưu thay đổi
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="health-record">
            <div className="record-section">
              <div className="student-avatar">
                <img src={studentHealth.avatar} alt={`${studentHealth.name}'s avatar`} />
                {isEditing && (
                  <div className="avatar-edit">
                    <input
                      type="text"
                      name="avatar"
                      value={studentHealth.avatar}
                      onChange={handleInputChange}
                      placeholder="Nhập URL ảnh đại diện"
                    />
                  </div>
                )}
              </div>
              <h2>Thông tin chung</h2>
              <div className="info-grid">
                <div className="info-group">
                  <label>Họ và tên</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={studentHealth.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.name}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Mã học sinh</label>
                  <span>{studentHealth.studentId}</span>
                </div>
                <div className="info-group">
                  <label>Lớp</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="class"
                      value={studentHealth.class}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.class}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Ngày sinh</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={studentHealth.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{new Date(studentHealth.dateOfBirth).toLocaleDateString('vi-VN')}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Giới tính</label>
                  {isEditing ? (
                    <select name="gender" value={studentHealth.gender} onChange={handleInputChange}>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  ) : (
                    <span>{studentHealth.gender}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Địa chỉ</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={studentHealth.address}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.address}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="record-section">
              <h2>Thông tin sức khỏe</h2>
              <div className="info-grid">
                <div className="info-group">
                  <label>Chiều cao (cm)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="height"
                      value={studentHealth.height}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.height}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Cân nặng (kg)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="weight"
                      value={studentHealth.weight}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.weight}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Nhóm máu</label>
                  {isEditing ? (
                    <select name="bloodType" value={studentHealth.bloodType} onChange={handleInputChange}>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  ) : (
                    <span>{studentHealth.bloodType}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Thị lực</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="vision"
                      value={studentHealth.vision}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.vision}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Thính lực</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="hearing"
                      value={studentHealth.hearing}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.hearing}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Tình trạng răng miệng</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="teethCondition"
                      value={studentHealth.teethCondition}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.teethCondition}</span>
                  )}
                </div>
                <div className="info-group full-width">
                  <label>Tình trạng sức khỏe chung</label>
                  {isEditing ? (
                    <textarea
                      name="generalHealth"
                      value={studentHealth.generalHealth}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.generalHealth}</span>
                  )}
                </div>
                <div className="info-group full-width">
                  <label>Dị ứng</label>
                  {isEditing ? (
                    <textarea
                      name="allergies"
                      value={studentHealth.allergies}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.allergies}</span>
                  )}
                </div>
                <div className="info-group full-width">
                  <label>Bệnh mãn tính</label>
                  {isEditing ? (
                    <textarea
                      name="chronicDiseases"
                      value={studentHealth.chronicDiseases}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.chronicDiseases}</span>
                  )}
                </div>
                <div className="info-group full-width">
                  <label>Tiền sử điều trị</label>
                  {isEditing ? (
                    <textarea
                      name="medicalHistory"
                      value={studentHealth.medicalHistory}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.medicalHistory}</span>
                  )}
                </div>
                <div className="info-group full-width">
                  <label>Lịch sử tiêm chủng</label>
                  {isEditing ? (
                    <textarea
                      name="vaccinationHistory"
                      value={studentHealth.vaccinationHistory}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.vaccinationHistory}</span>
                  )}
                </div>
                <div className="info-group full-width">
                  <label>Ghi chú</label>
                  {isEditing ? (
                    <textarea
                      name="notes"
                      value={studentHealth.notes}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{studentHealth.notes}</span>
                  )}
                </div>
                <div className="info-group">
                  <label>Ngày cập nhật cuối</label>
                  <span>{studentHealth.lastExamDate ? new Date(studentHealth.lastExamDate).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</span>
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

export default StudentHealthDetailManager;