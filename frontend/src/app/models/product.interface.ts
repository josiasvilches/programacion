export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
  unit?: string;
  featured?: boolean;
  id_categoria?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: number;
  name: string;
  comment: string;
  rating: number;
  avatar: string;
  role: string;
}

export interface Schedule {
  day: string;
  hours: string;
}

export interface ContactInfo {
  phone: string;
  address: string;
  whatsapp: string;
  email: string;
}
