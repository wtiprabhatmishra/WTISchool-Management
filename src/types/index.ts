export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  grade: string;
  class: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated';
  profileImage?: string;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  subject: string[];
  qualification: string;
  experience: number;
  joiningDate: string;
  salary: number;
  status: 'active' | 'inactive';
  profileImage?: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  teacherId: string;
  students: string[];
  schedule: ClassSchedule[];
  capacity: number;
  room: string;
}

export interface ClassSchedule {
  day: string;
  subject: string;
  startTime: string;
  endTime: string;
  teacherId: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  classId: string;
  subject: string;
  examType: 'quiz' | 'midterm' | 'final' | 'assignment' | 'project';
  marks: number;
  totalMarks: number;
  date: string;
  remarks?: string;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  type: 'tuition' | 'admission' | 'exam' | 'library' | 'transport' | 'other';
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
  userId?: string;
}