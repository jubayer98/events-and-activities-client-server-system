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
    return apiRequest('/users/request-role-change', {
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

export const userApi = {
  getAllUsers: async () => {
    return apiRequest('/users', {
      method: 'GET',
    });
  },

  getRoleChangeRequests: async () => {
    return apiRequest('/users/role-change-requests', {
      method: 'GET',
    });
  },

  getUserById: async (userId: string) => {
    return apiRequest(`/users/${userId}`, {
      method: 'GET',
    });
  },

  updateUserStatus: async (userId: string, status: boolean) => {
    return apiRequest(`/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  updateUserRole: async (userId: string, role: string) => {
    return apiRequest(`/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  },

  deleteUser: async (userId: string) => {
    return apiRequest(`/users/${userId}`, {
      method: 'DELETE',
    });
  },
};

export const eventApi = {
  createEvent: async (eventData: {
    name: string;
    type: string;
    date: string;
    time: string;
    location: string;
    requiredParticipant: {
      min: number;
      max: number;
    };
    description?: string;
    image?: string;
    feeStatus: 'free' | 'paid';
    joiningFee: number;
  }) => {
    return apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },

  getMyEvents: async () => {
    return apiRequest('/events/my-events', {
      method: 'GET',
    });
  },

  getEventById: async (eventId: string) => {
    return apiRequest(`/events/${eventId}`, {
      method: 'GET',
    });
  },

  updateEvent: async (eventId: string, eventData: {
    name: string;
    type: string;
    date: string;
    time: string;
    location: string;
    requiredParticipant: {
      min: number;
      max: number;
    };
    description?: string;
    image?: string;
    feeStatus: 'free' | 'paid';
    joiningFee: number;
  }) => {
    return apiRequest(`/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  },

  deleteEvent: async (eventId: string) => {
    return apiRequest(`/events/${eventId}`, {
      method: 'DELETE',
    });
  },

  getAllEvents: async (params?: {
    type?: string;
    feeStatus?: string;
    status?: string;
    search?: string;
    sortBy?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.type && params.type !== 'all') queryParams.append('type', params.type);
    if (params?.feeStatus && params.feeStatus !== 'all') queryParams.append('feeStatus', params.feeStatus);
    if (params?.status && params.status !== 'all') queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/events?${queryString}` : '/events';
    
    return apiRequest(url, {
      method: 'GET',
    });
  },

  approveEvent: async (eventId: string) => {
    return apiRequest(`/events/${eventId}/approval`, {
      method: 'PATCH',
      body: JSON.stringify({ approvalStatus: true }),
    });
  },

  updateEventStatus: async (eventId: string, status: string) => {
    return apiRequest(`/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

export const bookingApi = {
  createBooking: async (eventId: string) => {
    return apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify({ eventId }),
    });
  },

  checkBookingStatus: async (eventId: string) => {
    return apiRequest(`/bookings/check/${eventId}`, {
      method: 'GET',
    });
  },

  getMyBookings: async () => {
    return apiRequest('/bookings/my-bookings', {
      method: 'GET',
    });
  },

  cancelBooking: async (bookingId: string) => {
    return apiRequest(`/bookings/${bookingId}`, {
      method: 'DELETE',
    });
  },
};