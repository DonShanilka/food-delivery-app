import { NavigatorScreenParams } from "@react-navigation/native";

// ─── Backend-matched Types ────────────────────────────────────────────────────

export interface User {
  _id: string;
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  role: 'CUSTOMER' | 'DRIVER' | 'RESTAURANT' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
}

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  cuisine: string;
  openingTime?: string;
  closingTime?: string;
  category?: string;
  rating: number;
  isActive?: boolean;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  menu?: any[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  isAvailable: boolean;
  preparationTime: number;
  discount: number;
  image: string;
}

export interface OrderItem {
  name: string;
  size?: string;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentStatus = 'UNPAID' | 'PAID' | 'REFUNDED';
export type PaymentMethod = 'CASH' | 'CARD' | 'ONLINE';

export interface Order {
  _id: string;
  userId?: string;
  restaurantId?: string | Restaurant;
  driverId?: string;
  items: OrderItem[];
  address: string;
  phoneNumber: string;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  notes?: string;
  estimatedDeliveryTime?: number;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Cart (local state only) ──────────────────────────────────────────────────

export interface CartItem {
  menuItem: MenuItem;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Restaurant: { restaurantId: string };
  Checkout: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};
