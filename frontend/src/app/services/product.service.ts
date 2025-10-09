import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // BehaviorSubject para manejar los productos de la API
  private apiProductsSubject = new BehaviorSubject<Product[]>([]);
  public apiProducts$ = this.apiProductsSubject.asObservable();

  private featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Pollo al Spiedo',
      description: 'Dorado a la perfección con nuestro adobo secreto',
      price: 3500,
      category: 'Principales',
      emoji: '🍗',
      unit: 'pollo entero',
      featured: true
    },
    {
      id: 2,
      name: 'Milanesas',
      description: 'Crocantes por fuera, tiernas por dentro',
      price: 2800,
      category: 'Principales',
      emoji: '🥩',
      unit: 'con guarnición',
      featured: true
    },
    {
      id: 3,
      name: 'Empanadas',
      description: 'Masa casera horneada diariamente',
      price: 450,
      category: 'Empanadas',
      emoji: '🥟',
      unit: 'cada una',
      featured: true
    }
  ];

  private recommendedProducts: Product[] = [
    {
      id: 4,
      name: 'Asado de Tira',
      description: 'Jugoso y tierno, cocinado a la parrilla',
      price: 4200,
      category: 'Parrilla',
      emoji: '🥩',
      unit: 'por kg'
    },
    {
      id: 5,
      name: 'Empanadas Dulces',
      description: 'Membrillo, batata y dulce de leche',
      price: 380,
      category: 'Postres',
      emoji: '🥧',
      unit: 'cada una'
    },
    {
      id: 6,
      name: 'Matambre a la Pizza',
      description: 'Con salsa, jamón, queso y aceitunas',
      price: 3200,
      category: 'Principales',
      emoji: '🍕',
      unit: 'porción'
    },
    {
      id: 7,
      name: 'Tartas Caseras',
      description: 'Jamón y queso, verdura, atún',
      price: 2400,
      category: 'Principales',
      emoji: '🥧',
      unit: 'porción'
    },
    {
      id: 8,
      name: 'Pollo Grillé',
      description: 'A la plancha con hierbas aromáticas',
      price: 2900,
      category: 'Principales',
      emoji: '🐔',
      unit: 'con guarnición'
    },
    {
      id: 9,
      name: 'Papas Fritas Caseras',
      description: 'Cortadas y fritas al momento',
      price: 1200,
      category: 'Guarniciones',
      emoji: '🍟',
      unit: 'porción grande'
    }
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
    return this.getAllProducts().find(product => product.id === id);
  }

  // Fetch productos desde el backend
  async fetchProductsFromAPI(): Promise<void> {
    try {
      const response = await fetch('http://localhost:5001/productos');
      const data = await response.json();
      console.log('Respuesta del API:', data);
      
      // Transformar los datos de la API al formato que espera el frontend
      if (data.productos && Array.isArray(data.productos)) {
        const transformedProducts: Product[] = data.productos.map((apiProduct: any) => ({
          id: apiProduct.producto_id,
          name: apiProduct.nombre,
          description: apiProduct.descripcion || 'Producto delicioso',
          price: apiProduct.precio,
          category: 'Comidas',
          emoji: '🍽️',
          unit: 'porción'
        }));
        
        // Actualizar el BehaviorSubject con los nuevos productos
        this.apiProductsSubject.next(transformedProducts);
        console.log('Productos transformados:', transformedProducts);
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      // En caso de error, mantener un array vacío
      this.apiProductsSubject.next([]);
    }
  }

  // Método para obtener los productos actuales
  getCurrentApiProducts(): Product[] {
    return this.apiProductsSubject.getValue();
  }
}
