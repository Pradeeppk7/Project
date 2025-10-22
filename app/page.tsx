'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function HomePage() {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        // Redirect based on user role
        if (user.role === 'instructor') {
          router.push('/dashboard');
        } else {
          router.push('/student-dashboard');
        }
      } else {
        // Redirect to login if not authenticated
        router.push('/login');
      }
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Show loading state while checking authentication
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <h2 className="heading-3 text-secondary-700">Loading Scarlet Studio App...</h2>
      </div>
    </div>
  );
}