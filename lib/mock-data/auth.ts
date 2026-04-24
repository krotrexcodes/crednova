/**
 * Mock authentication data and responses
 */

export interface User {
  id: string;
  name: string;
  mobileNumber: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: User;
    token?: string;
  };
}

// Mock OTP storage (in production, this would be sent to backend)
export const MOCK_OTP = '123456';

// Mock user data that would be returned after successful verification
export const MOCK_USER: User = {
  id: 'user_123',
  name: 'Aditya Kumar',
  mobileNumber: '+91 98765 43210',
  email: 'aditya.kumar@example.com',
  createdAt: new Date().toISOString(),
};

// Mock login response
export const mockLoginResponse = async (
  mobileNumber: string
): Promise<AuthResponse> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: `OTP sent to ${mobileNumber}`,
    data: {
      token: `mock_token_${Date.now()}`,
    },
  };
};

// Mock OTP verification response
export const mockVerifyOTPResponse = async (
  otp: string
): Promise<AuthResponse> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (otp === MOCK_OTP) {
    return {
      success: true,
      message: 'OTP verified successfully',
      data: {
        user: MOCK_USER,
        token: `mock_token_${Date.now()}_verified`,
      },
    };
  }

  return {
    success: false,
    message: 'Invalid OTP. Please try again.',
  };
};

// Helper to store user in localStorage
export const storeUser = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
};

// Helper to retrieve user from localStorage
export const getStoredUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Helper to logout
export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentUser');
  }
};

// Helper to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getStoredUser() !== null;
};
