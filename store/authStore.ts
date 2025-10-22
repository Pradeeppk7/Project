import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, SignupData, AuthState } from '@/types/auth';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'instructor@example.com',
    name: 'John Instructor',
    role: 'instructor',
  },
  {
    id: '2',
    email: 'student@example.com',
    name: 'Jane Student',
    role: 'student',
  },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(
          u => u.email === credentials.email && u.role === credentials.role
        );
        
        if (user && credentials.password === 'password') {
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      signup: async (data: SignupData) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === data.email);
        if (existingUser) {
          set({ isLoading: false });
          return false;
        }
        
        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          email: data.email,
          name: data.name,
          role: data.role,
        };
        
        mockUsers.push(newUser);
        
        set({ 
          user: newUser, 
          isAuthenticated: true, 
          isLoading: false 
        });
        
        return true;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },

      checkAuth: () => {
        const { user } = get();
        if (user) {
          set({ isAuthenticated: true });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);