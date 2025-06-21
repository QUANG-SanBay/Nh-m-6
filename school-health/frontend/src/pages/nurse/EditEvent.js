import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/nurse/Header';
import Footer from '../../components/nurse/Footer';
import '../../styles/EditEvent.css';

const EditEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Nhận event từ state của navigation, nếu không có thì quay về trang events
  const { event } = location.state || {};

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: '',
    participants: '',
    status: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!event) {
      // Nếu không có dữ liệu event, điều hướng về trang danh sách
      navigate('/nurse/events');
      return;
    }

    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      participants: event.participants.toString(),
      status: event.status
    });
    setLoading(false);
  }, [event, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const updatedEvent = {
      ...event,
      ...formData,
      participants: parseInt(formData.participants) || 0
    };
    
    // Giả lập gọi API
    setTimeout(() => {
      console.log('Event updated:', updatedEvent);
      setSaving(false);
      
      // Điều hướng về trang danh sách và gửi kèm event đã cập nhật
      navigate('/nurse/events', { state: { updatedEvent: updatedEvent } });
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/nurse/events');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#3498db';
      case 'upcoming': return '#f39c12';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Đang diễn ra';
      case 'upcoming': return 'Sắp diễn ra';
      case 'completed': return 'Đã hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  if (loading || !event) {
    return (
      <div className="nurse-layout">
        <Header />
        <main className="nurse-main">
          <div className="edit-event-container">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Đang tải thông tin sự kiện...</p>
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
      <main className="nurse-main">
        <div className="edit-event-container">
          <div className="edit-event-header">
            <div className="header-left">
              <button 
                className="back-btn"
                onClick={handleCancel}
              >
                ← Quay lại
              </button>
              <h1 className="edit-event-title">Chỉnh sửa sự kiện</h1>
            </div>
            <div className="event-status-display">
              <span 
                className="status-dot"
                style={{ backgroundColor: getStatusColor(formData.status) }}
              ></span>
              <span className="status-text">{getStatusText(formData.status)}</span>
            </div>
          </div>

          <div className="edit-event-content">
            <form className="edit-event-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h3 className="section-title">Thông tin cơ bản</h3>
                
                <div className="form-group">
                  <label>Tên sự kiện *</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Nhập tên sự kiện" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Mô tả</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Mô tả chi tiết về sự kiện" 
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Thời gian và địa điểm</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Ngày *</label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Giờ *</label>
                    <input 
                      type="time" 
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Địa điểm *</label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Nhập địa điểm" 
                    required 
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Chi tiết sự kiện</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Loại sự kiện *</label>
                    <select 
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Chọn loại sự kiện</option>
                      <option value="health_check">Khám sức khỏe</option>
                      <option value="vaccination">Tiêm chủng</option>
                      <option value="consultation">Tư vấn</option>
                      <option value="emergency">Khẩn cấp</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Số lượng tham gia dự kiến</label>
                    <input 
                      type="number" 
                      name="participants"
                      value={formData.participants}
                      onChange={handleInputChange}
                      placeholder="Nhập số lượng" 
                      min="1" 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Trạng thái sự kiện</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="upcoming">Sắp diễn ra</option>
                    <option value="active">Đang diễn ra</option>
                    <option value="completed">Đã hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner-small"></span>
                      Đang lưu...
                    </>
                  ) : (
                    'Lưu thay đổi'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditEvent; 