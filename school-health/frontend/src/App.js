// src/App.js
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
import VaccinationBatch from './pages/nurse/VaccinationBatch';


import ManagerHome from './pages/manager/Home';
import Statistics from './pages/manager/statistics';
import ManagerProfile from './pages/manager/Profile';
import MedicalEventsManager from './pages/manager/MedicalEventsManager';
import StudentListManager from './pages/manager/StudentHealth/StudentListManager';
import StudentHealthDetailManager from './pages/manager/StudentHealth/StudentHealthDetailManager';
import EditStudentHealthManager from './pages/manager/StudentHealth/EditStudentHealthManager';
import EditEventManager from './pages/manager/EditEventManager';
import EventDetailManager from './pages/manager/EventDetailManager';
import MedicalExamManager from './pages/manager/MedicalExamManager';
import EventsManager from './pages/manager/EventsManager';

import ParentStudentList from './pages/parent/StudentList';
import StudentHome from './pages/Student/Home.js';
import StudentProfile from './pages/Student/Profile';

import HealthProfile from './pages/Student/HealthProfile';
import StudentHealthInfo from './pages/Student/StudentHealthInfo';
import StudentEvents from './pages/Student/StudentEvents';
import MedicalHistory from './pages/Student/MedicalHistory';

import AdminHome from './pages/admin/Home';
import ManageAccount from './pages/admin/ManageAccount';

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
          <Route path="/student/health-info" element={
            <ProtectedRoute allowedRoles={['HOC_SINH']}>
               <StudentHealthInfo />
             </ProtectedRoute>
          } />
          <Route path="/student/medical-history" element={
            <ProtectedRoute allowedRoles={['HOC_SINH']}>
              <MedicalHistory />
            </ProtectedRoute>
          } />
          <Route path="/student/events" element={
             <ProtectedRoute allowedRoles={['HOC_SINH']}>
                <StudentEvents />
            </ProtectedRoute>
          } />
          <Route path="/student/home" element={
            <ProtectedRoute allowedRoles={['HOC_SINH']}>
              <StudentHome />
            </ProtectedRoute>
          } />
          
          <Route path="/student/health" element={
            <ProtectedRoute allowedRoles={['HOC_SINH']}>
              <HealthProfile />
            </ProtectedRoute>
          } />
          <Route path="/student/profile"element={
            <ProtectedRoute allowedRoles={['HOC_SINH']}>
              <StudentProfile />
            </ProtectedRoute>
          } />
          <Route path="/parent/medicine" element={
            <ProtectedRoute allowedRoles={['PHU_HUYNH']}>
              <Medicine />
            </ProtectedRoute>
          } />
          <Route path="/parent/students" element={
            <ProtectedRoute allowedRoles={['PHU_HUYNH']}>
              <ParentStudentList />
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

          <Route path="/manager/profile" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <ManagerProfile />
            </ProtectedRoute>
          } />
          <Route path="/manager/statistics" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <Statistics /> 
            </ProtectedRoute>
          } />
          <Route path="/manager/events" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <MedicalEventsManager />
            </ProtectedRoute>
          } />
          <Route path="/manager/medical-events" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <MedicalEventsManager />
            </ProtectedRoute>
          } />
          <Route path="/manager/student-health" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <StudentListManager />
            </ProtectedRoute>
          } />
          <Route path="/manager/student-health/:id" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <StudentHealthDetailManager />
            </ProtectedRoute>
          } />
          <Route path="/manager/student-health/:id/edit" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <EditStudentHealthManager />
            </ProtectedRoute>
          } />
          <Route path="/manager/edit-event/:eventId" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <EditEventManager />
            </ProtectedRoute>
          } />
          <Route path="/manager/events/:id/detail" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <EventDetailManager />
            </ProtectedRoute>
          } />
          <Route path="/manager/medical-exam" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <MedicalExamManager />
            </ProtectedRoute>
          } />
          <Route path="/manager/events/:id/edit" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <EditEventManager />
            </ProtectedRoute>
          } />
          <Route path="/manager/medical-events/:id/detail" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <EventDetailManager />
            </ProtectedRoute>
          } />
          <Route path="/manager/medical-events/:id/edit" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <EditEventManager />
            </ProtectedRoute>
          } />
          <Route path="/manager/medical-events/:id" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <EventDetailManager />
            </ProtectedRoute>
          } />
          <Route path="/manager/settings" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <div>Trang Cài đặt</div>
            </ProtectedRoute>
          } />
          <Route path="/manager/eventsManager" element={
            <ProtectedRoute allowedRoles={['QUAN_LY_NHA_TRUONG']}>
              <EventsManager />
            </ProtectedRoute>
          } />
          
          <Route path="/manager/logout" element={<Logout />} />
          {/* Admin Route */}
          <Route path="/admin/home" element={
            <ProtectedRoute allowedRoles={['QUAN_TRI_VIEN']}>
              <AdminHome />
            </ProtectedRoute>
          } />

          <Route path="/admin/manage_account" element={
            <ProtectedRoute allowedRoles={['QUAN_TRI_VIEN']}>
              <ManageAccount />
            </ProtectedRoute>
          } />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
