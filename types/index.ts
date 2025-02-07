export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: string;
  distance: string;
  deliveryTime: string;
  deliveryFee: number;
  tags: string[];
  about: string;
}

export interface Meal {
  id: number;
  name: string;
  price: number;
  info: string;
  image: any;
}

export interface MealCategory {
  category: string;
  meals: Meal[];
}

export interface RestaurantDetails extends Restaurant {
  menu: MealCategory[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface OrderItem {
  mealId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  serviceFee: number;
  deliveryFee: number;
  createdAt: string;
  estimatedDelivery?: string;
  address: Address;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'delivering'
  | 'delivered'
  | 'cancelled';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  totalPages: number;
  totalItems: number;
}
