// src/api/userApi.js
export const userApi = {
  getAllUsers: async () => {
    const res = await fetch("http://localhost:8080/api/users");
    if (!res.ok) throw new Error("Lỗi khi lấy danh sách người dùng");
    return await res.json();
  },

  deleteUser: async (id) => {
    const res = await fetch(`http://localhost:8080/api/users/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error("Lỗi khi xoá người dùng");
    return true;
  }
};
