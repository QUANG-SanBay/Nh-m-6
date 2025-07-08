const API_BASE_URL = 'http://localhost:8080/api';

export const studentApi = {
  // ✅ Lấy thông tin hồ sơ học sinh
  getStudentById: async (maHocSinh) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profilestudent/${maHocSinh}`);
      if (!response.ok) {
        throw new Error('Không thể lấy thông tin học sinh');
      }
      return await response.json();
    } catch (error) {
      console.error('❌ Lỗi khi lấy thông tin học sinh:', error);
      throw error;
    }
  },

  // ✅ Cập nhật thông tin hồ sơ học sinh
  updateStudentProfile: async (maHocSinh, studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profilestudent/${maHocSinh}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) {
        throw new Error('Không thể cập nhật hồ sơ học sinh');
      }
      return await response.json();
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật hồ sơ học sinh:', error);
      throw error;
    }
  },

  // ✅ Tạo học sinh mới
  createStudent: async (studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hocsinh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) {
        throw new Error('Không thể tạo học sinh');
      }
      return await response.json();
    } catch (error) {
      console.error('❌ Lỗi khi tạo học sinh:', error);
      throw error;
    }
  },

  // ✅ Lấy danh sách học sinh
  getAllStudents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hocsinh`);
      if (!response.ok) {
        throw new Error('Không thể lấy danh sách học sinh');
      }
      return await response.json();
    } catch (error) {
      console.error('❌ Lỗi khi lấy danh sách học sinh:', error);
      throw error;
    }
  },

  // ✅ Lấy hồ sơ sức khỏe mới nhất
  getStudentHealth: async (maHocSinh) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hoso-suckhoe/hocsinh/${maHocSinh}`);
      if (!response.ok) {
        throw new Error('Không thể lấy thông tin sức khỏe');
      }

      return await response.json();
    } catch (error) {
      console.error('❌ Lỗi khi lấy thông tin sức khỏe:', error);
      throw error;
    }
  },

  // ✅ Cập nhật hoặc tạo hồ sơ sức khỏe
  updateStudentHealth: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hoso-suckhoe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Không thể lưu thông tin');
      }

      const result = await response.json();
      return result.data || result; // Trả về data nếu có
    } catch (error) {
      console.error('❌ Lỗi khi lưu hồ sơ sức khỏe:', error);
      throw error;
    }
  }
};
