import React from 'react';
import { Student, StudentStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface KanbanViewProps {
  students: Student[];
  onCardClick: (student: Student) => void;
}

const columns: { status: StudentStatus; label: string; color: string }[] = [
  { status: 'active', label: 'Active', color: 'border-t-success' },
  { status: 'inactive', label: 'Inactive', color: 'border-t-destructive' },
  { status: 'pending', label: 'Pending', color: 'border-t-warning' },
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

export const KanbanView: React.FC<KanbanViewProps> = ({ students, onCardClick }) => {
  const groupedStudents = columns.map(col => ({
    ...col,
    students: students.filter(s => s.status === col.status),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      {groupedStudents.map(column => (
        <div
          key={column.status}
          className={cn(
            'bg-muted/30 rounded-lg border border-border border-t-4',
            column.color
          )}
        >
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{column.label}</h3>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {column.students.length}
              </span>
            </div>
          </div>
          <div className="p-2 space-y-2 max-h-[calc(100vh-300px)] overflow-auto">
            {column.students.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No students
              </p>
            ) : (
              column.students.map(student => (
                <Card
                  key={student.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onCardClick(student)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {student.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
