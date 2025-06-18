import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/nurse/Header';
import Footer from '../../components/nurse/Footer';
import '../../styles/PrescriptionRequestList.css';

const PrescriptionRequestList = () => {
  const navigate = useNavigate();
  
  // Mock data
  const [requests] = useState([
    {
      id: 1,
      studentName: 'Nguyễn Văn A',
      class: '10A1',
      requestDate: '2024-03-20',
      status: 'PENDING',
      medicineName: 'Paracetamol',
      quantity: '2 viên',
      instructions: 'Uống sau bữa ăn'
    },
    {
      id: 2,
      studentName: 'Trần Thị B',
      class: '11B2',
      requestDate: '2024-03-19',
      status: 'APPROVED',
      medicineName: 'Vitamin C',
      quantity: '1 viên',
      instructions: 'Uống buổi sáng'
    },
    {
      id: 3,
      studentName: 'Lê Văn C',
      class: '12C3',
      requestDate: '2024-03-18',
      status: 'REJECTED',
      medicineName: 'Ibuprofen',
      quantity: '1 viên',
      instructions: 'Uống khi đau'
    }
  ]);

  const handleRequestClick = (requestId) => {
    navigate(`/nurse/prescription-request/${requestId}`);
  };

  return (
    <div className="nurse-layout">
      <Header />
      <main>
        <div className="prescription-request-list">
          <h2>Danh sách yêu cầu nhận thuốc</h2>
          <div className="requests-container">
            {requests.length === 0 ? (
              <p className="no-requests">Không có yêu cầu nhận thuốc nào</p>
            ) : (
              requests.map((request) => (
                <div
                  key={request.id}
                  className="request-card"
                  onClick={() => handleRequestClick(request.id)}
                >
                  <div className="student-info">
                    <h3>{request.studentName}</h3>
                    <p>Lớp: {request.class}</p>
                    <p>Ngày yêu cầu: {new Date(request.requestDate).toLocaleDateString()}</p>
                    <p>Thuốc: {request.medicineName}</p>
                  </div>
                  <div className="request-status">
                    <span className={`status-badge ${request.status.toLowerCase()}`}>
                      {request.status === 'PENDING' ? 'Chờ xử lý' : 
                        request.status === 'APPROVED' ? 'Đã duyệt' : 'Đã từ chối'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrescriptionRequestList; 