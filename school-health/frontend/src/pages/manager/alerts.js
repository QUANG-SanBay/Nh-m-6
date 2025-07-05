import React, { useState } from 'react';

const Alerts = () => {
  const [alert, setAlert] = useState('');
  const [alerts, setAlerts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (alert.trim() === '') return;
    setAlerts([...alerts, alert]);
    setAlert('');
  };

  return (
    <div className="page-container">
      <h1>Cảnh báo y tế</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={alert}
          onChange={(e) => setAlert(e.target.value)}
          placeholder="Nhập nội dung cảnh báo"
        />
        <button type="submit">Thêm cảnh báo</button>
      </form>
      <ul>
        {alerts.map((item, index) => (
          <li key={index} style={{ color: 'red' }}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
