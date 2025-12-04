import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useStudents } from '@/hooks/useStudents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { students } = useStudents();

  const stats = [
    {
      title: 'Total Students',
      value: students.length,
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Active',
      value: students.filter(s => s.status === 'active').length,
      icon: UserCheck,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      title: 'Inactive',
      value: students.filter(s => s.status === 'inactive').length,
      icon: UserX,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
    {
      title: 'Pending',
      value: students.filter(s => s.status === 'pending').length,
      icon: Clock,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            {isAdmin 
              ? 'Here\'s an overview of your student management system.'
              : 'Here\'s your profile overview.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {!isAdmin && students.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{students[0]?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{students[0]?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{students[0]?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{students[0]?.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
