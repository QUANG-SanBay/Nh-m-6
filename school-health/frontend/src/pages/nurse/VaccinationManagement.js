import React, { useState, useEffect } from 'react';
import Header from '../../components/nurse/Header';
import Footer from '../../components/nurse/Footer';
import VaccinationBatch from './VaccinationBatch';
import '../../styles/VaccinationManagement.css';

const VaccinationManagement = () => {
  const [view, setView] = useState('menu'); // 'menu' | 'history' | 'create' | 'detail'
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batches, setBatches] = useState([]);

  const handleShowHistory = () => setView('history');
  const handleShowCreate = () => setView('create');
  const handleShowMenu = () => setView('menu');
  const handleShowDetail = (batch) => {
    setSelectedBatch(batch);
    setView('detail');
  };

  // Fetch batches from backend when view is 'history'
  useEffect(() => {
    if (view === 'history') {
      fetch('http://localhost:8080/api/vaccination-batches')
        .then(res => res.json())
        .then(data => setBatches(data));
    }
  }, [view]);

  const handleDeleteBatch = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đợt tiêm chủng này?')) {
      const res = await fetch(`http://localhost:8080/api/vaccination-batches/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setBatches(prev => prev.filter(batch => batch.maChienDich !== id));
        alert('Đã xóa thành công!');
      } else {
        alert('Xóa thất bại!');
      }
    }
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
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map(batch => (
                    <tr key={batch.maChienDich}>
                      <td>{batch.tenChienDich}</td>
                      <td>{batch.loaiVacXin}</td>
                      <td>{batch.ngayBatDau ? batch.ngayBatDau.split('T')[0] : ''}</td>
                      <td>{batch.diaDiem}</td>
                      <td>
                        <button className="btn-blue" onClick={() => handleShowDetail(batch)}>Xem chi tiết</button>
                      </td>
                      <td>
                        <button className="btn-red" onClick={() => handleDeleteBatch(batch.maChienDich)}>Xóa</button>
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
              <VaccinationBatch onCreated={handleShowHistory} />
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