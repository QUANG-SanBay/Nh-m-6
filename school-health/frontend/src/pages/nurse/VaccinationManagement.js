import React, { useState } from 'react';
import Header from '../../components/nurse/Header';
import Footer from '../../components/nurse/Footer';
import VaccinationBatch from './VaccinationBatch';
import '../../styles/VaccinationManagement.css';

// Dữ liệu mẫu cho lịch sử các đợt tiêm chủng
const mockBatches = [
  {
    id: 1,
    batchName: 'Đợt tiêm chủng tháng 3',
    vaccineType: 'Covid-19',
    eventDate: '2024-03-15',
    location: 'Phòng Y tế',
    expectedStudents: 120,
    batchNote: 'Tiêm phòng cho học sinh khối 10',
    vaccineInfo: {
      vaccineName: 'AstraZeneca',
      manufacturer: 'AstraZeneca PLC',
      lotNumber: 'AZ12345',
      productionDate: '2023-12-01',
      expiryDate: '2025-12-01',
      vaccineNote: 'Bảo quản lạnh'
    }
  },
  {
    id: 2,
    batchName: 'Đợt tiêm chủng tháng 6',
    vaccineType: 'Cúm mùa',
    eventDate: '2024-06-10',
    location: 'Hội trường',
    expectedStudents: 150,
    batchNote: 'Tiêm phòng cho toàn trường',
    vaccineInfo: {
      vaccineName: 'Vaxigrip',
      manufacturer: 'Sanofi',
      lotNumber: 'VX67890',
      productionDate: '2024-01-10',
      expiryDate: '2025-01-10',
      vaccineNote: ''
    }
  }
];

const VaccinationManagement = () => {
  const [view, setView] = useState('menu'); // 'menu' | 'history' | 'create' | 'detail'
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleShowHistory = () => setView('history');
  const handleShowCreate = () => setView('create');
  const handleShowMenu = () => setView('menu');
  const handleShowDetail = (batch) => {
    setSelectedBatch(batch);
    setView('detail');
  };

  return (
    <div className="nurse-layout">
      <Header />
      <main className="vaccination-management-main">
        <div className="vaccination-management-container">
          {view === 'menu' && (
            <div className="menu-choice">
              <h1 className="title">Quản lý tiêm chủng</h1>
              <button className="btn-blue" onClick={handleShowHistory}>Xem lịch sử các đợt tiêm chủng</button>
              <button className="btn-blue" onClick={handleShowCreate}>Tạo đợt tiêm chủng mới</button>
            </div>
          )}
          {view === 'history' && (
            <div className="history-view">
              <h2>Lịch sử các đợt tiêm chủng</h2>
              <button className="btn-black" onClick={handleShowMenu}>← Quay lại</button>
              <table className="batch-table">
                <thead>
                  <tr>
                    <th>Tên đợt</th>
                    <th>Loại vắc-xin</th>
                    <th>Ngày diễn ra</th>
                    <th>Địa điểm</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {mockBatches.map(batch => (
                    <tr key={batch.id}>
                      <td>{batch.batchName}</td>
                      <td>{batch.vaccineType}</td>
                      <td>{batch.eventDate}</td>
                      <td>{batch.location}</td>
                      <td>
                        <button className="btn-blue" onClick={() => handleShowDetail(batch)}>Xem chi tiết</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {view === 'create' && (
            <div className="create-view">
              <button className="btn-black" onClick={handleShowMenu}>← Quay lại</button>
              <VaccinationBatch />
            </div>
          )}
          {view === 'detail' && selectedBatch && (
            <div className="detail-view">
              <button className="btn-black" onClick={handleShowHistory}>← Quay lại</button>
              <VaccinationBatch batchData={selectedBatch} readOnly />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VaccinationManagement; 