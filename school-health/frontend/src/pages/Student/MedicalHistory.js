import React, { useEffect, useState } from 'react';
import Header from '../../components/student/Header';
import Footer from '../../components/student/Footer';
import './MedicalHistory.css';
import { getUserId } from '../../utils/auth';

const API_BASE_URL = 'http://localhost:8080/api/lichsu-khambenh';


function MedicalHistory() {
  const [lichSu, setLichSu] = useState([]);
  const maHocSinh = getUserId();

  useEffect(() => {
    const fetchLichSu = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${maHocSinh}`);
        if (!response.ok) {
          throw new Error('Không thể fetch dữ liệu');
        }
        const data = await response.json();
        setLichSu(data);
      } catch (error) {
        console.error('❌ Lỗi khi lấy dữ liệu lịch sử:', error);
        alert('Không thể tải lịch sử khám bệnh');
      }
    };

    fetchLichSu();
  }, [maHocSinh]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="medical-history-page">
      <Header activePage="medical-history" />
      <main className="medical-history-content">
        <h2>Lịch sử khám bệnh & tiêm chủng</h2>
        {lichSu.length === 0 ? (
          <p>Không có dữ liệu lịch sử.</p>
        ) : (
          <ul className="history-list">
            {lichSu.map((item) => (
              <li key={item.id} className="history-item">
                <p><strong>📅 Ngày khám/tiêm:</strong> {formatDate(item.thoiGianKham)}</p>

                {item.chanDoan && (
                  <>
                    <p><strong>🩺 Chẩn đoán:</strong> {item.chanDoan}</p>
                    <p><strong>💊 Điều trị:</strong> {item.dieuTri}</p>
                    {item.thuocDaDung && <p><strong>💉 Thuốc đã dùng:</strong> {item.thuocDaDung}</p>}
                  </>
                )}

                {item.tenVaccine && (
                  <>
                    <p><strong>💉 Vaccine:</strong> {item.tenVaccine}</p>
                    <p><strong>📝 Mô tả tiêm chủng:</strong> {item.moTaTiemChung}</p>
                  </>
                )}

                {item.diaDiem && <p><strong>📍 Địa điểm:</strong> {item.diaDiem}</p>}
                {item.bienPhapXuLy && <p><strong>🛠️ Xử lý:</strong> {item.bienPhapXuLy}</p>}
                {item.trangThai && <p><strong>🔖 Trạng thái:</strong> {item.trangThai}</p>}
                <p>
                  <strong>👨‍👩‍👧 Thông báo phụ huynh:</strong>{' '}
                  {item.thongBaoPhuHuynh ? 'Có' : 'Không'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default MedicalHistory;
