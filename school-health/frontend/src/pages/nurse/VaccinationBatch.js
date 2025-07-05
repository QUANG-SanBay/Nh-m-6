import React, { useState } from 'react';
import Header from '../../components/nurse/Header';
import Footer from '../../components/nurse/Footer';
import '../../styles/VaccinationBatch.css';

const initialBatch = {
  batchName: '',
  vaccineType: '',
  eventDate: '',
  location: '',
  expectedStudents: '',
  batchNote: '',
  vaccineInfo: {
    vaccineName: '',
    manufacturer: '',
    lotNumber: '',
    productionDate: '',
    expiryDate: '',
    vaccineNote: ''
  }
};

const VaccinationBatch = ({ onCreated }) => {
  const [batch, setBatch] = useState(initialBatch);
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in batch.vaccineInfo) {
      setBatch({ ...batch, vaccineInfo: { ...batch.vaccineInfo, [name]: value } });
    } else {
      setBatch({ ...batch, [name]: value });
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    const body = {
      ...batch,
      eventDate: batch.eventDate ? batch.eventDate + 'T00:00:00' : ''
    };
    const res = await fetch('http://localhost:8080/api/vaccination-batches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      setBatch(initialBatch);
      setIsEditing(true);
      alert('Tạo đợt tiêm chủng thành công!');
      if (onCreated) onCreated();
    } else {
      alert('Có lỗi khi tạo đợt tiêm chủng!');
      setIsEditing(true);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setBatch(initialBatch);
    setIsEditing(false);
  };

  return (
    <div className="nurse-layout">
      <Header />
      <main className="vaccination-batch-main">
        <div className="vaccination-batch-container">
          <h1 className="title">Quản lý đợt tiêm chủng</h1>
          <form className="vaccination-batch-form" onSubmit={e => e.preventDefault()}>
            <div className="info-row">
              <div>
                <label>Tên đợt tiêm chủng</label>
                <input type="text" name="batchName" value={batch.batchName} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Loại vắc-xin</label>
                <input type="text" name="vaccineType" value={batch.vaccineType} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Ngày diễn ra</label>
                <input type="date" name="eventDate" value={batch.eventDate} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Địa điểm</label>
                <input type="text" name="location" value={batch.location} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Số lượng học sinh dự kiến</label>
                <input type="number" name="expectedStudents" value={batch.expectedStudents} onChange={handleChange} disabled={!isEditing} />
              </div>
            </div>
            <div className="info-row">
              <div style={{width: '100%'}}>
                <label>Ghi chú chung</label>
                <textarea name="batchNote" value={batch.batchNote} onChange={handleChange} disabled={!isEditing} rows={2} />
              </div>
            </div>
            <h2 className="subtitle">Thông tin về loại vắc-xin</h2>
            <div className="info-row">
              <div>
                <label>Tên vắc-xin</label>
                <input type="text" name="vaccineName" value={batch.vaccineInfo.vaccineName} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Nhà sản xuất</label>
                <input type="text" name="manufacturer" value={batch.vaccineInfo.manufacturer} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Số lô</label>
                <input type="text" name="lotNumber" value={batch.vaccineInfo.lotNumber} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Ngày sản xuất</label>
                <input type="date" name="productionDate" value={batch.vaccineInfo.productionDate} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Hạn sử dụng</label>
                <input type="date" name="expiryDate" value={batch.vaccineInfo.expiryDate} onChange={handleChange} disabled={!isEditing} />
              </div>
            </div>
            <div className="info-row">
              <div style={{width: '100%'}}>
                <label>Ghi chú về vắc-xin</label>
                <textarea name="vaccineNote" value={batch.vaccineInfo.vaccineNote} onChange={handleChange} disabled={!isEditing} rows={2} />
              </div>
            </div>
            <div className="batch-action-buttons">
              {isEditing ? (
                <>
                  <button type="button" className="btn-black" onClick={handleSave}>Lưu</button>
                  <button type="button" className="btn-black" onClick={handleCancel}>Hủy</button>
                </>
              ) : (
                <button type="button" className="btn-blue" onClick={handleEdit}>Chỉnh sửa</button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VaccinationBatch; 