import React, { useState } from 'react';
import './StudentEvents.css';
import Header from '../../components/student/Header';
import Footer from '../../components/student/Footer';

const Events = () => {
  // Mock data for events
  const [events] = useState([
    {
      id: 1,
      title: 'Khám sức khỏe định kỳ',
      date: '2024-03-15',
      time: '08:00',
      location: 'Phòng Y tế trường',
      description: 'Khám sức khỏe định kỳ học kỳ 2 năm học 2023-2024',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Tiêm vắc-xin phòng bệnh',
      date: '2024-02-28',
      time: '09:30',
      location: 'Phòng Y tế trường',
      description: 'Tiêm vắc-xin phòng bệnh theo chương trình tiêm chủng quốc gia',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Khám răng định kỳ',
      date: '2024-02-20',
      time: '10:00',
      location: 'Phòng Nha khoa',
      description: 'Khám và vệ sinh răng miệng định kỳ cho học sinh',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Tư vấn dinh dưỡng',
      date: '2024-03-25',
      time: '14:00',
      location: 'Phòng Hội thảo',
      description: 'Buổi tư vấn về chế độ dinh dưỡng cho học sinh và phụ huynh',
      status: 'upcoming'
    }
  ]);

  const getStatusColor = (status) => {
    return status === 'upcoming' ? 'var(--status-upcoming)' : 'var(--status-completed)';
  };

  const getStatusText = (status) => {
    return status === 'upcoming' ? 'Sắp diễn ra' : 'Đã hoàn thành';
  };

  return (
    <div className="events-page">
      <Header activePage="events" />
      
      <main className="events-content">
        <div className="events-container">
          <h1>Lịch sử sự kiện</h1>
          
          <div className="events-list">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <h2>{event.title}</h2>
                  <span 
                    className="event-status"
                    style={{ backgroundColor: getStatusColor(event.status) }}
                  >
                    {getStatusText(event.status)}
                  </span>
                </div>
                
                <div className="event-details">
                  <div className="event-info">
                    <i className="far fa-calendar"></i>
                    <span>{new Date(event.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  
                  <div className="event-info">
                    <i className="far fa-clock"></i>
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="event-info">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="event-description">{event.description}</p>
                
                {event.status === 'upcoming' && (
                  <div className="event-actions">
                    <button className="btn-remind">
                      <i className="far fa-bell"></i>
                      Nhắc nhở
                    </button>
                    <button className="btn-calendar">
                      <i className="far fa-calendar-plus"></i>
                      Thêm vào lịch
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events; 