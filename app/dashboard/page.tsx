'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'instructor') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!isAuthenticated || user?.role !== 'instructor') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="heading-2 text-primary-600">Instructor Dashboard</h1>
            <p className="body-medium text-secondary-600">Welcome back, {user.name}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Sign Out
          </Button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-small text-secondary-600 mb-4">
                Start building your AI-assisted course content
              </p>
              <Button className="w-full">Create New Course</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-small text-secondary-600 mb-4">
                View and manage your student roster
              </p>
              <Button className="w-full" variant="outline">View Students</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-small text-secondary-600 mb-4">
                Track student progress and engagement
              </p>
              <Button className="w-full" variant="outline">View Analytics</Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8">
          <h2 className="heading-3 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary-600">0</div>
                <div className="text-sm text-secondary-600">Active Courses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-success-600">0</div>
                <div className="text-sm text-secondary-600">Total Students</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-warning-600">0</div>
                <div className="text-sm text-secondary-600">Assignments</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-accent-600">0</div>
                <div className="text-sm text-secondary-600">AI Interactions</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}