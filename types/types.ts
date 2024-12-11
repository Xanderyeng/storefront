export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  blurDataURL?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
  blurDataURL?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

