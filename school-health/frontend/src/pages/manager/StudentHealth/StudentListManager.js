import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../../components/manager/Header';
import Footer from '../../../components/manager/Footer';
import { fetchStudents, fetchStudentHealthRecord } from '../../../api/studentApi';
import './StudentList.css';

const StudentListManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Load students from API
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const studentsData = await fetchStudents();
        
        // For each student, try to get their health record to determine status
        const studentsWithHealthInfo = await Promise.all(
          studentsData.map(async (student) => {
            try {
              const healthRecords = await fetchStudentHealthRecord(student.maHocSinh);
              const latestHealthRecord = healthRecords && healthRecords.length > 0 ? healthRecords[0] : null;
              
              // Determine health status based on health record
              let healthStatus = 'Chưa có thông tin';
              if (latestHealthRecord) {
                if (latestHealthRecord.benhManTinh && latestHealthRecord.benhManTinh.trim() !== '') {
                  healthStatus = 'Cần theo dõi';
                } else if (latestHealthRecord.diUng && latestHealthRecord.diUng.trim() !== '') {
                  healthStatus = 'Cần lưu ý';
                } else {
                  healthStatus = 'Bình thường';
                }
              }
              
              return {
                id: student.maHocSinh,
                name: student.hoTen,
                class: student.lop,
                studentId: student.maHocSinh,
                healthStatus: healthStatus,
                healthRecord: latestHealthRecord
              };
            } catch (error) {
              console.error(`Error loading health record for student ${student.maHocSinh}:`, error);
              return {
                id: student.maHocSinh,
                name: student.hoTen,
                class: student.lop,
                studentId: student.maHocSinh,
                healthStatus: 'Chưa có thông tin',
                healthRecord: null
              };
            }
          })
        );
        
        setStudents(studentsWithHealthInfo);
      } catch (error) {
        console.error('Error loading students:', error);
        setError('Không thể tải danh sách học sinh. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

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

  if (loading) {
    return (
      <div className="nurse-layout">
        <Header />
        <main className="student-list-main">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Đang tải danh sách học sinh...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="nurse-layout">
        <Header />
        <main className="student-list-main">
          <div className="error-container">
            <div className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className="retry-button">
                Thử lại
              </button>
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
                  <Link to={`/manager/student-health/${student.id}`} className="view-button">
                    <i className="fas fa-eye"></i>
                    Xem chi tiết
                  </Link>
                  <Link 
                    to={`/manager/student-health/${student.id}/edit`} 
                    className="edit-button"
                    state={{ student: student }}>
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

export default StudentListManager;