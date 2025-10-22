'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function StudentDashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'student') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!isAuthenticated || user?.role !== 'student') {
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
            <h1 className="heading-2 text-primary-600">Student Dashboard</h1>
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
              <CardTitle>My Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-small text-secondary-600 mb-4">
                Continue your learning journey
              </p>
              <Button className="w-full">View Courses</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Tutor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-small text-secondary-600 mb-4">
                Get personalized help from your AI learning companion
              </p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-small text-secondary-600 mb-4">
                Track your learning progress and achievements
              </p>
              <Button className="w-full" variant="outline">View Progress</Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8">
          <h2 className="heading-3 mb-4">Your Learning Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary-600">0</div>
                <div className="text-sm text-secondary-600">Enrolled Courses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-success-600">0</div>
                <div className="text-sm text-secondary-600">Completed Lessons</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-warning-600">0</div>
                <div className="text-sm text-secondary-600">AI Interactions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-accent-600">0</div>
                <div className="text-sm text-secondary-600">Study Hours</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="heading-3 mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-secondary-500 text-center">
                No recent activity. Start learning to see your progress here!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}