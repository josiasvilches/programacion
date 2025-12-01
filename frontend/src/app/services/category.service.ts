import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = environment.apiUrl;
  
  // BehaviorSubject para manejar las categorías de la API
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  constructor() {}

  /**
   * Obtiene todas las categorías desde el backend
   */
  async fetchCategoriesFromAPI(): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/categorias`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // La API devuelve directamente un array de categorías
        this.categoriesSubject.next(data);
        console.log('Categorías cargadas desde API:', data);
      } else {
        console.warn('Formato de respuesta inesperado:', data);
        this.categoriesSubject.next([]);
      }
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      this.categoriesSubject.next([]);
    }
  }

  /**
   * Obtiene las categorías actuales del BehaviorSubject
   */
  getCurrentCategories(): Category[] {
    return this.categoriesSubject.getValue();
  }

  /**
   * Obtiene una categoría específica por ID desde el backend
   */
  async fetchCategoryById(id: number): Promise<Category | null> {
    try {
      const response = await fetch(`${this.apiUrl}/categoria/${id}`);
      const data = await response.json();
      
      if (data && data.categoria_id) {
        return data;
      }
      
      return null;
    } catch (error) {
      console.error('Error al obtener categoría individual:', error);
      return null;
    }
  }

  /**
   * Crea una nueva categoría en el backend
   */
  async createCategory(nombreCategoria: string): Promise<Category | null> {
    try {
      const response = await fetch(`${this.apiUrl}/categorias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_categoria: nombreCategoria,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Actualizar la lista de categorías
      await this.fetchCategoriesFromAPI();
      
      return data;
    } catch (error) {
      console.error('Error al crear categoría:', error);
      return null;
    }
  }

  /**
   * Actualiza una categoría existente
   */
  async updateCategory(id: number, nombreCategoria: string): Promise<Category | null> {
    try {
      const response = await fetch(`${this.apiUrl}/categoria/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_categoria: nombreCategoria,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Actualizar la lista de categorías
      await this.fetchCategoriesFromAPI();
      
      return data;
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      return null;
    }
  }

  /**
   * Elimina una categoría
   */
  async deleteCategory(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/categoria/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      // Actualizar la lista de categorías
      await this.fetchCategoriesFromAPI();
      
      return true;
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      return false;
    }
  }
}
