import React from 'react';
import { useSchool } from '../../contexts/SchoolContext';
import StatsCard from './StatsCard';
import { Users, GraduationCap, Calendar, DollarSign, TrendingUp, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { students, teachers, classes, fees } = useSchool();

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(t => t.status === 'active').length;
  const totalClasses = classes.length;
  const pendingFees = fees.filter(f => f.status === 'pending').length;
  const totalFeeAmount = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = fees.filter(f => f.status === 'paid').length;

  const recentActivities = [
    { id: 1, action: 'New student enrolled', details: 'Emma Johnson joined Class 10A', time: '2 hours ago', type: 'student' },
    { id: 2, action: 'Fee payment received', details: '$2,500 payment from Michael Davis', time: '4 hours ago', type: 'payment' },
    { id: 3, action: 'Teacher added', details: 'Dr. Amanda Rodriguez joined Mathematics department', time: '1 day ago', type: 'teacher' },
    { id: 4, action: 'Attendance marked', details: 'Class 11B attendance completed', time: '2 days ago', type: 'attendance' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-primary-100 text-lg">Here's what's happening at WTISchool today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          color="primary"
          change={{ value: 12, type: 'increase' }}
        />
        <StatsCard
          title="Active Teachers"
          value={activeTeachers}
          icon={GraduationCap}
          color="secondary"
          change={{ value: 5, type: 'increase' }}
        />
        <StatsCard
          title="Total Classes"
          value={totalClasses}
          icon={Calendar}
          color="accent"
        />
        <StatsCard
          title="Fee Collection"
          value={`$${totalFeeAmount.toLocaleString()}`}
          icon={DollarSign}
          color="success"
          change={{ value: 8, type: 'increase' }}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Students</span>
              <span className="font-semibold text-green-600">{activeStudents}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Enrolled</span>
              <span className="font-semibold">{totalStudents}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full" 
                style={{ width: `${(activeStudents / totalStudents) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Paid Fees</span>
              <span className="font-semibold text-green-600">{paidFees}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Fees</span>
              <span className="font-semibold text-red-600">{pendingFees}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${(paidFees / fees.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-semibold">+12%</span>
              <span className="text-gray-600">Enrollment</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-semibold">+8%</span>
              <span className="text-gray-600">Fee Collection</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-semibold">+5%</span>
              <span className="text-gray-600">Teacher Retention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.details}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;