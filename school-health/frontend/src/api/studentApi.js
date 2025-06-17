const API_URL = 'http://localhost:8080/api';

export const fetchStudents = async () => {
  try {
    const response = await fetch(`${API_URL}/students`);
    if (!response.ok) throw new Error("Không thể gọi API");
    return await response.json();
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    throw error;
  }
};