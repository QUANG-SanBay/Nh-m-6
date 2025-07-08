import React, { useState, useEffect } from 'react';
import './Profile.css';
import Header from '../../components/parent/Header';
import Footer from '../../components/parent/Footer';
import { parentApi } from '../../api/parentApi';

const Profile = () => {
  const [formData, setFormData] = useState({
    maPhuHuynh: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    relationship: '',
    address: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({});

  // Thêm state mới cho danh sách học sinh
  const [studentList, setStudentList] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    // Lấy thông tin từ localStorage
    const userName = localStorage.getItem("userName");
    const hoTen = localStorage.getItem("hoTen");
    const userRole = localStorage.getItem("userRole");
    
    // Kiểm tra userRole
    if (userRole !== 'PHU_HUYNH' && userRole !== 'PhuHuynh') {
      setMessage("Bạn không có quyền truy cập trang này.");
      setMessageType("error");
      return;
    }
    
    // Tìm phụ huynh theo username hoặc tạo mới
    if (userName || hoTen) {
      loadOrCreateParent(userName || hoTen, hoTen);
    } else {
      setMessage("Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại.");
      setMessageType("error");
    }
  }, []);

  const loadOrCreateParent = async (searchKey, fullName) => {
    try {
      setLoading(true);
      
      // Thử tìm theo username trước
      try {
        const data = await parentApi.getParentByUsername(searchKey);
        
        const profileData = {
          maPhuHuynh: data.maPhuHuynh || '',
          fullName: data.hoTen || '',
          phoneNumber: data.soDienThoai || '',
          email: data.email || '',
          relationship: data.quanHeVoiHocSinh || '',
          address: data.thongTinLienHe || ''
        };
        
        setFormData(profileData);
        setOriginalData(profileData);
        setMessage("");
        setMessageType("");
        
        // Tải danh sách học sinh nếu có maPhuHuynh
        if (data.maPhuHuynh) {
          loadStudentList(data.maPhuHuynh);
        }
        
      } catch (error) {
        // Nếu không tìm thấy, tạo form trống với thông tin từ localStorage
        const profileData = {
          maPhuHuynh: '',
          fullName: fullName || searchKey || '',
          phoneNumber: '',
          email: '',
          relationship: '',
          address: ''
        };
        
        setFormData(profileData);
        setOriginalData(profileData);
        setMessage("Chưa có thông tin phụ huynh. Vui lòng cập nhật thông tin đầy đủ để hoàn thiện hồ sơ.");
        setMessageType("info");
        setIsEditing(true); // Tự động vào chế độ chỉnh sửa
      }
      
    } catch (error) {
      setMessage("Có lỗi xảy ra khi tải thông tin. Vui lòng thử lại sau.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Thêm hàm tải danh sách học sinh với thông tin chi tiết
  const loadStudentList = async (maPhuHuynh) => {
    try {
      setLoadingStudents(true);
      
      // Sử dụng API mới để lấy thông tin chi tiết
      const students = await parentApi.getHocSinhDetailByPhuHuynh ? 
        await parentApi.getHocSinhDetailByPhuHuynh(maPhuHuynh) :
        await parentApi.getHocSinhByPhuHuynh(maPhuHuynh);
        
      setStudentList(students || []);
      
      // Log để debug
      console.log('Loaded students:', students);
      
    } catch (error) {
      console.error('Error loading students:', error);
      setStudentList([]);
      
      // Fallback về API cũ nếu API mới lỗi
      try {
        const students = await parentApi.getHocSinhByPhuHuynh(maPhuHuynh);
        setStudentList(students || []);
      } catch (fallbackError) {
        console.error('Fallback API also failed:', fallbackError);
      }
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage("");
    setMessageType("");
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    setMessage("");
    setMessageType("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setMessage("Vui lòng nhập họ và tên");
      setMessageType("error");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setMessage("Vui lòng nhập số điện thoại");
      setMessageType("error");
      return false;
    }
    if (!formData.email.trim()) {
      setMessage("Vui lòng nhập email");
      setMessageType("error");
      return false;
    }
    if (!formData.relationship) {
      setMessage("Vui lòng chọn quan hệ với học sinh");
      setMessageType("error");
      return false;
    }
    if (!formData.address.trim()) {
      setMessage("Vui lòng nhập địa chỉ");
      setMessageType("error");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Định dạng email không hợp lệ");
      setMessageType("error");
      return false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setMessage("Số điện thoại phải có 10-11 chữ số");
      setMessageType("error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      const updateData = {
        hoTen: formData.fullName,
        soDienThoai: formData.phoneNumber,
        email: formData.email,
        quanHeVoiHocSinh: formData.relationship,
        thongTinLienHe: formData.address,
        tenDangNhap: localStorage.getItem('userName'),
        vaiTro: 'PHU_HUYNH'
      };

      // Nếu chưa có maPhuHuynh, tạo mới
      if (!formData.maPhuHuynh) {
        const response = await parentApi.createParent(updateData);
        
        const newData = response.data || response;
        setFormData(prev => ({
          ...prev,
          maPhuHuynh: newData.maPhuHuynh
        }));
        
        setMessage("Tạo thông tin phụ huynh thành công!");
        setMessageType("success");
      } else {
        await parentApi.updateParent(formData.maPhuHuynh, updateData);
        
        setMessage("Cập nhật thông tin thành công!");
        setMessageType("success");
      }
      
      setIsEditing(false);
      setOriginalData(formData);
      
    } catch (error) {
      setMessage(`Lỗi: ${error.message}`);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // const hasChanges = () => {
  //   return JSON.stringify(formData) !== JSON.stringify(originalData);
  // };

  if (loading && !formData.fullName) {
    return (
      <div className="profile-page">
        <Header activePage="profile" />
        <main className="profile-content">
          <div className="profile-container-parent">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Đang tải thông tin...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Header activePage="profile" />

      <main className="profile-content">
        <div className="profile-container-parent">
          <div className="profile-header">
            <h1>Thông tin cá nhân</h1>
          </div>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section-parent">
              <h3>Thông tin cơ bản</h3>
              
              <div className="form-group">
                <label htmlFor="fullName">Họ và tên *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Số điện thoại *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="relationship">Quan hệ với học sinh *</label>
                <select
                  id="relationship"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                >
                  <option value="">Chọn quan hệ</option>
                  <option value="Cha">Cha</option>
                  <option value="Mẹ">Mẹ</option>
                  <option value="Người giám hộ">Người giám hộ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="address">Địa chỉ *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Thêm section mới cho thông tin học sinh */}
            {formData.maPhuHuynh && (
              <div className="form-section-parent">
                <h3>Thông tin học sinh</h3>
                
                {loadingStudents ? (
                  <div className="loading-students">
                    <div className="loading-spinner"></div>
                    <p>Đang tải danh sách học sinh...</p>
                  </div>
                ) : (
                  <div className="student-list-section">
                    {studentList.length > 0 ? (
                      <div className="student-cards">
                        {studentList.map((student, index) => (
                          <div key={student.maHocSinh || index} className="student-card">
                            <div className="student-info">
                              <div className="student-detail">
                                <label>Tên học sinh:</label>
                                <span>{student.hoTen}</span>
                              </div>
                              <div className="student-detail">
                                <label>Mã học sinh:</label>
                                <span>{student.maHocSinh}</span>
                              </div>
                              {student.lop && (
                                <div className="student-detail">
                                  <label>Lớp:</label>
                                  <span>{student.lop}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-students">
                        <i className="fas fa-user-graduate"></i>
                        <p>Chưa có học sinh nào được liên kết với tài khoản này</p>
                        <small>Vui lòng liên hệ nhà trường để liên kết thông tin học sinh</small>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {!isEditing && formData.maPhuHuynh && (
              <button type="button" onClick={handleEdit} className="btn-edit">
                <i className="fas fa-edit"></i>
                Chỉnh sửa
              </button>
            )}  
            {isEditing && (
              <div className="form-actions">
                {formData.maPhuHuynh && (
                  <button 
                    type="button" 
                    className="btn-cancel" 
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Hủy
                  </button>
                )}
                <button 
                  type="submit" 
                  className="btn-save" 
                  disabled={loading}
                >
                  {loading ? 'Đang lưu...' : (formData.maPhuHuynh ? 'Cập nhật' : 'Tạo hồ sơ')}
                </button>
              </div>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;