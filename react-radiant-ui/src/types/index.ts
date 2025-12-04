// User types
export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  role: UserRole;
  email: string;
  password: string;
  name: string;
}

export interface AuthUser {
  id: string;
  role: UserRole;
  email: string;
  name: string;
}

// Student types
export type StudentStatus = 'active' | 'inactive' | 'pending';

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: StudentStatus;
  createdAt: string;
  [key: string]: unknown; // For custom fields
}

// Custom Field types
export type FieldType = 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'date' | 'time';

export interface CustomField {
  id: string;
  label: string;
  key: string;
  type: FieldType;
  required: boolean;
  options?: string[]; // For dropdown
}

// View types
export type ViewType = 'table' | 'gallery' | 'kanban' | 'timeline' | 'calendar';

// Drawer modes
export type DrawerMode = 'view' | 'edit' | 'create';
