import { User, Student, CustomField, AuthUser } from '@/types';

// Generic localStorage helpers
export const getItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Users
export const getUsers = (): User[] => getItem<User[]>('users') || [];

// Auth User
export const getAuthUser = (): AuthUser | null => getItem<AuthUser>('authUser');

export const setAuthUser = (user: AuthUser | null): void => {
  if (user) {
    setItem('authUser', user);
  } else {
    localStorage.removeItem('authUser');
  }
};

// Students
export const getStudents = (): Student[] => getItem<Student[]>('students') || [];

export const setStudents = (students: Student[]): void => {
  setItem('students', students);
};

export const addStudent = (student: Student): void => {
  const students = getStudents();
  students.push(student);
  setStudents(students);
};

export const updateStudent = (id: string, updates: Partial<Student>): void => {
  const students = getStudents();
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students[index] = { ...students[index], ...updates };
    setStudents(students);
  }
};

export const deleteStudent = (id: string): void => {
  const students = getStudents().filter(s => s.id !== id);
  setStudents(students);
};

// Custom Fields
export const getCustomFields = (): CustomField[] => getItem<CustomField[]>('customFields') || [];

export const setCustomFields = (fields: CustomField[]): void => {
  setItem('customFields', fields);
};

export const addCustomField = (field: CustomField): void => {
  const fields = getCustomFields();
  fields.push(field);
  setCustomFields(fields);
};

export const updateCustomField = (id: string, updates: Partial<CustomField>): void => {
  const fields = getCustomFields();
  const index = fields.findIndex(f => f.id === id);
  if (index !== -1) {
    fields[index] = { ...fields[index], ...updates };
    setCustomFields(fields);
  }
};

export const deleteCustomField = (id: string): void => {
  const fields = getCustomFields().filter(f => f.id !== id);
  setCustomFields(fields);
};
