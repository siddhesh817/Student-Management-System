import React, { useMemo } from 'react';
import { Student } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarViewProps {
  students: Student[];
  onDayClick: (student: Student) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-success/10 text-success';
    case 'inactive':
      return 'bg-destructive/10 text-destructive';
    case 'pending':
      return 'bg-warning/10 text-warning';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const CalendarView: React.FC<CalendarViewProps> = ({ students, onDayClick }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const { daysInMonth, firstDayOfMonth, monthName, year } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    return { daysInMonth, firstDayOfMonth, monthName, year };
  }, [currentDate]);

  const studentsByDate = useMemo(() => {
    const map: Record<string, Student[]> = {};
    students.forEach(student => {
      const date = student.createdAt;
      if (!map[date]) map[date] = [];
      map[date].push(student);
    });
    return map;
  }, [students]);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays: (number | null)[] = [];

  // Add empty slots for days before the first day
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const formatDate = (day: number) => {
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold text-foreground">
          {monthName} {year}
        </h2>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Days header */}
      <div className="grid grid-cols-7 border-b border-border">
        {days.map(day => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-muted-foreground bg-muted/50"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          const dateStr = day ? formatDate(day) : '';
          const dayStudents = dateStr ? studentsByDate[dateStr] || [] : [];

          return (
            <div
              key={index}
              className={cn(
                'min-h-[100px] p-2 border-b border-r border-border',
                index % 7 === 6 && 'border-r-0',
                !day && 'bg-muted/20'
              )}
            >
              {day && (
                <>
                  <span className="text-sm text-muted-foreground">{day}</span>
                  <div className="mt-1 space-y-1">
                    {dayStudents.slice(0, 2).map(student => (
                      <Badge
                        key={student.id}
                        variant="secondary"
                        className={cn(
                          'w-full justify-start truncate text-xs cursor-pointer',
                          getStatusColor(student.status)
                        )}
                        onClick={() => onDayClick(student)}
                      >
                        {student.name}
                      </Badge>
                    ))}
                    {dayStudents.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{dayStudents.length - 2} more
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
