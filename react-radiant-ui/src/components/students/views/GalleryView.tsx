import React from 'react';
import { Student } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryViewProps {
  students: Student[];
  onCardClick: (student: Student) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-success/10 text-success border-success/20';
    case 'inactive':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'pending':
      return 'bg-warning/10 text-warning border-warning/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

export const GalleryView: React.FC<GalleryViewProps> = ({ students, onCardClick }) => {
  if (students.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No students found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {students.map(student => (
        <Card
          key={student.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onCardClick(student)}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-16 w-16 mb-3">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-foreground mb-1">{student.name}</h3>
              <Badge
                variant="outline"
                className={cn('capitalize mb-3', getStatusColor(student.status))}
              >
                {student.status}
              </Badge>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate max-w-[150px]">{student.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{student.phone}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
