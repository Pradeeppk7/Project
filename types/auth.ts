export interface User {
  id: string;
  email: string;
  name: string;
  role: 'instructor' | 'student';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'instructor' | 'student';
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'instructor' | 'student';
}