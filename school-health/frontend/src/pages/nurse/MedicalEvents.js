import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/nurse/Header';
import Footer from '../../components/nurse/Footer';
import '../../styles/MedicalEvents.css';

const MedicalEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Khám sức khỏe định kỳ lớp 10A',
      description: 'Kiểm tra sức khỏe định kỳ cho học sinh lớp 10A',
      date: '2024-01-15',
      time: '08:00',
      location: 'Phòng Y tế',
      status: 'active',
      participants: 30,
      type: 'health_check'
    },
    {
      id: 2,
      title: 'Tiêm chủng vắc-xin cúm',
      description: 'Chương trình tiêm chủng vắc-xin cúm cho học sinh toàn trường',
      date: '2024-01-20',
      time: '09:00',
      location: 'Hội trường',
      status: 'upcoming',
      participants: 500,
      type: 'vaccination'
    },
    {
      id: 3,
      title: 'Tư vấn dinh dưỡng',
      description: 'Buổi tư vấn về dinh dưỡng và sức khỏe cho học sinh',
      date: '2024-01-18',
      time: '14:00',
      location: 'Thư viện',
      status: 'completed',
      participants: 50,
      type: 'consultation'
    },
    {
      id: 4,
      title: 'Sơ cứu khẩn cấp',
      description: 'Xử lý tình huống sơ cứu khẩn cấp tại sân trường',
      date: '2024-01-12',
      time: '10:30',
      location: 'Sân trường',
      status: 'completed',
      participants: 1,
      type: 'emergency'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: '',
    participants: ''
  });

  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then(res => res.json())
      .then(data => {
        console.log('DATA BACKEND:', data);
        const mappedEvents = data.map(event => ({
          id: event.maSuKien,
          title: event.loaiSuKien || 'Không có tiêu đề',
          description: event.moTa || 'Không có mô tả',
          date: event.thoiGianSuKien ? event.thoiGianSuKien.split('T')[0] : '',
          time: event.thoiGianSuKien ? event.thoiGianSuKien.split('T')[1]?.slice(0,5) : '',
          location: event.diaDiem || 'Chưa có địa điểm',
          status: event.trangThai || 'upcoming',
          participants: event.soLuongThamGia || 0,
          type: getEventTypeFromTitle(event.loaiSuKien)
        }));
        setEvents(mappedEvents);
      })
      .catch(err => {
        console.error('Lỗi lấy sự kiện:', err);
        // Nếu lỗi, sử dụng dữ liệu mẫu
        setEvents([
          {
            id: 1,
            title: 'Khám sức khỏe định kỳ lớp 10A',
            description: 'Kiểm tra sức khỏe định kỳ cho học sinh lớp 10A',
            date: '2024-01-15',
            time: '08:00',
            location: 'Phòng Y tế',
            status: 'active',
            participants: 30,
            type: 'health_check'
          },
          {
            id: 2,
            title: 'Tiêm chủng vắc-xin cúm',
            description: 'Chương trình tiêm chủng vắc-xin cúm cho học sinh toàn trường',
            date: '2024-01-20',
            time: '09:00',
            location: 'Hội trường',
            status: 'upcoming',
            participants: 500,
            type: 'vaccination'
          }
        ]);
      });
  }, []);

  useEffect(() => {
    // Kiểm tra xem có event được cập nhật gửi về từ trang edit không
    if (location.state && location.state.updatedEvent) {
      const updatedEvent = location.state.updatedEvent;
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
      // Xóa state sau khi cập nhật để tránh lặp lại
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Khi submit form tạo sự kiện mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      alert('Vui lòng nhập tên sự kiện!');
      return;
    }
    if (!formData.date) {
      alert('Vui lòng chọn ngày!');
      return;
    }
    if (!formData.time) {
      alert('Vui lòng chọn giờ!');
      return;
    }
    if (!formData.location.trim()) {
      alert('Vui lòng nhập địa điểm!');
      return;
    }
    if (!formData.type) {
      alert('Vui lòng chọn loại sự kiện!');
      return;
    }
    
    setIsSubmitting(true);
    
    const newEvent = {
      ...formData,
      participants: parseInt(formData.participants) || 0,
      status: 'upcoming'
    };

    try {
      const response = await fetch('http://localhost:8080/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      });

      if (response.ok) {
        // Sau khi tạo thành công, fetch lại danh sách sự kiện
        fetch('http://localhost:8080/api/events')
          .then(res => res.json())
          .then(data => {
            const mappedEvents = data.map(event => ({
              id: event.maSuKien,
              title: event.loaiSuKien || 'Không có tiêu đề',
              description: event.moTa || 'Không có mô tả',
              date: event.thoiGianSuKien ? event.thoiGianSuKien.split('T')[0] : '',
              time: event.thoiGianSuKien ? event.thoiGianSuKien.split('T')[1]?.slice(0,5) : '',
              location: event.diaDiem || 'Chưa có địa điểm',
              status: event.trangThai || 'upcoming',
              participants: event.soLuongThamGia || 0,
              type: getEventTypeFromTitle(event.loaiSuKien)
            }));
            setEvents(mappedEvents);
          })
          .catch(err => {
            console.error('Lỗi khi fetch lại dữ liệu:', err);
          });
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          type: '',
          participants: ''
        });
        setShowCreateForm(false);
        alert('Tạo sự kiện thành công!');
      } else {
        const errorText = await response.text();
        alert('Có lỗi khi tạo sự kiện!\n' + errorText);
        console.error('API error:', errorText);
      }
    } catch (error) {
      alert('Không thể kết nối đến máy chủ!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEvent = async (eventId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/events/${eventId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          // Xóa sự kiện khỏi danh sách local
          setEvents(prev => prev.filter(event => event.id !== eventId));
        } else {
          const errorText = await response.text();
          alert('Có lỗi khi xóa sự kiện!\n' + errorText);
          console.error('API error:', errorText);
        }
      } catch (error) {
        alert('Không thể kết nối đến máy chủ!');
        console.error('Network error:', error);
      }
    }
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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'health_check': return '🏥';
      case 'vaccination': return '💉';
      case 'consultation': return '👨‍⚕️';
      case 'emergency': return '🚨';
      default: return '📋';
    }
  };

  const filteredEvents = filterStatus === 'all' 
    ? events 
    : events.filter(event => event.status === filterStatus);

  // Hàm helper để map loại sự kiện từ title
  const getEventTypeFromTitle = (title) => {
    if (!title) return 'other';
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('khám') || lowerTitle.includes('sức khỏe')) return 'health_check';
    if (lowerTitle.includes('tiêm') || lowerTitle.includes('vắc-xin')) return 'vaccination';
    if (lowerTitle.includes('tư vấn')) return 'consultation';
    if (lowerTitle.includes('khẩn cấp')) return 'emergency';
    return 'other';
  };

  return (
    <div className="nurse-layout">
      <Header />
      <main className="nurse-main">
        <div className="events-container">
          <div className="events-header">
            <h1 className="events-title">Sự kiện Y tế</h1>
            <button 
              className="create-event-btn"
              onClick={() => setShowCreateForm(true)}
            >
              <span className="btn-icon">➕</span>
              Tạo sự kiện mới
            </button>
          </div>

          <div className="events-filters">
            <button 
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              Tất cả
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilterStatus('upcoming')}
            >
              Sắp diễn ra
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
              onClick={() => setFilterStatus('active')}
            >
              Đang diễn ra
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('completed')}
            >
              Đã hoàn thành
            </button>
          </div>

          <div className="events-grid">
            {filteredEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <span className="event-icon">{getTypeIcon(event.type)}</span>
                  <div className="event-status">
                    <span 
                      className="status-dot"
                      style={{ backgroundColor: getStatusColor(event.status) }}
                    ></span>
                    <span className="status-text">{getStatusText(event.status)}</span>
                  </div>
                </div>
                
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-details">
                    <div className="detail-item">
                      <span className="detail-label">📅 Ngày:</span>
                      <span className="detail-value">{event.date}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">🕐 Giờ:</span>
                      <span className="detail-value">{event.time}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">📍 Địa điểm:</span>
                      <span className="detail-value">{event.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">👥 Tham gia:</span>
                      <span className="detail-value">{event.participants} người</span>
                    </div>
                  </div>
                </div>

                <div className="event-actions">
                  <button className="action-btn view-btn">Xem chi tiết</button>
                  <Link
                    to={`/nurse/events/${event.id}/edit`}
                    className="edit-btn"
                    state={{ event: event }}
                  >
                    Chỉnh sửa
                  </Link>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelEvent(event.id)}
                  >
                    Xóa sự kiện
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="no-events">
              <div className="no-events-icon">📅</div>
              <h3>Không có sự kiện nào</h3>
              <p>Chưa có sự kiện y tế nào được tạo hoặc phù hợp với bộ lọc hiện tại.</p>
            </div>
          )}
        </div>

        {/* Modal tạo sự kiện mới */}
        {showCreateForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Tạo sự kiện y tế mới</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowCreateForm(false)}
                >
                  ✕
                </button>
              </div>
              
              <form className="create-event-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Tên sự kiện</label>
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
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Ngày</label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Giờ</label>
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
                  <label>Địa điểm</label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Nhập địa điểm" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Loại sự kiện</label>
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
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setShowCreateForm(false)}
                    disabled={isSubmitting}
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-small"></span>
                        Đang tạo...
                      </>
                    ) : (
                      'Tạo sự kiện'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MedicalEvents;