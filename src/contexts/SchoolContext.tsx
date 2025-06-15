import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student, Teacher, Class, Attendance, Grade, Fee, Notification } from '../types';
import { mockStudents, mockTeachers, mockClasses, mockAttendance, mockGrades, mockFees } from '../utils/mockData';

interface SchoolContextType {
  students: Student[];
  teachers: Teacher[];
  classes: Class[];
  attendance: Attendance[];
  grades: Grade[];
  fees: Fee[];
  notifications: Notification[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  addClass: (classData: Omit<Class, 'id'>) => void;
  updateClass: (id: string, classData: Partial<Class>) => void;
  deleteClass: (id: string) => void;
  markAttendance: (attendance: Omit<Attendance, 'id'>) => void;
  addGrade: (grade: Omit<Grade, 'id'>) => void;
  addFee: (fee: Omit<Fee, 'id'>) => void;
  payFee: (feeId: string, paymentDate: string) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};

interface SchoolProviderProps {
  children: ReactNode;
}

export const SchoolProvider: React.FC<SchoolProviderProps> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  const [fees, setFees] = useState<Fee[]>(mockFees);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent: Student = { ...student, id: generateId() };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id: string, student: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...student } : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = { ...teacher, id: generateId() };
    setTeachers(prev => [...prev, newTeacher]);
  };

  const updateTeacher = (id: string, teacher: Partial<Teacher>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...teacher } : t));
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  const addClass = (classData: Omit<Class, 'id'>) => {
    const newClass: Class = { ...classData, id: generateId() };
    setClasses(prev => [...prev, newClass]);
  };

  const updateClass = (id: string, classData: Partial<Class>) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, ...classData } : c));
  };

  const deleteClass = (id: string) => {
    setClasses(prev => prev.filter(c => c.id !== id));
  };

  const markAttendance = (attendanceData: Omit<Attendance, 'id'>) => {
    const newAttendance: Attendance = { ...attendanceData, id: generateId() };
    setAttendance(prev => [...prev, newAttendance]);
  };

  const addGrade = (grade: Omit<Grade, 'id'>) => {
    const newGrade: Grade = { ...grade, id: generateId() };
    setGrades(prev => [...prev, newGrade]);
  };

  const addFee = (fee: Omit<Fee, 'id'>) => {
    const newFee: Fee = { ...fee, id: generateId() };
    setFees(prev => [...prev, newFee]);
  };

  const payFee = (feeId: string, paymentDate: string) => {
    setFees(prev => prev.map(f => 
      f.id === feeId ? { ...f, status: 'paid' as const, paymentDate } : f
    ));
  };

  const value: SchoolContextType = {
    students,
    teachers,
    classes,
    attendance,
    grades,
    fees,
    notifications,
    addStudent,
    updateStudent,
    deleteStudent,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    addClass,
    updateClass,
    deleteClass,
    markAttendance,
    addGrade,
    addFee,
    payFee,
  };

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
};