const API_URL = 'http://localhost:8080/api';

// ✅ Lấy danh sách học sinh
export const fetchStudents = async () => {
  try {
    const response = await fetch(`${API_URL}/hocsinh`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách học sinh');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    throw error;
  }
};

// ✅ Lấy thông tin học sinh theo ID
export const fetchStudentById = async (studentId) => {
  try {
    const response = await fetch(`${API_URL}/hocsinh/${studentId}`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy thông tin học sinh');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    throw error;
  }
};

// ✅ Cập nhật thông tin học sinh
export const updateStudentById = async (studentId, studentData) => {
  try {
    const response = await fetch(`${API_URL}/hocsinh/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData)
    });
    if (!response.ok) {
      throw new Error('Lỗi cập nhật thông tin học sinh');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    throw error;
  }
};

// ✅ Lấy hồ sơ sức khỏe học sinh (route riêng cho học sinh)
export const fetchStudentHealthRecord = async (studentId) => {
  try {
    const response = await fetch(`${API_URL}/student/health-profile/${studentId}`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy hồ sơ sức khỏe');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    throw error;
  }
};

// ✅ Cập nhật hồ sơ sức khỏe học sinh (route riêng cho học sinh)
export const updateStudentHealthRecordByStudentId = async (studentId, healthData) => {
  try {
    const response = await fetch(`${API_URL}/student/health-profile/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(healthData)
    });
    if (!response.ok) {
      throw new Error('Lỗi cập nhật hồ sơ sức khỏe');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi cập nhật hồ sơ sức khỏe:", error);
    throw error;
  }
};

// ❌ (Không dùng cho học sinh) - API tạo mới hồ sơ sức khỏe dành cho admin hoặc hệ thống
export const createStudentHealthRecord = async (healthData) => {
  try {
    const response = await fetch(`${API_URL}/hoso-suckhoe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(healthData)
    });
    if (!response.ok) {
      throw new Error('Lỗi tạo hồ sơ sức khỏe');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi tạo hồ sơ sức khỏe:", error);
    throw error;
  }
};
