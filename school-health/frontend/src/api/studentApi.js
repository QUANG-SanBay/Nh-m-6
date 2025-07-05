// src/api/studentApi.js

const API_BASE_URL = 'http://localhost:8080/api';

export const studentApi = {
  // Lấy thông tin học sinh theo mã học sinh
  getStudentById: async (maHocSinh) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hoc-sinh/${maHocSinh}`);
      if (!response.ok) {
        throw new Error('Không thể lấy thông tin học sinh');
      }
      return await response.json();
    } catch (error) {
      console.error('Lỗi khi lấy thông tin học sinh:', error);
      throw error;
    }
  },

  // Cập nhật thông tin hồ sơ học sinh
  updateStudentProfile: async (maHocSinh, studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hoc-sinh/${maHocSinh}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) {
        throw new Error('Không thể cập nhật hồ sơ học sinh');
      }
      return await response.json();
    } catch (error) {
      console.error('Lỗi khi cập nhật hồ sơ học sinh:', error);
      throw error;
    }
  },

  // Tạo hồ sơ học sinh mới (nếu cần)
  createStudent: async (studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hoc-sinh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) {
        throw new Error('Không thể tạo học sinh');
      }
      return await response.json();
    } catch (error) {
      console.error('Lỗi khi tạo học sinh:', error);
      throw error;
    }
  },

  // Lấy toàn bộ danh sách học sinh
  getAllStudents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hoc-sinh`);
      if (!response.ok) {
        throw new Error('Không thể lấy danh sách học sinh');
      }
      return await response.json();
    } catch (error) {
      console.error('Lỗi khi lấy danh sách học sinh:', error);
      throw error;
    }
  },
};
