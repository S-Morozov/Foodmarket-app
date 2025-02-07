import config from '../config';
import {
  ApiResponse,
  Category,
  Restaurant,
  RestaurantDetails,
  Order,
  User,
} from '../types';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new ApiError(response.status, error.message || 'Something went wrong');
  }
  return response.json();
};

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${config.apiUrl}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = await getAuthToken();
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return handleResponse<T>(response);
};

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

const getAuthToken = async (): Promise<string | null> => {
  return authToken;
};

export const api = {
  // Categories
  getCategories: () =>
    request<ApiResponse<Category[]>>('/categories'),

  // Restaurants
  getRestaurants: (params?: { categoryId?: string; search?: string }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return request<ApiResponse<Restaurant[]>>(`/restaurants${query ? `?${query}` : ''}`);
  },

  getRestaurantById: (id: string) =>
    request<ApiResponse<RestaurantDetails>>(`/restaurants/${id}`),

  // Orders
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) =>
    request<ApiResponse<Order>>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    }),

  getOrders: () =>
    request<ApiResponse<Order[]>>('/orders'),

  getOrderById: (id: string) =>
    request<ApiResponse<Order>>(`/orders/${id}`),

  // Auth
  login: (email: string, password: string) =>
    request<ApiResponse<{ user: User; token: string }>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (data: { email: string; password: string; name: string }) =>
    request<ApiResponse<{ user: User; token: string }>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getProfile: () =>
    request<ApiResponse<User>>('/auth/profile'),

  updateProfile: (data: Partial<User>) =>
    request<ApiResponse<User>>('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

export { ApiError };
export default api;
