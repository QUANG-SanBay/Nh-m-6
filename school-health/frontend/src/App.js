import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import ParentHome from './pages/parent/Home';
import ParentProfile from './pages/parent/Profile';
import HealthResults from './pages/parent/HealthResults';
import HealthInfo from './pages/parent/HealthInfo';
import Medicine from './pages/parent/Medicine';
import Events from './pages/parent/Events';
import NurseHome from './pages/nurse/Home';
import NurseProfile from './pages/nurse/Profile';
import MedicalEvents from './pages/nurse/MedicalEvents';
import EditEvent from './pages/nurse/EditEvent';
import './App.css';
import StudentList from './pages/nurse/StudentHealth/StudentList';
import StudentHealthDetail from './pages/nurse/StudentHealth/StudentHealthDetail';
import PrescriptionRequestList from './pages/nurse/PrescriptionRequestList';
import PrescriptionRequestDetail from './pages/nurse/PrescriptionRequestDetail';
import MedicalSupplies from './pages/nurse/MedicalSupplies';
import MedicalExam from './pages/nurse/MedicalExam';
import VaccinationManagement from './pages/nurse/VaccinationManagement';
import EditStudentHealth from './pages/nurse/StudentHealth/EditStudentHealth';
import EventDetail from './pages/nurse/EventDetail';
import { Link } from 'react-router-dom';
import VaccinationBatch from './pages/nurse/VaccinationBatch';
import ManagerHome from './pages/manager/Home';
import Statistics from './pages/manager/statistics';
import Activity from './pages/manager/activity';
import Alerts from './pages/manager/alerts';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Parent Routes */}
          <Route path="/parent/home" element={
            <ProtectedRoute allowedRoles={['PHU_HUYNH']}>
              <ParentHome />
            </ProtectedRoute>
          } />
          <Route path="/parent/profile" element={
            <ProtectedRoute allowedRoles={['PHU_HUYNH']}>
              <ParentProfile />
            </ProtectedRoute>
          } />
          <Route path="/parent/medicine" element={
            <ProtectedRoute allowedRoles={['PHU_HUYNH']}>
              <Medicine />
            </ProtectedRoute>
          } />
          <Route path="/parent/health-info" element={
            <ProtectedRoute allowedRoles={['PHU_HUYNH']}>
              <HealthInfo />
            </ProtectedRoute>
          } />
          <Route path="/parent/health-results" element={
            <ProtectedRoute allowedRoles={['PHU_HUYNH']}>
              <HealthResults />
            </ProtectedRoute>
          } />
          <Route path="/parent/events" element={
            <ProtectedRoute allowedRoles={['PHU_HUYNH']}>
              <Events />
            </ProtectedRoute>
          } />
          <Route path="/parent/logout" element={<Logout />} />

          {/* Nurse Routes */}
          <Route path="/nurse" element={<Navigate to="/nurse/home" replace />} />
          <Route path="/nurse/home" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <NurseHome />
            </ProtectedRoute>
          } />
          <Route path="/nurse/profile" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <NurseProfile />
            </ProtectedRoute>
          } />
          <Route path="/nurse/prescription-requests" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <PrescriptionRequestList />
            </ProtectedRoute>
          } />
          <Route path="/nurse/prescription-request/:requestId" element={<PrescriptionRequestDetail />} />
          <Route path="/nurse/student-health" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <StudentList />
            </ProtectedRoute>
          } />
          <Route path="/nurse/student-health/:id" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <StudentHealthDetail />
            </ProtectedRoute>
          } />
          <Route path="/nurse/medical-supplies" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <MedicalSupplies />
            </ProtectedRoute>
          } />
          <Route path="/nurse/registration" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <div>Trang Quản lý đăng ký</div>
            </ProtectedRoute>
          } />
          <Route path="/nurse/medical-exam" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <MedicalExam />
            </ProtectedRoute>
          } />
          <Route path="/nurse/events" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <div>Trang Lịch sử sự kiện</div>
              <MedicalEvents />
            </ProtectedRoute>
          } />
          <Route path="/nurse/settings" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <div>Trang Cài đặt</div>
            </ProtectedRoute>
          } />
          <Route path="/nurse/logout" element={<Logout />} />
          <Route path="/nurse/vaccination-management" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <VaccinationManagement />
            </ProtectedRoute>
          } />
          <Route path="/nurse/medical-events" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <MedicalEvents />
            </ProtectedRoute>
          } />
          <Route path="/nurse/edit-event/:eventId" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <EditEvent />
            </ProtectedRoute>
          } />
          <Route path="/nurse/edit-student-health/:id" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <EditStudentHealth />
            </ProtectedRoute>
          } />
          <Route path="/nurse/events/:id/detail" element={<EventDetail />} />
          <Route path="/nurse/events/:id/edit" element={
            <ProtectedRoute allowedRoles={['NHAN_VIEN_Y_TE']}>
              <EditEvent />
            </ProtectedRoute>
          } />
          <Route path="/nurse/vaccination-batch" element={<VaccinationBatch />} />

          {/* Manager Routes */}
          <Route path="/manager" element={<Navigate to="/manager/home" replace />} />
          <Route path="/manager/home" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <ManagerHome />
            </ProtectedRoute>
          } />
          <Route path="/manager/statistics" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <Statistics /> 
            </ProtectedRoute>
          } />
          <Route path="/manager/activity" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <Activity />
            </ProtectedRoute>
          } />
          <Route path="/manager/alerts" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <Alerts />
            </ProtectedRoute>
          } />
          <Route path="/manager/logout" element={<Logout />} />
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;