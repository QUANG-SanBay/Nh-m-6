import React, { useEffect, useState } from 'react';
import { studentApi } from '../../api/studentApi';
import './StudentHealth.css';

const StudentHealthInfo = () => {
  const maHocSinh = localStorage.getItem('maHocSinh'); // ✅ lấy từ localStorage
  const [healthInfo, setHealthInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!maHocSinh) {
      setError('❌ Không tìm thấy mã học sinh. Vui lòng đăng nhập lại.');
      return;
    }

    const fetchHealth = async () => {
      try {
        const data = await studentApi.getStudentHealth(maHocSinh); // dùng getStudentHealth nếu đã có
        if (data) {
          setHealthInfo(data);
        } else {
          setError('Không tìm thấy thông tin sức khỏe.');
        }
      } catch (err) {
        console.error('❌ Lỗi khi lấy thông tin sức khỏe (StudentHealthInfo.js):', err);
        setError('Không thể tải thông tin sức khỏe');
      }
    };

    fetchHealth();
  }, [maHocSinh]);

  if (error) return <p className="error">{error}</p>;
  if (!healthInfo) return <p>⏳ Đang tải thông tin sức khỏe...</p>;

  return (
    <div className="health-info-page">
      <h1>Thông tin sức khỏe</h1>
      <div className="health-info-card">
        <p><strong>Chiều cao:</strong> {healthInfo.chieuCao || 'Chưa cập nhật'} cm</p>
        <p><strong>Cân nặng:</strong> {healthInfo.canNang || 'Chưa cập nhật'} kg</p>
        <p><strong>Thị lực:</strong> {healthInfo.thiLuc || 'Chưa cập nhật'}</p>
        <p><strong>Thính lực:</strong> {healthInfo.thinhLuc || 'Chưa cập nhật'}</p>
        <p><strong>Dị ứng:</strong> {healthInfo.diUng || 'Không có'}</p>
        <p><strong>Bệnh mãn tính:</strong> {healthInfo.benhManTinh || 'Không có'}</p>
        <p><strong>Kết quả răng miệng:</strong> {healthInfo.ketQuaRangMieng || 'Chưa khám'}</p>
        <p><strong>Lịch sử tiêm chủng:</strong> {healthInfo.lichSuTiemChung || 'Chưa cập nhật'}</p>
        <p><strong>Ghi chú:</strong> {healthInfo.ghiChu || 'Không có'}</p>
      </div>
    </div>
  );
};

export default StudentHealthInfo;
