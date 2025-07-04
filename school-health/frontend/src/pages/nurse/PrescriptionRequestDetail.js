import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/nurse/Header';
import Footer from '../../components/nurse/Footer';
import '../../styles/PrescriptionRequestDetail.css';

const PrescriptionRequestDetail = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/yeu-cau-thuoc/${requestId}`)
      .then(res => res.json())
      .then(data => setRequest(data));
  }, [requestId]);

  if (!request) return <div>Đang tải...</div>;

  const handleStatusChange = (newStatus) => {
    // In a real application, this would make an API call
    console.log(`Status changed to: ${newStatus}`);
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
              <h2>Thông tin học sinh</h2>
              <p>Họ tên: {request.hoTenHocSinh || 'Không rõ'}</p>
              <p>Lớp: {request.lopHocSinh || 'Không rõ'}</p>
              <p>Ngày yêu cầu: {request.ngayTao ? new Date(request.ngayTao).toLocaleDateString() : 'Không rõ'}</p>
            </div>

            <div className="prescription-info">
              <h2>Thông tin đơn thuốc</h2>
              <div className="prescription-items">
                <div className="prescription-item">
                  <p>Tên thuốc: {request.tenThuoc || 'Không rõ'}</p>
                  <p>Liều lượng: {request.lieuLuong || 'Không rõ'}</p>
                  <p>Đơn vị: {request.donVi || 'Không rõ'}</p>
                  <p>Mô tả: {request.moTa || 'Không rõ'}</p>
                  <p>Tình trạng đặc biệt: {request.tinhTrangDacBiet || 'Không'}</p>
                </div>
              </div>
            </div>

            <div className="parent-note">
              <h3>Ghi chú từ phụ huynh</h3>
              <p>{request.ghiChu || 'Không có ghi chú'}</p>
            </div>

            <div className="action-buttons">
              <button
                className="approve-button"
                onClick={() => handleStatusChange('APPROVED')}
                disabled={request.trangThai === 'APPROVED'}
              >
                Xác nhận
              </button>
              <button
                className="reject-button"
                onClick={() => handleStatusChange('REJECTED')}
                disabled={request.trangThai === 'REJECTED'}
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