import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useStudents } from '@/hooks/useStudents';
import { Student, ViewType, DrawerMode } from '@/types';
import { StudentDrawer } from '@/components/students/StudentDrawer';
import { TableView } from '@/components/students/views/TableView';
import { GalleryView } from '@/components/students/views/GalleryView';
import { KanbanView } from '@/components/students/views/KanbanView';
import { TimelineView } from '@/components/students/views/TimelineView';
import { CalendarView } from '@/components/students/views/CalendarView';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  LayoutGrid,
  Columns3,
  Clock,
  Calendar,
  Plus,
} from 'lucide-react';

const viewIcons: Record<ViewType, React.ElementType> = {
  table: Table,
  gallery: LayoutGrid,
  kanban: Columns3,
  timeline: Clock,
  calendar: Calendar,
};

const Students: React.FC = () => {
  const { isAdmin } = useAuth();
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();
  const [currentView, setCurrentView] = useState<ViewType>('table');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>('view');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setDrawerMode('view');
    setDrawerOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedStudent(null);
    setDrawerMode('create');
    setDrawerOpen(true);
  };

  const handleSave = (data: Partial<Student>) => {
    if (drawerMode === 'create') {
      addStudent(data as Omit<Student, 'id' | 'createdAt'>);
    } else if (selectedStudent) {
      updateStudent(selectedStudent.id, data);
    }
  };

  const handleDelete = (id: string) => {
    deleteStudent(id);
  };

  const renderView = () => {
    switch (currentView) {
      case 'table':
        return <TableView students={students} onRowClick={handleStudentClick} />;
      case 'gallery':
        return <GalleryView students={students} onCardClick={handleStudentClick} />;
      case 'kanban':
        return <KanbanView students={students} onCardClick={handleStudentClick} />;
      case 'timeline':
        return <TimelineView students={students} onCardClick={handleStudentClick} />;
      case 'calendar':
        return <CalendarView students={students} onDayClick={handleStudentClick} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Students</h1>
            <p className="text-muted-foreground">
              {isAdmin
                ? 'Manage all student records'
                : 'View your profile in different formats'}
            </p>
          </div>
          {isAdmin && (
            <Button onClick={handleCreateClick}>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          )}
        </div>

        {/* View Tabs */}
        <Tabs value={currentView} onValueChange={v => setCurrentView(v as ViewType)}>
          <TabsList>
            {(Object.keys(viewIcons) as ViewType[]).map(view => {
              const Icon = viewIcons[view];
              return (
                <TabsTrigger key={view} value={view} className="capitalize">
                  <Icon className="h-4 w-4 mr-2" />
                  {view}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* View Content */}
        {renderView()}

        {/* Student Drawer */}
        <StudentDrawer
          isOpen={drawerOpen}
          mode={drawerMode}
          student={selectedStudent}
          onClose={() => setDrawerOpen(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default Students;
