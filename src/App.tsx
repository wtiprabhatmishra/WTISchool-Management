import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SchoolProvider } from './contexts/SchoolContext';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import StudentList from './components/students/StudentList';
import TeacherList from './components/teachers/TeacherList';
import ClassList from './components/classes/ClassList';
import AttendanceTracker from './components/attendance/AttendanceTracker';
import GradeBook from './components/grades/GradeBook';

function App() {
  return (
    <SchoolProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<StudentList />} />
            <Route path="teachers" element={<TeacherList />} />
            <Route path="classes" element={<ClassList />} />
            <Route path="attendance" element={<AttendanceTracker />} />
            <Route path="grades" element={<GradeBook />} />
            <Route path="fees" element={<div className="p-8 text-center text-gray-500">Fee Management - Coming Soon</div>} />
            <Route path="reports" element={<div className="p-8 text-center text-gray-500">Reports & Analytics - Coming Soon</div>} />
            <Route path="settings" element={<div className="p-8 text-center text-gray-500">Settings - Coming Soon</div>} />
          </Route>
        </Routes>
      </Router>
    </SchoolProvider>
  );
}

export default App;