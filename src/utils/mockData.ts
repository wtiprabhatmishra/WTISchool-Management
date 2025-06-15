import { Student, Teacher, Class, Attendance, Grade, Fee } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.johnson@email.com',
    phone: '+1-234-567-8901',
    dateOfBirth: '2008-03-15',
    grade: '10th',
    class: '10A',
    parentName: 'Robert Johnson',
    parentEmail: 'robert.johnson@email.com',
    parentPhone: '+1-234-567-8900',
    address: '123 Oak Street, Springfield, IL 62701',
    enrollmentDate: '2023-08-15',
    status: 'active',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Davis',
    email: 'michael.davis@email.com',
    phone: '+1-234-567-8902',
    dateOfBirth: '2007-11-20',
    grade: '11th',
    class: '11B',
    parentName: 'Sarah Davis',
    parentEmail: 'sarah.davis@email.com',
    parentPhone: '+1-234-567-8903',
    address: '456 Pine Avenue, Springfield, IL 62702',
    enrollmentDate: '2022-08-20',
    status: 'active',
    profileImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    firstName: 'Sophia',
    lastName: 'Wilson',
    email: 'sophia.wilson@email.com',
    phone: '+1-234-567-8904',
    dateOfBirth: '2009-05-08',
    grade: '9th',
    class: '9A',
    parentName: 'James Wilson',
    parentEmail: 'james.wilson@email.com',
    parentPhone: '+1-234-567-8905',
    address: '789 Elm Street, Springfield, IL 62703',
    enrollmentDate: '2024-08-10',
    status: 'active',
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    firstName: 'Dr. Amanda',
    lastName: 'Rodriguez',
    email: 'amanda.rodriguez@wtischool.edu',
    phone: '+1-234-567-9001',
    department: 'Mathematics',
    subject: ['Algebra', 'Calculus', 'Geometry'],
    qualification: 'PhD in Mathematics',
    experience: 12,
    joiningDate: '2020-08-15',
    salary: 75000,
    status: 'active',
    profileImage: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    firstName: 'Prof. David',
    lastName: 'Thompson',
    email: 'david.thompson@wtischool.edu',
    phone: '+1-234-567-9002',
    department: 'Science',
    subject: ['Physics', 'Chemistry'],
    qualification: 'Masters in Physics',
    experience: 8,
    joiningDate: '2021-01-10',
    salary: 68000,
    status: 'active',
    profileImage: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    firstName: 'Ms. Lisa',
    lastName: 'Chen',
    email: 'lisa.chen@wtischool.edu',
    phone: '+1-234-567-9003',
    department: 'English',
    subject: ['Literature', 'Creative Writing', 'Grammar'],
    qualification: 'Masters in English Literature',
    experience: 6,
    joiningDate: '2022-03-01',
    salary: 62000,
    status: 'active',
    profileImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Class 10A',
    grade: '10th',
    section: 'A',
    teacherId: '1',
    students: ['1'],
    capacity: 30,
    room: 'Room 101',
    schedule: [
      { day: 'Monday', subject: 'Mathematics', startTime: '09:00', endTime: '10:00', teacherId: '1' },
      { day: 'Monday', subject: 'Science', startTime: '10:00', endTime: '11:00', teacherId: '2' },
      { day: 'Tuesday', subject: 'English', startTime: '09:00', endTime: '10:00', teacherId: '3' },
    ]
  },
  {
    id: '2',
    name: 'Class 11B',
    grade: '11th',
    section: 'B',
    teacherId: '2',
    students: ['2'],
    capacity: 28,
    room: 'Room 201',
    schedule: [
      { day: 'Monday', subject: 'Physics', startTime: '09:00', endTime: '10:00', teacherId: '2' },
      { day: 'Tuesday', subject: 'Mathematics', startTime: '10:00', endTime: '11:00', teacherId: '1' },
    ]
  }
];

export const mockAttendance: Attendance[] = [
  {
    id: '1',
    studentId: '1',
    classId: '1',
    date: new Date().toISOString().split('T')[0],
    status: 'present'
  },
  {
    id: '2',
    studentId: '2',
    classId: '2',
    date: new Date().toISOString().split('T')[0],
    status: 'present'
  }
];

export const mockGrades: Grade[] = [
  {
    id: '1',
    studentId: '1',
    classId: '1',
    subject: 'Mathematics',
    examType: 'midterm',
    marks: 85,
    totalMarks: 100,
    date: '2024-01-15',
    remarks: 'Excellent performance'
  },
  {
    id: '2',
    studentId: '2',
    classId: '2',
    subject: 'Physics',
    examType: 'quiz',
    marks: 78,
    totalMarks: 100,
    date: '2024-01-10'
  }
];

export const mockFees: Fee[] = [
  {
    id: '1',
    studentId: '1',
    amount: 2500,
    dueDate: '2024-02-01',
    status: 'paid',
    paymentDate: '2024-01-25',
    type: 'tuition',
    description: 'Quarterly tuition fee'
  },
  {
    id: '2',
    studentId: '2',
    amount: 2500,
    dueDate: '2024-02-01',
    status: 'pending',
    type: 'tuition',
    description: 'Quarterly tuition fee'
  }
];