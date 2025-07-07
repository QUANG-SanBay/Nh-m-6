import AdminHome from './pages/admin/Home';

<Route path="/admin/home" element={
  <ProtectedRoute allowedRoles={['QUAN_TRI_VIEN']}>
    <AdminHome />
  </ProtectedRoute>
} />
