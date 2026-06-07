import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from './api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePic?: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  showBalance: boolean;
  login: (credentials: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  toggleBalanceVisibility: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      showBalance: true,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', credentials);
          const { token, data } = response.data;
          
          localStorage.setItem('aureus_token', token);
          set({ 
            user: data.user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Login failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/register', userData);
          const { token, data } = response.data;
          
          localStorage.setItem('aureus_token', token);
          set({ 
            user: data.user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Registration failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('aureus_token');
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
      },

      checkAuth: async () => {
        const token = localStorage.getItem('aureus_token');
        if (!token) return;

        set({ isLoading: true });
        try {
          const response = await api.get('/auth/me');
          set({ 
            user: response.data.data.user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          localStorage.removeItem('aureus_token');
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      },

      toggleBalanceVisibility: () => {
        set((state) => ({ showBalance: !state.showBalance }));
      },
    }),
    {
      name: 'aureus-auth-storage',
      partialize: (state) => ({ 
        token: state.token, 
        isAuthenticated: state.isAuthenticated,
        showBalance: state.showBalance 
      }),
    }
  )
);
