import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/nurse/Header';
import Footer from '../../components/nurse/Footer';
import '../../styles/PrescriptionRequestDetail.css';

const PrescriptionRequestDetail = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');

  // Mock data
  const mockRequest = {
    id: parseInt(requestId),
    studentName: 'Nguyễn Văn A',
    class: '10A1',
    requestDate: '2024-03-20',
    status: 'PENDING',
    prescriptionItems: [
      {
        medicineName: 'Paracetamol',
        quantity: '2 viên',
        instructions: 'Uống sau bữa ăn'
      },
      {
        medicineName: 'Vitamin C',
        quantity: '1 viên',
        instructions: 'Uống buổi sáng'
      }
    ],
    parentNote: 'Học sinh bị sốt nhẹ, cần uống thuốc hạ sốt'
  };

  const handleStatusChange = (newStatus) => {
    // In a real application, this would make an API call
    console.log(`Status changed to: ${newStatus}`);
    console.log(`Notes: ${notes}`);
    // For demo purposes, we'll just show an alert
    alert(`Đã ${newStatus === 'APPROVED' ? 'duyệt' : 'từ chối'} đơn thuốc`);
    navigate('/nurse/prescription-requests');
  };

  return (
    <div className="nurse-layout">
      <Header />
      <main className="prescription-detail-main">
        <div className="prescription-detail-container">
          <div className="header">
            <button className="back-button" onClick={() => navigate(-1)}>
              ← Quay lại
            </button>
            <h2>Chi tiết yêu cầu nhận thuốc</h2>
          </div>

          <div className="request-details">
            <div className="student-info">
              <h3>Thông tin học sinh</h3>
              <p><strong>Họ tên:</strong> {mockRequest.studentName}</p>
              <p><strong>Lớp:</strong> {mockRequest.class}</p>
              <p><strong>Ngày yêu cầu:</strong> {new Date(mockRequest.requestDate).toLocaleDateString()}</p>
            </div>

            <div className="prescription-info">
              <h3>Thông tin đơn thuốc</h3>
              <div className="prescription-items">
                {mockRequest.prescriptionItems.map((item, index) => (
                  <div key={index} className="prescription-item">
                    <p><strong>Tên thuốc:</strong> {item.medicineName}</p>
                    <p><strong>Số lượng:</strong> {item.quantity}</p>
                    <p><strong>Hướng dẫn sử dụng:</strong> {item.instructions}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="parent-note">
              <h3>Ghi chú từ phụ huynh</h3>
              <p>{mockRequest.parentNote}</p>
            </div>

            <div className="notes-section">
              <h3>Ghi chú của y tá</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Nhập ghi chú về đơn thuốc..."
                rows="4"
              />
            </div>

            <div className="action-buttons">
              <button
                className="approve-button"
                onClick={() => handleStatusChange('APPROVED')}
                disabled={mockRequest.status === 'APPROVED'}
              >
                Xác nhận
              </button>
              <button
                className="reject-button"
                onClick={() => handleStatusChange('REJECTED')}
                disabled={mockRequest.status === 'REJECTED'}
              >
                Từ chối
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrescriptionRequestDetail; 