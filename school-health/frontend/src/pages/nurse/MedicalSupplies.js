import React, { useState } from 'react';
import Header from '../../components/nurse/Header';
import Footer from '../../components/nurse/Footer';
import '../../styles/MedicalSupplies.css';

const initialRows = [
  { name: 'Hạ Sốt', quantity: '', expiry: '', toBuy: '' },
  { name: 'Giảm đau', quantity: '', expiry: '', toBuy: '' },
  { name: 'Bao tử', quantity: '', expiry: '', toBuy: '' },
  { name: 'Hỗn mê tán dược', quantity: '', expiry: '', toBuy: '' },
  { name: 'Băng gạc', quantity: '', expiry: '', toBuy: '' },
  { name: 'Băng cá nhân', quantity: '', expiry: '', toBuy: '' },
];

const MedicalSupplies = () => {
  const [rows, setRows] = useState(initialRows);

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { name: '', quantity: '', expiry: '', toBuy: '' }]);
  };

  const handleIncreaseToBuy = (index) => {
    const newRows = [...rows];
    const current = parseInt(newRows[index].toBuy) || 0;
    newRows[index].toBuy = current + 1;
    setRows(newRows);
  };

  const handleUpdateStock = () => {
    alert('Cập nhật kho thành công!');
  };

  const handleSendRequest = () => {
    alert('Đã gửi yêu cầu mua thuốc và vật tư!');
  };

  return (
    <div className="nurse-layout">
      <Header />
      <main className="medical-supplies-main">
        <div className="medical-supplies-container">
          <h1 className="title">Kho Y tế</h1>
          <form className="medical-supplies-form" onSubmit={e => e.preventDefault()}>
            <h2 className="subtitle">Thuốc & vật tư:</h2>
            <table className="supplies-table">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Số lượng còn lại</th>
                  <th>Hạn sử dụng</th>
                  <th></th>
                  <th>Số lượng cần mua</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <input
                        type="text"
                        value={row.name}
                        onChange={e => handleChange(idx, 'name', e.target.value)}
                        className="input-name"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={e => handleChange(idx, 'quantity', e.target.value)}
                        className="input-quantity"
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={row.expiry}
                        onChange={e => handleChange(idx, 'expiry', e.target.value)}
                        className="input-expiry"
                      />
                    </td>
                    <td>
                      <button type="button" className="plus-btn" onClick={() => handleIncreaseToBuy(idx)}>+</button>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.toBuy}
                        onChange={e => handleChange(idx, 'toBuy', e.target.value)}
                        className="input-tobuy"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="add-row-btn" onClick={handleAddRow}>Thêm</button>
            <div className="action-buttons">
              <button type="button" className="update-btn" onClick={handleUpdateStock}>Cập nhật kho</button>
              <button type="button" className="request-btn" onClick={handleSendRequest}>Gửi Yêu Cầu Mua Thuốc và Vật Tư</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MedicalSupplies; 