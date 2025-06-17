import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ParentHome from './pages/parent/Home';
import ParentProfile from './pages/parent/Profile';
import HealthResults from './pages/parent/HealthResults';
import HealthInfo from './pages/parent/HealthInfo';
import Medicine from './pages/parent/Medicine';
import Events from './pages/parent/Events';
import './App.css';

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

          {/* Redirect root to parent home */}
          <Route path="/" element={<Navigate to="/parent/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;