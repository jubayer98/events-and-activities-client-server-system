const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Important for cookies
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.message || 'Something went wrong',
      };
    }

    return { data, message: data.message };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

export const authApi = {
  register: async (userData: {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password: string;
  }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },
};
