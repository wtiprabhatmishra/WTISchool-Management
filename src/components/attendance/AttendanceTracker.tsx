import React, { useState } from 'react';
import { useSchool } from '../../contexts/SchoolContext';
import { Calendar, Users, Check, X, Clock, Download } from 'lucide-react';

const AttendanceTracker: React.FC = () => {
  const { students, classes, attendance, markAttendance } = useSchool();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState<Record<string, 'present' | 'absent' | 'late'>>({});

  const selectedClassData = classes.find(c => c.id === selectedClass);
  const classStudents = selectedClassData ? 
    students.filter(s => selectedClassData.students.includes(s.id)) : [];

  const todayAttendance = attendance.filter(a => 
    a.date === selectedDate && a.classId === selectedClass
  );

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmitAttendance = () => {
    Object.entries(attendanceData).forEach(([studentId, status]) => {
      markAttendance({
        studentId,
        classId: selectedClass,
        date: selectedDate,
        status
      });
    });
    setAttendanceData({});
    alert('Attendance marked successfully!');
  };

  const getAttendanceStatus = (studentId: string) => {
    const existing = todayAttendance.find(a => a.studentId === studentId);
    if (existing) return existing.status;
    return attendanceData[studentId] || undefined;
  };

  const getAttendanceStats = () => {
    const total = classStudents.length;
    const present = classStudents.filter(s => getAttendanceStatus(s.id) === 'present').length;
    const absent = classStudents.filter(s => getAttendanceStatus(s.id) === 'absent').length;
    const late = classStudents.filter(s => getAttendanceStatus(s.id) === 'late').length;
    
    return { total, present, absent, late };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Tracker</h1>
          <p className="text-gray-600">Mark and manage student attendance</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Choose a class</option>
              {classes.map(classItem => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name} - {classItem.grade}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Stats */}
        {selectedClass && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Total</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Present</span>
              </div>
              <p className="text-2xl font-bold text-green-900 mt-1">{stats.present}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <X className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-red-900">Absent</span>
              </div>
              <p className="text-2xl font-bold text-red-900 mt-1">{stats.absent}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Late</span>
              </div>
              <p className="text-2xl font-bold text-yellow-900 mt-1">{stats.late}</p>
            </div>
          </div>
        )}
      </div>

      {/* Student List */}
      {selectedClass && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedClassData?.name} - Attendance for {new Date(selectedDate).toLocaleDateString()}
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {classStudents.map((student) => {
                const status = getAttendanceStatus(student.id);
                const isAlreadyMarked = todayAttendance.some(a => a.studentId === student.id);
                
                return (
                  <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        {student.profileImage ? (
                          <img
                            src={student.profileImage}
                            alt={`${student.firstName} ${student.lastName}`}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-primary-600 font-semibold">
                            {student.firstName[0]}{student.lastName[0]}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </h4>
                        <p className="text-sm text-gray-500">Grade {student.grade}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => !isAlreadyMarked && handleAttendanceChange(student.id, 'present')}
                        disabled={isAlreadyMarked}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          status === 'present'
                            ? 'bg-green-100 text-green-800 border-2 border-green-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
                        } ${isAlreadyMarked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => !isAlreadyMarked && handleAttendanceChange(student.id, 'late')}
                        disabled={isAlreadyMarked}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          status === 'late'
                            ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-yellow-50 hover:text-yellow-700'
                        } ${isAlreadyMarked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Late
                      </button>
                      <button
                        onClick={() => !isAlreadyMarked && handleAttendanceChange(student.id, 'absent')}
                        disabled={isAlreadyMarked}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          status === 'absent'
                            ? 'bg-red-100 text-red-800 border-2 border-red-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700'
                        } ${isAlreadyMarked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Absent
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {Object.keys(attendanceData).length > 0 && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSubmitAttendance}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Submit Attendance
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {!selectedClass && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a class to mark attendance</h3>
          <p className="text-gray-500">Choose a class from the dropdown to get started.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracker;