const API_BASE = "http://localhost:8080/api";

export const userApi = {
  // Lấy toàn bộ user hoặc theo vai trò (ví dụ: HOC_SINH, PHU_HUYNH,...)
  getAllUsers: (role = "") =>
    fetch(`${API_BASE}/users${role ? `?role=${role}` : ''}`)
      .then(res => {
        if (!res.ok) throw new Error("Lỗi khi tải dữ liệu người dùng");
        return res.json();
      }),

  // Xoá user theo ID
  deleteUser: (username, role) =>
  fetch(`${API_BASE}/admin/users/${username}?role=${role}`, {
    method: 'DELETE'
  })

}
