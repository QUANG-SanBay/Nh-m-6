import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/nurse/Header';
import Footer from '../../components/nurse/Footer';
import '../../styles/PrescriptionRequestList.css';

const PrescriptionRequestList = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/yeu-cau-thuoc')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          alert(data.error || 'Lỗi khi lấy danh sách yêu cầu thuốc!');
          setRequests([]);
        }
      })
      .catch(() => setRequests([]));
  }, []);

  const handleRequestClick = (maYeuCau) => {
    navigate(`/nurse/prescription-request/${maYeuCau}`);
  };

  return (
    <div className="nurse-layout">
      <Header />
      <main>
        <div className="prescription-request-list">
          <h2>Danh sách yêu cầu nhận thuốc</h2>
          <div className="requests-container">
            {Array.isArray(requests) && requests.length === 0 ? (
              <p className="no-requests">Không có yêu cầu nhận thuốc nào</p>
            ) : (
              Array.isArray(requests) && requests.map((request) => (
                <div
                  key={request.maYeuCau}
                  className="request-card"
                  onClick={() => handleRequestClick(request.maYeuCau)}
                >
                  <div className="student-info">
                    <h3>{request.hoTenHocSinh || 'Không rõ'}</h3>
                    <p>Lớp: {request.lopHocSinh || 'Không rõ'}</p>
                    <p>Ngày yêu cầu: {request.ngayTao ? new Date(request.ngayTao).toLocaleDateString() : ''}</p>
                    <p>Thuốc: {request.tenThuoc}</p>
                  </div>
                  <div className="request-status">
                    <span className={`status-badge ${request.trangThai?.toLowerCase()}`}>
                      {request.trangThai === 'CHO_DUYET' ? 'Chờ xử lý' : 
                        request.trangThai === 'DA_DUYET' ? 'Đã duyệt' : 'Đã từ chối'}
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