# Rotisería El Buen Sabor - Angular Application

## Descripción

Esta es una aplicación Angular para una rotisería que permite a los usuarios navegar por el menú, agregar productos al carrito y realizar pedidos. La aplicación ha sido transformada desde HTML estático con Tailwind CSS a una aplicación Angular moderna con Bootstrap 5.

## Características

### Componentes Creados

1. **HeaderComponent**: Navegación principal con menú de usuario y carrito
2. **HeroComponent**: Sección de bienvenida con llamadas a la acción
3. **MenuComponent**: Carrusel de productos destacados
4. **RecommendedProductsComponent**: Productos recomendados con scroll horizontal
5. **InfoComponent**: Información de horarios y contacto
6. **TestimonialsComponent**: Testimonios de clientes
7. **FooterComponent**: Pie de página con información de contacto
8. **HomeLayoutComponent**: Layout principal que orquesta todos los componentes

### Servicios

1. **ProductService**: Gestión del catálogo de productos
2. **CartService**: Gestión del estado del carrito de compras

### Modelos/Interfaces

- **Product**: Interfaz para productos
- **CartItem**: Interfaz para elementos del carrito
- **Testimonial**: Interfaz para testimonios
- **Schedule**: Interfaz para horarios
- **ContactInfo**: Interfaz para información de contacto

## Estructura del Proyecto

```
frontend/src/app/
├── components/
│   ├── header/
│   ├── hero/
│   ├── menu/
│   ├── recommended-products/
│   ├── info/
│   ├── testimonials/
│   ├── footer/
│   └── layout/
├── services/
│   ├── product.service.ts
│   └── cart.service.ts
├── models/
│   └── product.interface.ts
├── app.ts
├── app.html
└── app.scss
```

## Tecnologías Utilizadas

- **Angular 18+** con componentes standalone
- **Bootstrap 5.3.0** para estilos y componentes
- **Bootstrap Icons** para iconografía
- **TypeScript** para tipado fuerte
- **SCSS** para estilos avanzados
- **RxJS** para programación reactiva

## Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI

### Pasos para ejecutar

1. **Instalar dependencias**:
   ```bash
   cd frontend
   npm install
   ```

2. **Ejecutar en desarrollo**:
   ```bash
   ng serve
   ```

3. **Acceder a la aplicación**:
   Abrir el navegador en `http://localhost:4200`

### Scripts disponibles

- `ng serve` - Ejecutar en modo desarrollo
- `ng build` - Construir para producción
- `ng test` - Ejecutar pruebas unitarias
- `ng lint` - Verificar calidad del código

## Características Técnicas

### Responsive Design
- Mobile-first approach
- Breakpoints de Bootstrap 5
- Componentes adaptativos

### Estado de la Aplicación
- Gestión de estado del carrito con RxJS BehaviorSubject
- Comunicación entre componentes mediante servicios

### Optimizaciones
- Componentes standalone para mejor tree-shaking
- Lazy loading preparado para futuras rutas
- Optimización de imágenes y assets

### Accesibilidad
- Estructura semántica HTML5
- Atributos ARIA apropiados
- Navegación por teclado
- Contraste de colores adecuado

## Funcionalidades Implementadas

### Catálogo de Productos
- Visualización de productos destacados
- Productos recomendados
- Información detallada de cada producto

### Carrito de Compras
- Agregar productos al carrito
- Contador de productos en el header
- Gestión de cantidades

### Interfaz de Usuario
- Navegación intuitiva
- Diseño responsivo
- Animaciones y transiciones suaves
- Feedback visual para interacciones

### Información del Negocio
- Horarios de atención
- Información de contacto
- Testimonios de clientes
- Redes sociales

## Próximas Funcionalidades

1. **Sistema de Autenticación**
   - Login/Registro de usuarios
   - Perfiles de usuario

2. **Gestión de Pedidos**
   - Proceso de checkout completo
   - Historial de pedidos

3. **Administración**
   - Panel de administración
   - Gestión de productos
   - Gestión de pedidos

4. **Funcionalidades Avanzadas**
   - Búsqueda de productos
   - Filtros y categorías
   - Sistema de valoraciones
   - Notificaciones push

## Notas de Desarrollo

### Estilo de Código
- TypeScript strict mode
- Convenciones de nomenclatura Angular
- Comentarios en español para el contexto del negocio

### Patrones Utilizados
- Arquitectura de componentes standalone
- Inyección de dependencias
- Observables para estado reactivo
- Separation of concerns

### Bootstrap Integration
- CDN para desarrollo rápido
- Variables CSS personalizadas
- Clases utilitarias extendidas
- Componentes de Bootstrap adaptados

## Contacto

Para consultas sobre el desarrollo de esta aplicación, contactar al equipo de desarrollo.

---

**Última actualización**: Diciembre 2024
