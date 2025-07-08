import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Header from '../../components/manager/Header';
import Footer from '../../components/manager/Footer';
import '../../styles/EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (!event) return <div>Không tìm thấy sự kiện!</div>;

  return (
    <div className="nurse-layout">
      <Header />
      <main className="nurse-main">
        <div className="event-detail-container">
          <button onClick={() => navigate(-1)}>← Quay lại</button>
          <h1>{event.loaiSuKien || 'Không có tiêu đề'}</h1>
          <p><b>Mô tả:</b> {event.moTa || 'Không có mô tả'}</p>
          <p><b>Ngày giờ:</b> {event.thoiGianSuKien?.replace('T', ' ') || 'Chưa có'}</p>
          <p><b>Địa điểm:</b> {event.diaDiem || 'Chưa có địa điểm'}</p>
          <p><b>Số lượng tham gia:</b> {event.soLuongThamGia || 0}</p>
          <p><b>Trạng thái:</b> {event.trangThai || 'Không xác định'}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetail;