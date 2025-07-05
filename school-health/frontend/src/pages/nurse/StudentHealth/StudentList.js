import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../../components/nurse/Header';
import Footer from '../../../components/nurse/Footer';
import { students as defaultStudents } from '../../../data/students.js';
import './StudentList.css';

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const [students, setStudents] = useState(defaultStudents);

  // // Mock data - replace with API call later
  // const [students, setStudents] = useState([
  //   { id: 1, name: 'Nguyễn Văn A', class: '10A1', studentId: 'HS001', healthStatus: 'Bình thường', height: 165, weight: 55, bloodType: 'O+', allergies: ['Hải sản'], medicalHistory: ['Đau dạ dày'] },
  //   { id: 2, name: 'Trần Thị B', class: '10A2', studentId: 'HS002', healthStatus: 'Cần theo dõi', height: 160, weight: 50, bloodType: 'A+', allergies: [], medicalHistory: ['Hen suyễn'] },
  //   { id: 3, name: 'Phạm Văn C', class: '10A1', studentId: 'HS003', healthStatus: 'Bình thường', height: 170, weight: 60, bloodType: 'B+', allergies: [], medicalHistory: [] },
  //   { id: 4, name: 'Lê Thị D', class: '10A3', studentId: 'HS004', healthStatus: 'Đang điều trị', height: 155, weight: 48, bloodType: 'AB+', allergies: ['Phấn hoa'], medicalHistory: [] },
  // ]);

  useEffect(() => {
    // Nhận và cập nhật học sinh từ trang Edit
    if (location.state && location.state.updatedStudent) {
      const updatedStudent = location.state.updatedStudent;
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
      // Xóa state để tránh cập nhật lại khi refresh
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="nurse-layout">
      <Header />
      <main className="student-list-main">
        <div className="student-list-container">
          <div className="page-header">
            <h1>Danh sách hồ sơ sức khỏe học sinh</h1>
            <div className="header-actions">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên, lớp, mã học sinh..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="add-button">
                <i className="fas fa-plus"></i>
                Thêm hồ sơ mới
              </button>
            </div>
          </div>

          <div className="student-list">
            <div className="list-header">
              <div className="header-item">Mã học sinh</div>
              <div className="header-item">Họ và tên</div>
              <div className="header-item">Lớp</div>
              <div className="header-item">Tình trạng sức khỏe</div>
              <div className="header-item">Thao tác</div>
            </div>

            {filteredStudents.map(student => (
              <div key={student.id} className="student-item">
                <div className="item-data">{student.studentId}</div>
                <div className="item-data">{student.name}</div>
                <div className="item-data">{student.class}</div>
                <div className="item-data">
                  <span className={`status-badge ${student.healthStatus.toLowerCase().replace(' ', '-')}`}>
                    {student.healthStatus}
                  </span>
                </div>
                <div className="item-actions">
                  <Link to={`/nurse/student-health/${student.id}`} className="view-button">
                    <i className="fas fa-eye"></i>
                    Xem chi tiết
                  </Link>
                  <Link 
                    to={`/nurse/student-health/${student.id}/edit`} 
                    className="edit-button"
                    state={{ student: student }}
                  >
                    <i className="fas fa-edit"></i>
                    Chỉnh sửa
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <p>Không tìm thấy học sinh phù hợp với từ khóa tìm kiếm</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentList; 