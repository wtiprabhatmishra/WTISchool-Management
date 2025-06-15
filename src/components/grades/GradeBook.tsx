import React, { useState } from 'react';
import { useSchool } from '../../contexts/SchoolContext';
import { Plus, Search, Filter, Edit, BookOpen, Award, TrendingUp } from 'lucide-react';

const GradeBook: React.FC = () => {
  const { students, classes, grades, addGrade } = useSchool();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showAddGrade, setShowAddGrade] = useState(false);

  const [newGrade, setNewGrade] = useState({
    studentId: '',
    subject: '',
    examType: 'quiz' as const,
    marks: 0,
    totalMarks: 100,
    remarks: ''
  });

  const selectedClassData = classes.find(c => c.id === selectedClass);
  const classStudents = selectedClassData ? 
    students.filter(s => selectedClassData.students.includes(s.id)) : [];

  const filteredGrades = grades.filter(grade => {
    const matchesClass = !selectedClass || grade.classId === selectedClass;
    const matchesSubject = !selectedSubject || grade.subject === selectedSubject;
    return matchesClass && matchesSubject;
  });

  const subjects = [...new Set(grades.map(g => g.subject))];

  const getStudentGrades = (studentId: string) => {
    return filteredGrades.filter(g => g.studentId === studentId);
  };

  const getStudentAverage = (studentId: string) => {
    const studentGrades = getStudentGrades(studentId);
    if (studentGrades.length === 0) return null;
    
    const totalPercentage = studentGrades.reduce((sum, grade) => 
      sum + (grade.marks / grade.totalMarks) * 100, 0
    );
    return Math.round(totalPercentage / studentGrades.length);
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 80) return 'text-blue-600 bg-blue-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    if (percentage >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const handleAddGrade = () => {
    if (newGrade.studentId && newGrade.subject && selectedClass) {
      addGrade({
        ...newGrade,
        classId: selectedClass,
        date: new Date().toISOString().split('T')[0]
      });
      setNewGrade({
        studentId: '',
        subject: '',
        examType: 'quiz',
        marks: 0,
        totalMarks: 100,
        remarks: ''
      });
      setShowAddGrade(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grade Book</h1>
          <p className="text-gray-600">Manage student grades and assessments</p>
        </div>
        <button 
          onClick={() => setShowAddGrade(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Grade</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Classes</option>
              {classes.map(classItem => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grade Overview */}
      {selectedClass && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedClassData?.name} - Grade Overview
            </h3>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="flex items-center space-x-2 text-left py-3 px-4 font-semibold text-gray-900">Student</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Average</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Total Grades</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Performance</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classStudents.map((student) => {
                    const average = getStudentAverage(student.id);
                    const studentGrades = getStudentGrades(student.id);
                    
                    return (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                              {student.profileImage ? (
                                <img
                                  src={student.profileImage}
                                  alt={`${student.firstName} ${student.lastName}`}
                                  className="h-8 w-8 rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-primary-600 font-semibold text-sm">
                                  {student.firstName[0]}{student.lastName[0]}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {student.firstName} {student.lastName}
                              </p>
                              <p className="text-sm text-gray-500">ID: {student.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-4 px-4">
                          {average !== null ? (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getGradeColor(average)}`}>
                              {average}%
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">No grades</span>
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          <span className="text-gray-700 font-medium">{studentGrades.length}</span>
                        </td>
                        <td className="text-center py-4 px-4">
                          {average !== null ? (
                            <div className="flex items-center justify-center space-x-1">
                              <TrendingUp className={`h-4 w-4 ${average >= 75 ? 'text-green-500' : 'text-red-500'}`} />
                              <span className={`text-sm font-medium ${average >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                                {average >= 90 ? 'Excellent' : average >= 75 ? 'Good' : 'Needs Improvement'}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">N/A</span>
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200">
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Recent Grades */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Grades</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {filteredGrades.slice(0, 10).map((grade) => {
              const student = students.find(s => s.id === grade.studentId);
              const percentage = Math.round((grade.marks / grade.totalMarks) * 100);
              
              return (
                <div key={grade.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-secondary-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {student?.firstName} {student?.lastName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {grade.subject} • {grade.examType} • {new Date(grade.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        {grade.marks}/{grade.totalMarks}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getGradeColor(percentage)}`}>
                        {percentage}%
                      </span>
                    </div>
                    {grade.remarks && (
                      <p className="text-sm text-gray-500 mt-1">{grade.remarks}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Grade Modal */}
      {showAddGrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Grade</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
                <select
                  value={newGrade.studentId}
                  onChange={(e) => setNewGrade({...newGrade, studentId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Student</option>
                  {classStudents.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.firstName} {student.lastName}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={newGrade.subject}
                  onChange={(e) => setNewGrade({...newGrade, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter subject"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                <select
                  value={newGrade.examType}
                  onChange={(e) => setNewGrade({...newGrade, examType: e.target.value as any})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="quiz">Quiz</option>
                  <option value="midterm">Midterm</option>
                  <option value="final">Final</option>
                  <option value="assignment">Assignment</option>
                  <option value="project">Project</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Marks</label>
                  <input
                    type="number"
                    value={newGrade.marks}
                    onChange={(e) => setNewGrade({...newGrade, marks: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                  <input
                    type="number"
                    value={newGrade.totalMarks}
                    onChange={(e) => setNewGrade({...newGrade, totalMarks: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Remarks (Optional)</label>
                <textarea
                  value={newGrade.remarks}
                  onChange={(e) => setNewGrade({...newGrade, remarks: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add remarks..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddGrade(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGrade}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Add Grade
              </button>
            </div>
          </div>
        </div>
      )}

      {!selectedClass && filteredGrades.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Award className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No grades available</h3>
          <p className="text-gray-500">Select a class to view and manage grades.</p>
        </div>
      )}
    </div>
  );
};

export default GradeBook;