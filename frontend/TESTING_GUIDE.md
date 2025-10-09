# 🧪 Guía de Testing - Rotisería Frontend

## 📋 Resumen de Implementación

He implementado completamente el **UserService** en el HeaderComponent. Ahora la aplicación usa usuarios dinámicos en lugar de datos hardcodeados.

## 🚀 Cómo Probar la Aplicación

### 1. Iniciar el Servidor de Desarrollo

```bash
cd frontend
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

### 2. Panel de Desarrollo

En la esquina inferior derecha verás un **Panel de Desarrollo** que te permite:

- **Ver el usuario actual** (nombre, rol, email)
- **Cambiar entre diferentes tipos de usuarios:**
  - 👨‍💼 **María García** (Admin)
  - 👷‍♂️ **Carlos Rodríguez** (Empleado) 
  - 👤 **Juan Carlos** (Cliente)
  - 🚪 **Desloguearse** (sin usuario)

### 3. Usuarios de Prueba Disponibles

| Usuario | Rol | Email | Funcionalidades |
|---------|-----|-------|----------------|
| **María García López** | Admin | maria.garcia@admin.com | Acceso completo al panel de admin |
| **Carlos Rodríguez** | Empleado | carlos.rodriguez@empleado.com | Acceso al panel de admin |
| **Juan Carlos Pérez** | Cliente | juan.perez@email.com | Solo funciones de cliente |
| **Ana Sofía Martínez** | Cliente | ana.martinez@cliente.com | Solo funciones de cliente |

## 🎯 Qué Probar

### 1. **Header Dinámico**
- Cambia entre usuarios y observa cómo el header actualiza:
  - **Nombre e iniciales** del usuario
  - **Link al Panel de Admin** (solo para Admin/Empleado)
  - **Menú de usuario** vs **botón de login**

### 2. **Roles y Permisos**
- **Admin/Empleado**: Verás "Panel de Administración" en el dropdown
- **Cliente**: No verás el link al panel de admin
- **Sin usuario**: Solo verás "Iniciar Sesión"

### 3. **Funcionalidad de Logout**
- Al hacer logout, el header cambia automáticamente
- El usuario actual se elimina

### 4. **Navegación**
- Todos los links funcionan correctamente
- El carrito mantiene su estado
- Las rutas se navegan sin problemas

## 🔧 Funcionalidades Implementadas

### ✅ **UserService**
- Gestión de estado con Angular Signals
- Usuarios predefinidos para testing
- Métodos para login/logout/cambio de usuario
- Generación automática de iniciales

### ✅ **HeaderComponent**
- Integración completa con UserService
- UI reactiva basada en el usuario actual
- Roles y permisos dinámicos
- Logout funcional

### ✅ **Panel de Desarrollo**
- Herramienta visual para cambiar usuarios
- Información del usuario actual
- Botones para diferentes roles

## 🎨 Rutas para Probar

| Ruta | Descripción |
|------|-------------|
| `/` | Home - Header completo con usuario |
| `/comidas` | Menú de comidas |
| `/cart` | Carrito de compras |
| `/admin` | Panel administrativo (solo Admin/Empleado) |
| `/user` | Perfil de usuario |
| `/orders` | Pedidos del usuario |

## 📱 Testing Responsivo

- Prueba en **desktop** y **móvil**
- El menú hamburguesa funciona correctamente
- Todos los usuarios se ven bien en ambos tamaños

## 🚨 Notas Importantes

1. **No hay backend**: Todos los datos son simulados
2. **El panel de desarrollo** está siempre visible para facilitar las pruebas
3. **Los usuarios se resetean** al recargar la página
4. **Las rutas admin** requieren usuario con rol Admin/Empleado

## 🎯 Casos de Uso para Probar

### Caso 1: Usuario Admin
1. Usa el panel para cambiar a "María García (Admin)"
2. Verifica que aparece "Panel de Administración" en el dropdown
3. Navega a `/admin` - debería funcionar
4. Prueba todas las funcionalidades del header

### Caso 2: Usuario Cliente  
1. Cambia a "Juan Carlos (Cliente)"
2. Verifica que NO aparece "Panel de Administración"
3. Todas las demás funciones deberían funcionar

### Caso 3: Sin Usuario
1. Haz logout con el panel
2. El header debería mostrar "Iniciar Sesión"
3. No debería haber dropdown de usuario

¡Listo para probar! 🎉