import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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
}
