export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  emoji?: string;
  imagen?: string;
  imagen_url?: string;
  disponible?: boolean;
  unit?: string;
  id_categoria?: number;
  featured?: boolean;
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
