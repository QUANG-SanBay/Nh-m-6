
import React, { useState } from 'react';
import { students } from '../../data/studentsdata.js';
import Header from '../../components/manager/Header';
import Footer from '../../components/manager/Footer';
import './Statistics.css';

const Statistics = () => {
  const [selectedDate, setSelectedDate] = useState('');

  // Lọc học sinh theo ngày được chọn
  const filteredStudents = students.filter(
    student => selectedDate === '' || student.createdAt === selectedDate
  );

  const total = filteredStudents.length;
  const normal = filteredStudents.filter(s => s.healthStatus === 'Bình thường').length;
  const monitoring = filteredStudents.filter(s => s.healthStatus === 'Cần theo dõi').length;
  const treating = filteredStudents.filter(s => s.healthStatus === 'Đang điều trị').length;

  return (
    <div className="manager-layout">
      <Header />
      <main className="statistics-main">
        <div className="statistics-container">
          <h1>Thống kê hồ sơ sức khỏe học sinh</h1>

          {/* Bộ chọn ngày */}
          <div className="date-picker">
            <label>Chọn ngày thống kê:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {/* Bảng thống kê tổng */}
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

          {/* Danh sách chi tiết học sinh trong ngày */}
          {selectedDate && filteredStudents.length > 0 && (
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
                  {filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td>{student.studentId}</td>
                      <td>{student.name}</td>
                      <td>{student.class}</td>
                      <td>{student.healthStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Nếu không có học sinh cho ngày đó */}
          {selectedDate && filteredStudents.length === 0 && (
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
