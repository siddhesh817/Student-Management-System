import React from 'react';
import { Student } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TimelineViewProps {
  students: Student[];
  onCardClick: (student: Student) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-success';
    case 'inactive':
      return 'bg-destructive';
    case 'pending':
      return 'bg-warning';
    default:
      return 'bg-muted';
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

export const TimelineView: React.FC<TimelineViewProps> = ({ students, onCardClick }) => {
  const sortedStudents = [...students].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (students.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No students found
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

      <div className="space-y-4">
        {sortedStudents.map((student, index) => (
          <div key={student.id} className="relative flex gap-4">
            {/* Timeline dot */}
            <div
              className={cn(
                'w-3 h-3 rounded-full mt-5 z-10 ring-4 ring-background',
                getStatusColor(student.status)
              )}
            />

            {/* Card */}
            <Card
              className="flex-1 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onCardClick(student)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getInitials(student.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className="capitalize mb-1"
                    >
                      {student.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {student.createdAt}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
