import React, { useState } from 'react';
import { linkPhuHuynhToHocSinh, linkByEmail } from '../api/parentApi';

const LinkStudentToParent = () => {
  const [formData, setFormData] = useState({
    maHocSinh: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.maHocSinh || !formData.email) {
      setMessage('Vui lòng nhập đầy đủ thông tin');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await linkByEmail(formData.maHocSinh, formData.email);
      setMessage('Liên kết thành công!');
      setMessageType('success');
      setFormData({ maHocSinh: '', email: '' });
    } catch (error) {
      setMessage(error.message || 'Có lỗi xảy ra khi liên kết');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="link-student-container">
      <h2>Liên kết học sinh với phụ huynh</h2>
      
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mã học sinh:</label>
          <input
            type="text"
            name="maHocSinh"
            value={formData.maHocSinh}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email phụ huynh:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Đang liên kết...' : 'Liên kết'}
        </button>
      </form>
    </div>
  );
};

export default LinkStudentToParent;