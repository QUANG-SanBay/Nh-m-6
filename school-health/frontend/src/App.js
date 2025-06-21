import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Parent Routes */}
          <Route path="/parent/home" element={<ParentHome />} />
          <Route path="/parent/profile" element={<ParentProfile />} />
          <Route path="/parent/medicine" element={<Medicine />} />
          <Route path="/parent/health-info" element={<HealthInfo />} />
          <Route path="/parent/health-results" element={<HealthResults />} />
          <Route path="/parent/events" element={<Events />} />
          <Route path="/parent/logout" element={<div>Trang Đăng xuất</div>} />

          {/* Nurse Routes */}
          <Route path="/nurse" element={<Navigate to="/nurse/home" replace />} />
          <Route path="/nurse/home" element={<NurseHome />} />
          <Route path="/nurse/profile" element={<NurseProfile />} />
          <Route path="/nurse/prescription-requests" element={<PrescriptionRequestList />} />
          <Route path="/nurse/prescription-request/:requestId" element={<PrescriptionRequestDetail />} />
          <Route path="/nurse/student-health" element={<StudentList />} />
          <Route path="/nurse/student-health/:id" element={<StudentHealthDetail />} />
          <Route path="/nurse/student-health/:id/edit" element={<EditStudentHealth />} />
          <Route path="/nurse/medical-supplies" element={<MedicalSupplies />} />
          <Route path="/nurse/registration" element={<div>Trang Quản lý đăng ký</div>} />
          <Route path="/nurse/medical-exam" element={<MedicalExam />} />
          <Route path="/nurse/events" element={<MedicalEvents />} />
          <Route path="/nurse/events/:eventId/edit" element={<EditEvent />} />
          <Route path="/nurse/settings" element={<div>Trang Cài đặt</div>} />
          <Route path="/nurse/logout" element={<div>Trang Đăng xuất</div>} />
          <Route path="/nurse/vaccination-management" element={<VaccinationManagement />} />

          {/* Redirect root to parent home */}
          <Route path="/" element={<Navigate to="/parent/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;