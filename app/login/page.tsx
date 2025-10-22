'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'instructor' | 'student'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login({ email, password, role });
      if (success) {
        router.push(role === 'instructor' ? '/dashboard' : '/student-dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="heading-2 text-primary-600">AI Learning Companion</h1>
          <p className="body-medium text-secondary-600 mt-2">Sign in to your account</p>
        </div>

        <Card className="shadow-large">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-secondary-700 mb-2">
                  I am a:
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={role === 'student'}
                      onChange={(e) => setRole(e.target.value as 'student')}
                      className="mr-2"
                    />
                    Student
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="instructor"
                      checked={role === 'instructor'}
                      onChange={(e) => setRole(e.target.value as 'instructor')}
                      className="mr-2"
                    />
                    Instructor
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="text-error-600 text-sm bg-error-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="bg-primary-50 p-4 rounded-md">
                <p className="text-sm text-primary-800 font-medium mb-2">Demo Credentials:</p>
                <p className="text-sm text-primary-700">
                  <strong>Instructor:</strong> instructor@example.com / password
                </p>
                <p className="text-sm text-primary-700">
                  <strong>Student:</strong> student@example.com / password
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <p className="text-center text-sm text-secondary-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary-600 hover:text-primary-500 font-medium">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}