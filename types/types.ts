export interface Product {
    // blurDataURL: string | undefined;
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
  }
export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Category {
  id: string
  name: string
  image?: string
}
  
  export interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
  }
    