import { User, Student, CustomField } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'admin-1',
    role: 'admin',
    email: 'admin@school.com',
    password: 'admin123',
    name: 'Super Admin',
  },
  {
    id: 'student-1',
    role: 'student',
    email: 'john@student.com',
    password: 'john123',
    name: 'John Doe',
  },
  {
    id: 'student-2',
    role: 'student',
    email: 'emma@student.com',
    password: 'emma123',
    name: 'Emma Watson',
  },
];

export const mockCustomFields: CustomField[] = [
  {
    id: 'cf-1',
    label: 'Gender',
    key: 'gender',
    type: 'dropdown',
    required: true,
    options: ['Male', 'Female', 'Other'],
  },
  {
    id: 'cf-2',
    label: 'Date of Birth',
    key: 'dob',
    type: 'date',
    required: true,
  },
  {
    id: 'cf-3',
    label: 'Is Active',
    key: 'isActive',
    type: 'checkbox',
    required: false,
  },
  {
    id: 'cf-4',
    label: 'Profile Bio',
    key: 'bio',
    type: 'textarea',
    required: false,
  },
];

export const mockStudents: Student[] = [
  {
    id: 'student-1',
    name: 'John Doe',
    email: 'john@student.com',
    phone: '+91-9876543210',
    status: 'active',
    createdAt: '2024-12-10',
    gender: 'Male',
    dob: '2002-05-21',
    isActive: true,
    bio: 'Computer science student with interest in frontend.',
  },
  {
    id: 'student-2',
    name: 'Emma Watson',
    email: 'emma@student.com',
    phone: '+91-9123456780',
    status: 'inactive',
    createdAt: '2024-12-15',
    gender: 'Female',
    dob: '2001-09-14',
    isActive: false,
    bio: 'Design-focused learner exploring UI/UX.',
  },
];

// Initialize localStorage with mock data if not present
export const initializeMockData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem('students')) {
    localStorage.setItem('students', JSON.stringify(mockStudents));
  }
  if (!localStorage.getItem('customFields')) {
    localStorage.setItem('customFields', JSON.stringify(mockCustomFields));
  }
};
