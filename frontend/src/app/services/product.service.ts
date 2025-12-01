import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  getFeaturedProducts(): Product[] {
    return this.featuredProducts;
  }

  getRecommendedProducts(): Product[] {
    return this.recommendedProducts;
  }

  getAllProducts(): Product[] {
    return [...this.featuredProducts, ...this.recommendedProducts];
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/producto/${id}`);
  }

  // Método genérico para fetch productos con filtros
  async fetchProducts(filters: ProductFilters = {}): Promise<void> {
    try {
      // Construir URL con parámetros de filtro
      let url = `${this.apiUrl}/productos?`;
      
      // Siempre agregar page (por defecto 1)
      url += `page=${filters.page || 1}`;
      
      if (filters.per_page) {
        url += `&per_page=${filters.per_page}`;
      }
      
      if (filters.id_categoria) {
        url += `&id_categoria=${filters.id_categoria}`;
      }
      
      if (filters.nombre) {
        url += `&nombre=${filters.nombre}`;
      }
      
      if (filters.precio_min !== undefined) {
        url += `&precio_min=${filters.precio_min}`;
      }
      
      if (filters.precio_max !== undefined) {
        url += `&precio_max=${filters.precio_max}`;
      }

      console.log('=== FETCH PRODUCTOS ===');
      console.log('URL:', url);
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Respuesta RAW del backend:', data);
      
      if (data.productos && Array.isArray(data.productos)) {
        const transformedProducts: Product[] = data.productos.map(
          (apiProduct: any) => {
            const transformed: Product = {
              id: apiProduct.producto_id,  // MAPEAR producto_id a id
              name: apiProduct.nombre || 'Producto sin nombre',
              description: apiProduct.descripcion || 'Producto delicioso',
              price: apiProduct.precio || 0,
              id_categoria: apiProduct.id_categoria,
              category: apiProduct.categoria || 'Sin categoría',
              emoji: '🍽️',
              unit: 'porción',
              imagen_url: apiProduct.imagen_url || '',
              disponible: apiProduct.disponible !== false
            };
            console.log(`producto_id ${apiProduct.producto_id} → id ${transformed.id}`);
            return transformed;
          }
        );
        
        console.log(`Total productos: ${transformedProducts.length}`);
        this.apiProductsSubject.next(transformedProducts);
        
        this.paginationSubject.next({
          page: data.page,
          per_page: data.per_page,
          total: data.total,
          total_pages: data.total_pages
        });
      }
    } catch (error) {
      console.error('Error:', error);
      this.apiProductsSubject.next([]);
    }
  }

  // Fetch productos desde el backend 
  async fetchProductsFromAPI(): Promise<void> {
    await this.fetchProducts({ page: 1 });
  }

  // Fetch productos filtrados por categoría 
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
      console.log('=== FETCH PRODUCTO POR ID ===');
      console.log('ID solicitado:', id);
      const url = `${this.apiUrl}/producto/${id}`;
      console.log('URL:', url);
      
      const response = await fetch(url);
      console.log('Status:', response.status);
      
      if (!response.ok) {
        console.error('Status:', response.status);
        return null;
      }
      
      const data = await response.json();
      console.log('Respuesta RAW:', data);
      
      if (data && data.producto_id) {
        const transformedProduct: Product = {
          id: data.producto_id,  // MAPEAR producto_id a id
          name: data.nombre || 'Producto sin nombre',
          description: data.descripcion || 'Producto delicioso',
          price: data.precio || 0,
          category: data.categoria || 'Sin categoría',
          id_categoria: data.id_categoria,
          emoji: '🍽️',
          unit: 'porción',
          imagen_url: data.imagen_url || '',
          disponible: data.disponible !== false
        };
        
        console.log('Producto transformado:', transformedProduct);
        console.log(`producto_id ${data.producto_id} → id ${transformedProduct.id}`);
        return transformedProduct;
      }

      console.error('No contiene producto_id');
      return null;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  // Crear un nuevo producto en el backend
  async createProduct(
    productData: {
      nombre: string;
      descripcion: string;
      precio: number;
      id_categoria: number;
      stock: number;
      disponible?: boolean;
      imagen?: string;
    },
    token?: string
  ): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      const url = `${this.apiUrl}/productos`;
      console.log('Creando producto:', productData);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Agregar token de autorización si está disponible
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.mensaje || 'Error al crear el producto',
        };
      }

      const data = await response.json();
      console.log('Producto creado:', data);

      return {
        success: true,
        data: data,
        message: 'Producto creado exitosamente',
      };
    } catch (error) {
      console.error('Error al crear producto:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    }
  }

  // Actualizar un producto existente en el backend
  async updateProduct(
    productId: number,
    productData: {
      nombre?: string;
      descripcion?: string;
      precio?: number;
      id_categoria?: number;
      stock?: number;
      disponible?: boolean;
      imagen?: string;
    },
    token?: string
  ): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      const url = `${this.apiUrl}/producto/${productId}`;
      console.log('Actualizando producto:', { productId, productData });

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Agregar token de autorización si está disponible
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.mensaje || 'Error al actualizar el producto',
        };
      }

      const data = await response.json();
      console.log('Producto actualizado:', data);

      return {
        success: true,
        data: data,
        message: 'Producto actualizado exitosamente',
      };
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    }
  }

  // Eliminar un producto del backend
  async deleteProduct(productId: number, token?: string): Promise<{ success: boolean; message: string }> {
    try {
      const url = `${this.apiUrl}/producto/${productId}`;
      console.log('Eliminando producto:', productId);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Agregar token de autorización si está disponible
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.mensaje || 'Error al eliminar el producto',
        };
      }

      const data = await response.json();
      console.log('Producto eliminado:', data);

      return {
        success: true,
        message: data.mensaje || 'Producto eliminado exitosamente',
      };
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    }
  }
}

