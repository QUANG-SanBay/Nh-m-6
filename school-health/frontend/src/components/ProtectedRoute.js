import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Kiểm tra xem user đã đăng nhập chưa
  if (!isAuthenticated()) {
    // Nếu chưa đăng nhập, chuyển về trang login
    return <Navigate to="/login" replace />;
  }

  // Nếu có yêu cầu về vai trò cụ thể
  if (allowedRoles.length > 0) {
    const userRole = getUserRole();
    if (!allowedRoles.includes(userRole)) {
      // Nếu không có quyền truy cập, chuyển về trang chủ tương ứng
      switch (userRole) {
        case 'PHU_HUYNH':
          return <Navigate to="/parent/home" replace />;
        case 'NHAN_VIEN_Y_TE':
          return <Navigate to="/nurse/home" replace />;
        case 'HOC_SINH':
          return <Navigate to="/student/home" replace />;
        case 'QUAN_LY_NHA_TRUONG':
          return <Navigate to="/manager/home" replace />;
        default:
          return <Navigate to="/login" replace />;
      }
    }
  }

  // Nếu đã đăng nhập và có quyền truy cập
  return children;
};

export default ProtectedRoute; 