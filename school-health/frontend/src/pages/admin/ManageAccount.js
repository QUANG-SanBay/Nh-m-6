import React, { useEffect, useState } from 'react';
import { userApi } from '../../api/userApi';

const ManageAccount = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userApi.getAllUsers()
      .then(data => {
        console.log("Dữ liệu nhận được:", data);
        setUsers(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá tài khoản này?")) {
      userApi.deleteUser(id)
        .then(() => {
          setUsers(prev => prev.filter(user => user.id !== id));
        })
        .catch(err => alert("Xoá thất bại"));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quản lý tài khoản người dùng</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên đăng nhập</th>
            <th>Vai trò</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => alert("Tính năng sửa chưa làm")}>Sửa</button>
                <button onClick={() => handleDelete(user.id)} style={{ marginLeft: '10px' }}>Xoá</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Đang tải...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAccount;
