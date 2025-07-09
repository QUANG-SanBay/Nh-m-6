import React, { useEffect, useState } from 'react';
import { userApi } from '../../api/userApi';
import Header from '../../components/manager/Header';  // 🔁 dùng đúng header Manager
import Footer from '../../components/admin/Footer';     // (nếu có footer riêng thì dùng đúng path)

const roles = [
  { label: 'Tất cả', value: '' },
  { label: 'Quản trị viên', value: 'QUAN_TRI_VIEN' },
  { label: 'Nhân viên y tế', value: 'NHAN_VIEN_Y_TE' },
  { label: 'Học sinh', value: 'HOC_SINH' },
  { label: 'Phụ huynh', value: 'PHU_HUYNH' },
  { label: 'Quản lý nhà trường', value: 'QUAN_LY_NHA_TRUONG' },
];

const ManageAccount = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('');

  const fetchUsers = (role) => {
    userApi.getAllUsers(role)
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers(filterRole);
  }, [filterRole]);

  const handleDelete = (username, role) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá tài khoản này?")) {
      userApi.deleteUser(username, role)
        .then(() => setUsers(prev => prev.filter(user => user.tenDangNhap !== username)))
        .catch(err => alert("Xoá thất bại"));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header /> {/* ✅ dùng đúng header có avatar + dropdown */}

      <div style={{ padding: '20px', flexGrow: 1 }}>
        <h2>Quản lý tài khoản người dùng</h2>

        <div style={{ marginBottom: '20px' }}>
          {roles.map(role => (
            <button
              key={role.value}
              onClick={() => setFilterRole(role.value)}
              style={{ marginRight: '10px' }}
            >
              {role.label}
            </button>
          ))}
        </div>

        <table border="1" cellPadding="10" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên đăng nhập</th>
              <th>Vai trò</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map(user => (
              <tr key={user.tenDangNhap}>
                <td>{user.maQuanTriVien || user.maNguoiDung || user.id}</td>
                <td>{user.tenDangNhap}</td>
                <td>{user.vaiTro}</td>
                <td>{user.hoTen}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => alert("Tính năng sửa chưa làm")}>Sửa</button>
                  <button
                    onClick={() => handleDelete(user.tenDangNhap, user.vaiTro)}
                    style={{ marginLeft: '10px' }}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default ManageAccount;
