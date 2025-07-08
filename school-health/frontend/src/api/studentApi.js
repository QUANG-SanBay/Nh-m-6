const API_URL = 'http://localhost:8080/api';

// Fetch all students
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

// Fetch student by ID
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

// Update student by ID
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

// Fetch student health record by student ID
export const fetchStudentHealthRecord = async (studentId) => {
  try {
    const response = await fetch(`${API_URL}/hoso-suckhoe/hocsinh/${studentId}`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy hồ sơ sức khỏe');
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    throw error;
  }
};

// Update student health record by student ID
export const updateStudentHealthRecordByStudentId = async (studentId, healthData) => {
  try {
    const response = await fetch(`${API_URL}/hoso-suckhoe/hocsinh/${studentId}/update`, {
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

// Create new student health record for a specific student
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
