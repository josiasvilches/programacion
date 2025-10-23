import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.interface';
import { environment } from '../../enviroments/enviroments.development';

export interface PaginationData {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ProductsResponse {
  productos: Product[];
  pagination: PaginationData;
}

export interface ProductFilters {
  page?: number;
  per_page?: number;
  id_categoria?: number;
  nombre?: string;
  precio_min?: number;
  precio_max?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = environment.apiUrl;
  
  // BehaviorSubject para manejar los productos de la API
  private apiProductsSubject = new BehaviorSubject<Product[]>([]);
  public apiProducts$ = this.apiProductsSubject.asObservable();

  // BehaviorSubject para manejar la información de paginación
  private paginationSubject = new BehaviorSubject<PaginationData>({
    total: 0,
    page: 1,
    per_page: 10,
    total_pages: 1
  });
  public pagination$ = this.paginationSubject.asObservable();

  private featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Pollo al Spiedo',
      description: 'Dorado a la perfección con nuestro adobo secreto',
      price: 3500,
      category: 'Principales',
      emoji: '🍗',
      unit: 'pollo entero',
      featured: true,
    },
    {
      id: 2,
      name: 'Milanesas',
      description: 'Crocantes por fuera, tiernas por dentro',
      price: 2800,
      category: 'Principales',
      emoji: '🥩',
      unit: 'con guarnición',
      featured: true,
    },
    {
      id: 3,
      name: 'Empanadas',
      description: 'Masa casera horneada diariamente',
      price: 450,
      category: 'Empanadas',
      emoji: '🥟',
      unit: 'cada una',
      featured: true,
    },
  ];

  private recommendedProducts: Product[] = [
    {
      id: 4,
      name: 'Asado de Tira',
      description: 'Jugoso y tierno, cocinado a la parrilla',
      price: 4200,
      category: 'Parrilla',
      emoji: '🥩',
      unit: 'por kg',
    },
    {
      id: 5,
      name: 'Empanadas Dulces',
      description: 'Membrillo, batata y dulce de leche',
      price: 380,
      category: 'Postres',
      emoji: '🥧',
      unit: 'cada una',
    },
    {
      id: 6,
      name: 'Matambre a la Pizza',
      description: 'Con salsa, jamón, queso y aceitunas',
      price: 3200,
      category: 'Principales',
      emoji: '🍕',
      unit: 'porción',
    },
    {
      id: 7,
      name: 'Tartas Caseras',
      description: 'Jamón y queso, verdura, atún',
      price: 2400,
      category: 'Principales',
      emoji: '🥧',
      unit: 'porción',
    },
    {
      id: 8,
      name: 'Pollo Grillé',
      description: 'A la plancha con hierbas aromáticas',
      price: 2900,
      category: 'Principales',
      emoji: '🐔',
      unit: 'con guarnición',
    },
    {
      id: 9,
      name: 'Papas Fritas Caseras',
      description: 'Cortadas y fritas al momento',
      price: 1200,
      category: 'Guarniciones',
      emoji: '🍟',
      unit: 'porción grande',
    },
  ];

  getFeaturedProducts(): Product[] {
    return this.featuredProducts;
  }

  getRecommendedProducts(): Product[] {
    return this.recommendedProducts;
  }

  getAllProducts(): Product[] {
    return [...this.featuredProducts, ...this.recommendedProducts];
  }

  getProductById(id: number): Product | undefined {
    return this.getAllProducts().find((product) => product.id === id);
  }

  // Método genérico para fetch productos con filtros
  async fetchProducts(filters: ProductFilters = {}): Promise<void> {
    try {
      // Construir query params
      const params = new URLSearchParams();
      
      // Siempre agregar page (por defecto 1)
      params.append('page', (filters.page || 1).toString());
      
      if (filters.per_page) {
        params.append('per_page', filters.per_page.toString());
      }
      
      if (filters.id_categoria) {
        params.append('id_categoria', filters.id_categoria.toString());
      }
      
      if (filters.nombre) {
        params.append('nombre', filters.nombre);
      }
      
      if (filters.precio_min !== undefined) {
        params.append('precio_min', filters.precio_min.toString());
      }
      
      if (filters.precio_max !== undefined) {
        params.append('precio_max', filters.precio_max.toString());
      }

      const url = `${this.apiUrl}/productos?${params.toString()}`;
      console.log('Fetching products with URL:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      // Transformar los datos de la API al formato que espera el frontend
      if (data.productos && Array.isArray(data.productos)) {
        const transformedProducts: Product[] = data.productos.map(
          (apiProduct: any, index: number) => {
            return {
              id: apiProduct.producto_id || apiProduct.id || index + 1,
              name: apiProduct.nombre || 'Producto sin nombre',
              description: apiProduct.descripcion || 'Producto delicioso',
              price: apiProduct.precio || 0,
              id_categoria: apiProduct.id_categoria,
              category: apiProduct.category || 'Sin categoría',
              emoji: '🍽️',
              unit: 'porción',
            };
          }
        );
        
        // Actualizar productos
        this.apiProductsSubject.next(transformedProducts);
        
        // Actualizar paginación si viene en la respuesta
        if (data.total !== undefined) {
          const paginationData: PaginationData = {
            total: data.total || transformedProducts.length,
            page: data.page || filters.page || 1,
            per_page: data.per_page || filters.per_page || 10,
            total_pages: data.total_pages || Math.ceil((data.total || transformedProducts.length) / (data.per_page || filters.per_page || 10))
          };
          this.paginationSubject.next(paginationData);
          console.log('Paginación actualizada:', paginationData);
        }
        
        console.log('Productos cargados:', transformedProducts.length);
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      this.apiProductsSubject.next([]);
    }
  }

  // Fetch productos desde el backend (mantener compatibilidad)
  async fetchProductsFromAPI(): Promise<void> {
    await this.fetchProducts({ page: 1 });
  }

  // Fetch productos filtrados por categoría (mantener compatibilidad)
  async fetchProductsByCategory(categoriaId: number, page: number = 1): Promise<void> {
    await this.fetchProducts({ id_categoria: categoriaId, page });
  }

  // Método para obtener los productos actuales
  getCurrentApiProducts(): Product[] {
    return this.apiProductsSubject.getValue();
  }

  // Método para obtener la paginación actual
  getCurrentPagination(): PaginationData {
    return this.paginationSubject.getValue();
  }

  // Fetch un producto específico por ID desde el backend
  async fetchProductById(id: number): Promise<Product | null> {
    try {
      const response = await fetch(`${this.apiUrl}/producto/${id}`);
      const data = await response.json();
      // La API devuelve directamente el objeto del producto (no envuelto en "productos")
      if (data && data.producto_id) {
        const transformedProduct: Product = {
          id: data.producto_id,
          name: data.nombre || 'Producto sin nombre',
          description: data.descripcion || 'Producto delicioso',
          price: data.precio || 0,
          category: data.categoria,
          id_categoria: data.id_categoria,
          emoji: '🍽️',
          unit: 'porción',
        };
        return transformedProduct;
      }

      return null;
    } catch (error) {
      console.error('Error al obtener producto individual:', error);
      return null;
    }
  }
}
