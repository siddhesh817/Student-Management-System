import useSWR, { mutate } from 'swr';
import { Student } from '@/types';
import { 
  getStudents, 
  addStudent as addStudentToStorage, 
  updateStudent as updateStudentInStorage,
  deleteStudent as deleteStudentFromStorage 
} from '@/lib/localStorage';
import { useAuth } from '@/context/AuthContext';

const STUDENTS_KEY = 'students';

// Fetcher function for SWR
const fetcher = (): Student[] => getStudents();

export const useStudents = () => {
  const { user, isAdmin } = useAuth();
  
  const { data: students = [], error, isLoading } = useSWR<Student[]>(
    STUDENTS_KEY,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Filter students based on role
  const filteredStudents = isAdmin 
    ? students 
    : students.filter(s => s.id === user?.id);

  const addStudent = (student: Omit<Student, 'id' | 'createdAt'>) => {
    const newStudent = {
      ...student,
      id: `student-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    } as Student;
    addStudentToStorage(newStudent);
    mutate(STUDENTS_KEY);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    updateStudentInStorage(id, updates);
    mutate(STUDENTS_KEY);
  };

  const deleteStudent = (id: string) => {
    deleteStudentFromStorage(id);
    mutate(STUDENTS_KEY);
  };

  const refreshStudents = () => {
    mutate(STUDENTS_KEY);
  };

  return {
    students: filteredStudents,
    allStudents: students,
    isLoading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
    refreshStudents,
  };
};
