# Componente de Paginación

Componente reutilizable de paginación para Angular con soporte completo de navegación y diseño responsive.

## Características

- ✅ **Totalmente reutilizable**: Puede usarse en cualquier página que necesite paginación
- ✅ **Responsive**: Se adapta a diferentes tamaños de pantalla
- ✅ **Navegación completa**: Primera, anterior, siguiente, última página
- ✅ **Números de página inteligentes**: Muestra un rango de páginas alrededor de la actual
- ✅ **Información detallada**: Muestra rango de items y total
- ✅ **Diseño moderno**: Estilos consistentes con la aplicación

## Uso

### 1. Importar el componente

```typescript
import { PaginationComponent, PaginationInfo } from '../../components/pagination/pagination.component';

@Component({
  // ...
  imports: [CommonModule, PaginationComponent]
})
```

### 2. Crear signal para la información de paginación

```typescript
paginationInfo = signal<PaginationInfo>({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10
});
```

### 3. Agregar al template

```html
<app-pagination 
  [paginationInfo]="paginationInfo()" 
  (pageChange)="onPageChange($event)">
</app-pagination>
```

### 4. Manejar el evento de cambio de página

```typescript
async onPageChange(page: number): Promise<void> {
  console.log(`Cambiando a página ${page}`);
  // Hacer fetch con la nueva página
  await this.myService.fetchData({ page });
  // Opcional: scroll al inicio
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
```

### 5. Actualizar la información de paginación

Cuando recibas datos del backend:

```typescript
this.productService.pagination$.subscribe(pagination => {
  this.paginationInfo.set({
    currentPage: pagination.page,
    totalPages: pagination.total_pages,
    totalItems: pagination.total,
    itemsPerPage: pagination.per_page
  });
});
```

## Interfaz PaginationInfo

```typescript
interface PaginationInfo {
  currentPage: number;    // Página actual (1-indexed)
  totalPages: number;     // Total de páginas
  totalItems: number;     // Total de items
  itemsPerPage: number;   // Items por página
}
```

## Eventos

### pageChange

Emitido cuando el usuario cambia de página. El evento contiene el número de la nueva página.

```typescript
@Output() pageChange = new EventEmitter<number>();
```

## Métodos públicos

El componente expone varios métodos que se llaman automáticamente desde el template:

- `goToPage(page: number)`: Ir a una página específica
- `goToPreviousPage()`: Ir a la página anterior
- `goToNextPage()`: Ir a la página siguiente
- `goToFirstPage()`: Ir a la primera página
- `goToLastPage()`: Ir a la última página
- `getPageNumbers()`: Obtener array de números de página a mostrar
- `getStartItem()`: Obtener índice del primer item mostrado
- `getEndItem()`: Obtener índice del último item mostrado

## Estilos

El componente incluye estilos predefinidos con las siguientes características:

- Botones con hover effects
- Página activa resaltada en rojo
- Botones deshabilitados cuando no se puede navegar
- Layout responsive (columna en móvil, fila en desktop)
- Iconos SVG para navegación

## Ejemplo completo

```typescript
import { Component, signal } from '@angular/core';
import { PaginationComponent, PaginationInfo } from './components/pagination/pagination.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [PaginationComponent],
  template: `
    <div class="products-grid">
      <!-- Tu contenido aquí -->
    </div>
    
    <app-pagination 
      [paginationInfo]="paginationInfo()" 
      (pageChange)="onPageChange($event)">
    </app-pagination>
  `
})
export class ProductsComponent {
  paginationInfo = signal<PaginationInfo>({
    currentPage: 1,
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10
  });

  async onPageChange(page: number) {
    // Actualizar datos
    await this.fetchProducts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
```
