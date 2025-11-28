export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category: string;
  available: boolean;
  emoji?: string;
  imageUrl?: string;
  imagen_url?: string;
  stock?: number;
  new?: boolean;
  popular?: boolean;
  prepTime?: string;
  portions?: string;
}

export interface ProductDetails {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  available: boolean;
  imageUrl?: string;
  emoji: string;
  rating?: number;
  reviews?: number;
  prepTime?: string;
  portions?: string;
}