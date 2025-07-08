// Utility functions for authentication

export const logout = () => {
  // Xóa tất cả thông tin đăng nhập khỏi localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  
  // Xóa các thông tin khác nếu có
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userPhone');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  return token && userRole;
};

export const getUserRole = () => {
  return localStorage.getItem('userRole');
};

export const getUserName = () => {
  return localStorage.getItem('userName');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setAuthData = (data) => {
  if (data.token) localStorage.setItem('token', data.token);
  if (data.role) localStorage.setItem('userRole', data.role);
  if (data.name) localStorage.setItem('userName', data.name);
  if (data.id) localStorage.setItem('userId', data.id);
  if (data.maHocSinh) localStorage.setItem('maHocSinh', data.maHocSinh); 
  if (data.email) localStorage.setItem('userEmail', data.email);
  if (data.phone) localStorage.setItem('userPhone', data.phone);
}; 
export const getUserId = () => {
  return localStorage.getItem('maHocSinh'); // hoặc 'userId' nếu backend dùng tên đó
};
