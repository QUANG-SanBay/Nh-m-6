import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthData } from '../utils/auth'; // Hàm lưu thông tin vào localStorage
import './Login.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080/api';

const Login = () => {
  const [formData, setFormData] = useState({ tenDangNhap: '', matKhau: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('[Login Response]', data);

      if (data.success) {
        if (data.vaiTro === 'HOC_SINH' && !data.maHocSinh) {
          setMessage('Thiếu mã học sinh từ server.');
          setLoading(false);
          return;
        }

        setAuthData({
          token: data.token,
          role: data.vaiTro,
          name: data.hoTen,
          maHocSinh: data.maHocSinh || '',
        });

        setMessage(data.message);

        const roleRouteMap = {
          PHU_HUYNH: '/parent/home',
          NHAN_VIEN_Y_TE: '/nurse/home',
          HOC_SINH: '/student/home',
          QUAN_LY_NHA_TRUONG: '/manager/home',
          QUAN_TRI_VIEN: '/admin/home',
        };

        setTimeout(() => {
          navigate(roleRouteMap[data.vaiTro] || '/');
        }, 1000);
      } else {
        setMessage(data.message || 'Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      console.error('[Login Error]', error);
      setMessage('Lỗi kết nối đến server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Hệ thống Quản lý Sức khỏe Học đường</h1>
          <p>Đăng nhập để tiếp tục</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="tenDangNhap">Tên đăng nhập</label>
            <input
              type="text"
              id="tenDangNhap"
              name="tenDangNhap"
              value={formData.tenDangNhap}
              onChange={handleChange}
              required
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div className="form-group">
            <label htmlFor="matKhau">Mật khẩu</label>
            <input
              type="password"
              id="matKhau"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu"
            />
          </div>

          {message && (
            <div className={`message ${message.includes('thành công') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Chưa có tài khoản?{' '}
            <button className="link-btn" onClick={() => setShowRegister(true)}>
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>

      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </div>
  );
};

const Register = ({ onClose }) => {
  const [formData, setFormData] = useState({
    tenDangNhap: '',
    matKhau: '',
    email: '',
    soDienThoai: '',
    vaiTro: 'PHU_HUYNH',
    hoTen: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('[Register Response]', data);

      if (data.success) {
        setMessage(data.message);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setMessage(data.message || 'Đăng ký thất bại.');
      }
    } catch (error) {
      console.error('[Register Error]', error);
      setMessage('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="register-modal">
        <div className="modal-header">
          <h2>Đăng ký tài khoản</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="hoTen">Họ và tên</label>
            <input
              type="text"
              id="hoTen"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              required
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tenDangNhap">Tên đăng nhập</label>
            <input
              type="text"
              id="tenDangNhap"
              name="tenDangNhap"
              value={formData.tenDangNhap}
              onChange={handleChange}
              required
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div className="form-group">
            <label htmlFor="matKhau">Mật khẩu</label>
            <input
              type="password"
              id="matKhau"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Nhập email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="soDienThoai">Số điện thoại</label>
            <input
              type="tel"
              id="soDienThoai"
              name="soDienThoai"
              value={formData.soDienThoai}
              onChange={handleChange}
              required
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vaiTro">Vai trò</label>
            <select id="vaiTro" name="vaiTro" value={formData.vaiTro} onChange={handleChange} required>
              <option value="PHU_HUYNH">Phụ huynh</option>
              <option value="HOC_SINH">Học sinh</option>
              <option value="NHAN_VIEN_Y_TE">Nhân viên y tế</option>
              <option value="QUAN_LY_NHA_TRUONG">Quản lý nhà trường</option>
              <option value="QUAN_TRI_VIEN">Quản trị viên</option>
            </select>
          </div>

          {message && (
            <div className={`message ${message.includes('thành công') ? 'success' : 'error'}`}>{message}</div>
          )}

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
