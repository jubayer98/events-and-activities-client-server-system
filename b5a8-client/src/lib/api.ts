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

        const result = await response.json();

        if (!response.ok) {
            return {
                error: result.message || 'Something went wrong',
            };
        }

        // Handle the structure: {success, message, data: {user: {...}}}
        const userData = result.data?.user || result.data || result;
        return { data: userData as T, message: result.message };
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

    getProfile: async () => {
        return apiRequest('/auth/me', {
            method: 'GET',
        });
    },

    updateProfile: async (userData: {
        firstName?: string;
        lastName?: string;
        email?: string;
        gender?: string;
        profileImage?: string;
        bio?: string;
        interests?: string[];
        location?: string;
    }) => {
        return apiRequest('/auth/me', {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    },

  changePassword: async (passwords: {
    currentPassword: string;
    newPassword: string;
  }) => {
    return apiRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwords),
    });
  },

  requestRoleChange: async () => {
    return apiRequest('/user/request-role-change', {
      method: 'POST',
    });
  },
};

export const reviewApi = {
  getHostReviews: async (hostId: string) => {
    return apiRequest(`/reviews/host/${hostId}`, {
      method: 'GET',
    });
  },

  getHostRating: async (hostId: string) => {
    return apiRequest(`/reviews/host/${hostId}/rating`, {
      method: 'GET',
    });
  },

  getMyReviews: async () => {
    return apiRequest('/reviews/my-reviews', {
      method: 'GET',
    });
  },
};