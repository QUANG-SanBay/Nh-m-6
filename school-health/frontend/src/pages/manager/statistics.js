import React, { useEffect, useState } from 'react';
import Header from '../../components/manager/Header';
import Footer from '../../components/manager/Footer';
import './Statistics.css';

const Statistics = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [students, setStudents] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/hoso-suckhoe/by-date?date=${selectedDate}`);
      const data = await res.json();
      console.log('Dữ liệu từ API:', data);
      setStudents(data); // ✅ data phải là array
    } catch (error) {
      console.error('Lỗi fetch dữ liệu:', error);
      setStudents([]); // fallback tránh lỗi filter
    }
  };

  fetchData();
}, [selectedDate]);


  const total = students.length;
  const normal = students.filter(s => s.tinhTrangSucKhoe === 'Bình thường').length;
  const monitoring = students.filter(s => s.tinhTrangSucKhoe === 'Cần theo dõi').length;
  const treating = students.filter(s => s.tinhTrangSucKhoe === 'Đang điều trị').length;

  return (
    <div className="manager-layout">
      <Header />
      <main className="statistics-main">
        <div className="statistics-container">
          <h1>Thống kê hồ sơ sức khỏe học sinh</h1>

          <div className="date-picker">
            <label>Chọn ngày thống kê:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <table className="statistics-table">
            <thead>
              <tr>
                <th>Tổng học sinh</th>
                <th>Bình thường</th>
                <th>Cần theo dõi</th>
                <th>Đang điều trị</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{total}</td>
                <td>{normal}</td>
                <td>{monitoring}</td>
                <td>{treating}</td>
              </tr>
            </tbody>
          </table>

          {selectedDate && students.length > 0 && (
            <div className="student-detail-section">
              <h2>Danh sách học sinh ngày {selectedDate}</h2>
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Mã HS</th>
                    <th>Họ tên</th>
                    <th>Lớp</th>
                    <th>Tình trạng sức khỏe</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.maHoSo}>
                      <td>{student.maHocSinh}</td>
                      <td>{student.hoTen}</td>
                      <td>{student.lop}</td>
                      <td>{student.tinhTrangSucKhoe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedDate && students.length === 0 && (
            <p style={{ marginTop: '20px' }}>
              Không có học sinh nào trong ngày {selectedDate}.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Statistics;
