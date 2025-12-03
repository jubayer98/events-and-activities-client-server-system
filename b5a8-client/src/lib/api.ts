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

        // Handle different response structures
        // {success, message, data: {user: {...}}} or {success, message, data: {review: {...}}} or {success, message, data: [...]}
        const responseData = result.data?.user || result.data?.review || result.data || result;
        return { data: responseData as T, message: result.message };
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

  getEventBookings: async (eventId: string) => {
    return apiRequest(`/events/${eventId}/bookings`, {
      method: 'GET',
    });
  },

  getEventBookingStats: async (eventId: string) => {
    return apiRequest(`/events/${eventId}/bookings/stats`, {
      method: 'GET',
    });
  },

  getEventParticipants: async (eventId: string) => {
    return apiRequest(`/events/${eventId}/participants`, {
      method: 'GET',
    });
  },

  getEventEarnings: async (eventId: string) => {
    return apiRequest(`/events/${eventId}/earnings`, {
      method: 'GET',
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

export const paymentApi = {
  createPaymentIntent: async (bookingId: string) => {
    return apiRequest('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify({ bookingId }),
    });
  },

  confirmPayment: async (bookingId: string, paymentIntentId: string) => {
    return apiRequest('/payments/confirm', {
      method: 'POST',
      body: JSON.stringify({ bookingId, paymentIntentId }),
    });
  },

  getPaymentStatus: async (bookingId: string) => {
    return apiRequest(`/payments/status/${bookingId}`, {
      method: 'GET',
    });
  },
};

export const reviewApi = {
  createReview: async (reviewData: {
    eventId: string;
    rating: number;
    comment?: string;
  }) => {
    return apiRequest('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  getHostReviews: async (hostId?: string) => {
    const endpoint = hostId ? `/reviews/host/${hostId}` : '/reviews';
    return apiRequest(endpoint, {
      method: 'GET',
    });
  },

  getHostRating: async (hostId?: string) => {
    const endpoint = hostId ? `/reviews/host/${hostId}/rating` : '/reviews/rating';
    return apiRequest(endpoint, {
      method: 'GET',
    });
  },

  getMyReviews: async () => {
    return apiRequest('/reviews/my-reviews', {
      method: 'GET',
    });
  },

  updateReview: async (reviewId: string, reviewData: {
    rating: number;
    comment?: string;
  }) => {
    return apiRequest(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  },

  deleteReview: async (reviewId: string) => {
    return apiRequest(`/reviews/${reviewId}`, {
      method: 'DELETE',
    });
  },
};

export const adminApi = {
  getDashboardStats: async () => {
    return apiRequest('/admin/dashboard/stats', {
      method: 'GET',
    });
  },
};