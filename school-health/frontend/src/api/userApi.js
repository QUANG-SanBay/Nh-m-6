const API_BASE = "http://localhost:8080/api";

export const userApi = {
  getAllUsers: (role = "") =>
    fetch(`${API_BASE}/users${role ? `?role=${role}` : ''}`)
      .then(res => {
        if (!res.ok) throw new Error("Lỗi khi tải dữ liệu người dùng");
        return res.json();
      }),

deleteUser: (id, role) =>
  fetch(`${API_BASE}/admin/users/${id}?role=${role}`, {
    method: 'DELETE',
  }),

};
