const API_URL = 'http://localhost:8080/api';

// Fetch all students
export const fetchStudents = async () => {
  try {
    const response = await fetch(`${API_URL}/hocsinh`);
    if (!response.ok) throw new Error("Không thể gọi API");
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
    if (!response.ok) throw new Error("Không thể gọi API");
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
    if (!response.ok) throw new Error("Không thể gọi API");
    return await response.json();
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    throw error;
  }
};

// Update student health record
export const updateStudentHealthRecord = async (healthRecordId, healthData) => {
  try {
    const response = await fetch(`${API_URL}/hoso-suckhoe/${healthRecordId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(healthData)
    });
    if (!response.ok) throw new Error("Không thể cập nhật hồ sơ sức khỏe");
    return await response.json();
  } catch (error) {
    console.error("Lỗi cập nhật hồ sơ sức khỏe:", error);
    throw error;
  }
};

// Create new student health record
export const createStudentHealthRecord = async (healthData) => {
  try {
    const response = await fetch(`${API_URL}/hoso-suckhoe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(healthData)
    });
    if (!response.ok) throw new Error("Không thể tạo hồ sơ sức khỏe");
    return await response.json();
  } catch (error) {
    console.error("Lỗi tạo hồ sơ sức khỏe:", error);
    throw error;
  }
};