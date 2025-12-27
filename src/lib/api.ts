/**
 * API Configuration and Utilities
 * 
 * All API calls use environment variables for base URLs.
 * Never hardcode API URLs in the codebase.
 * 
 * Route Convention: /internal/{service}/{action}
 * Examples:
 *   - /internal/auth/signup
 *   - /internal/auth/login
 *   - /internal/auth/logout
 */

// Get base URL from environment variables
const getBaseUrl = (): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (!baseUrl) {
    console.warn('VITE_API_BASE_URL is not defined. Using default localhost.');
    return 'http://localhost:9000';
  }
  
  return baseUrl;
};

export const API_BASE_URL = getBaseUrl();

// API Route builders
export const API_ROUTES = {
  auth: {
    signup: `${API_BASE_URL}/internal/auth/signup`,
    login: `${API_BASE_URL}/internal/auth/login`,
    logout: `${API_BASE_URL}/internal/auth/logout`,
    forgotPassword: `${API_BASE_URL}/internal/auth/forgot-password`,
    verifyOtp: `${API_BASE_URL}/internal/auth/verify-otp`,
    resetPassword: `${API_BASE_URL}/internal/auth/reset-password`,
    resendOtp: `${API_BASE_URL}/internal/auth/resend-otp`,
    checkUsername: `${API_BASE_URL}/internal/auth/check-username`,
    checkEmail: `${API_BASE_URL}/internal/auth/check-email`,
  },
} as const;

// Generic fetch wrapper with error handling
interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Response types
interface LoginResponse {
  success: boolean;
  user?: { id: string; email: string; firstName: string; lastName: string };
  token?: string;
}

interface SignupResponse {
  success: boolean;
  token?: string;
}

interface VerifyOtpResponse {
  success: boolean;
  resetToken?: string;
}

interface CheckAvailabilityResponse {
  available: boolean;
}

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        error: data?.message || data?.error || 'An error occurred',
        status: response.status,
      };
    }

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error',
      status: 0,
    };
  }
}

// Auth-specific API functions
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiRequest<LoginResponse>(API_ROUTES.auth.login, {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  signup: (userData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
  }) =>
    apiRequest<SignupResponse>(API_ROUTES.auth.signup, {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  logout: () =>
    apiRequest(API_ROUTES.auth.logout, {
      method: 'POST',
    }),

  forgotPassword: (identifier: string) =>
    apiRequest(API_ROUTES.auth.forgotPassword, {
      method: 'POST',
      body: JSON.stringify({ identifier }),
    }),

  verifyOtp: (data: { identifier: string; otp: string }) =>
    apiRequest<VerifyOtpResponse>(API_ROUTES.auth.verifyOtp, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  resetPassword: (data: { token: string; password: string }) =>
    apiRequest(API_ROUTES.auth.resetPassword, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  resendOtp: (identifier: string) =>
    apiRequest(API_ROUTES.auth.resendOtp, {
      method: 'POST',
      body: JSON.stringify({ identifier }),
    }),

  checkUsername: (username: string) =>
    apiRequest<CheckAvailabilityResponse>(API_ROUTES.auth.checkUsername, {
      method: 'POST',
      body: JSON.stringify({ username }),
    }),

  checkEmail: (email: string) =>
    apiRequest<CheckAvailabilityResponse>(API_ROUTES.auth.checkEmail, {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};
