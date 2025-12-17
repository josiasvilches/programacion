# Guía de Angular para Desarrolladores de React/Next.js

## Índice
1. [Filosofía y Arquitectura](#filosofía-y-arquitectura)
2. [Componentes](#componentes)
3. [Templates](#templates)
4. [Data Binding](#data-binding)
5. [Directivas](#directivas)
6. [Servicios e Inyección de Dependencias](#servicios-e-inyección-de-dependencias)
7. [Routing](#routing)
8. [Estado y Manejo de Datos](#estado-y-manejo-de-datos)
9. [Lifecycle Hooks](#lifecycle-hooks)
10. [Comparación con React/Next.js](#comparación-con-reactnextjs)

---

## Filosofía y Arquitectura

### React/Next.js (Lo que conoces)
- **Librería flexible**: React es una librería, Next.js añade opiniones sobre routing y SSR
- **JSX**: JavaScript y HTML mezclados
- **Funcional**: Hooks y componentes funcionales
- **Ecosistema abierto**: Eliges tus propias herramientas

### Angular (Lo nuevo)
- **Framework completo**: Todo incluido (routing, HTTP, forms, testing)
- **TypeScript obligatorio**: Fuertemente tipado desde el inicio
- **Basado en clases y decoradores**: Aunque ahora hay Standalone Components
- **Opinionado**: Una forma "correcta" de hacer las cosas
- **Arquitectura MVC/MVVM**: Separación clara entre lógica y vista

---

## Componentes

### Estructura de un Componente Angular

```typescript
// user-profile.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',           // Equivalente al nombre del componente
  standalone: true,                       // Nuevo: componente independiente (Angular 14+)
  imports: [CommonModule],                // Importar otros componentes/módulos
  templateUrl: './user-profile.component.html',  // Template externo
  // O usar template inline:
  // template: `<div>{{ name }}</div>`,
  styleUrls: ['./user-profile.component.css']    // Estilos del componente
})
export class UserProfileComponent {
  // Properties (equivalente a state en React)
  @Input() name: string = '';             // Props que recibe
  @Output() onUpdate = new EventEmitter<string>();  // Eventos que emite

  age: number = 25;                       // Estado interno

  // Métodos (equivalente a funciones en el componente)
  handleClick() {
    this.onUpdate.emit('Updated!');       // Emitir evento
  }

  // Lifecycle hooks
  ngOnInit() {
    // Similar a useEffect(() => {}, []) o componentDidMount
    console.log('Component initialized');
  }
}
```

### Comparación: React vs Angular

**React:**
```jsx
function UserProfile({ name, onUpdate }) {
  const [age, setAge] = useState(25);

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  return (
    <div onClick={() => onUpdate('Updated!')}>
      {name} - {age}
    </div>
  );
}
```

**Angular:**
```typescript
@Component({
  selector: 'app-user-profile',
  template: `
    <div (click)="handleClick()">
      {{ name }} - {{ age }}
    </div>
  `
})
export class UserProfileComponent {
  @Input() name!: string;
  @Output() onUpdate = new EventEmitter<string>();
  age = 25;

  ngOnInit() {
    console.log('Component mounted');
  }

  handleClick() {
    this.onUpdate.emit('Updated!');
  }
}
```

---

## Templates

### Sintaxis de Templates en Angular

Angular usa **templates HTML** con sintaxis especial, no JSX.

#### 1. Interpolación (Mostrar datos)
```html
<!-- React: {variable} -->
<!-- Angular: {{ variable }} -->
<h1>{{ title }}</h1>
<p>{{ user.name }}</p>
<span>{{ 2 + 2 }}</span>
<div>{{ getMessage() }}</div>
```

#### 2. Property Binding (Atributos dinámicos)
```html
<!-- React: <img src={imageUrl} /> -->
<!-- Angular: Usa [propiedad]="valor" -->
<img [src]="imageUrl" />
<button [disabled]="isDisabled">Click</button>
<div [className]="dynamicClass"></div>

<!-- Shorthand para clases y estilos -->
<div [class.active]="isActive"></div>
<div [style.color]="textColor"></div>
```

#### 3. Event Binding (Eventos)
```html
<!-- React: onClick={handler} -->
<!-- Angular: (evento)="handler()" -->
<button (click)="handleClick()">Click me</button>
<input (input)="onInputChange($event)" />
<form (submit)="onSubmit($event)">

<!-- $event es el objeto del evento -->
<input (keyup)="onKeyUp($event.target.value)" />
```

#### 4. Two-Way Binding (Binding bidireccional)
```html
<!-- React: value={name} onChange={e => setName(e.target.value)} -->
<!-- Angular: [(ngModel)]="variable" -->
<input [(ngModel)]="username" />

<!-- Esto es equivalente a: -->
<input [ngModel]="username" (ngModelChange)="username = $event" />
```

#### 5. Template Reference Variables
```html
<!-- Obtener referencia al elemento DOM -->
<input #nameInput type="text" />
<button (click)="log(nameInput.value)">Log Value</button>

<!-- Similar a useRef en React -->
```

---

## Directivas

Las directivas son instrucciones en el DOM. Angular tiene directivas estructurales y de atributo.

### Directivas Estructurales (modifican el DOM)

#### *ngIf (Renderizado condicional)
```html
<!-- React: {condition && <div>Content</div>} -->
<!-- Angular: -->
<div *ngIf="isLoggedIn">Welcome!</div>

<!-- Con else -->
<div *ngIf="isLoggedIn; else loginTemplate">
  Welcome back!
</div>
<ng-template #loginTemplate>
  <div>Please log in</div>
</ng-template>

<!-- Con then/else -->
<div *ngIf="user; then userTemplate else guestTemplate"></div>
```

#### *ngFor (Listas)
```html
<!-- React: {items.map(item => <div key={item.id}>{item.name}</div>)} -->
<!-- Angular: -->
<div *ngFor="let item of items">
  {{ item.name }}
</div>

<!-- Con index y trackBy (equivalente a key) -->
<div *ngFor="let item of items; let i = index; trackBy: trackById">
  {{ i }}: {{ item.name }}
</div>

<!-- Variables disponibles: index, first, last, even, odd -->
<li *ngFor="let item of items; let isFirst = first"
    [class.highlight]="isFirst">
  {{ item }}
</li>
```

#### *ngSwitch (Switch statement)
```html
<!-- React: switch statement o múltiples condiciones -->
<!-- Angular: -->
<div [ngSwitch]="userRole">
  <p *ngSwitchCase="'admin'">Admin Panel</p>
  <p *ngSwitchCase="'user'">User Dashboard</p>
  <p *ngSwitchDefault>Guest View</p>
</div>
```

### Directivas de Atributo (modifican apariencia/comportamiento)

#### ngClass (Clases dinámicas)
```html
<!-- React: className={`base ${isActive ? 'active' : ''}`} -->
<!-- Angular: -->
<div [ngClass]="{ active: isActive, disabled: isDisabled }"></div>
<div [ngClass]="['class1', 'class2', dynamicClass]"></div>
<div [ngClass]="getClasses()"></div>
```

#### ngStyle (Estilos dinámicos)
```html
<!-- React: style={{ color: textColor, fontSize: '14px' }} -->
<!-- Angular: -->
<div [ngStyle]="{
  'color': textColor,
  'font-size': fontSize + 'px',
  'background-color': bgColor
}"></div>
```

---

## Data Binding

Angular tiene 4 tipos de data binding:

### 1. Interpolación: `{{ }}`
```html
<h1>{{ title }}</h1>
```
**Dirección:** Component → View (one-way)

### 2. Property Binding: `[property]`
```html
<img [src]="imageUrl">
```
**Dirección:** Component → View (one-way)

### 3. Event Binding: `(event)`
```html
<button (click)="save()">Save</button>
```
**Dirección:** View → Component (one-way)

### 4. Two-Way Binding: `[(ngModel)]`
```html
<input [(ngModel)]="name">
```
**Dirección:** Component ↔ View (two-way)

---

## Servicios e Inyección de Dependencias

Los servicios son clases que contienen lógica de negocio, llamadas a APIs, estado compartido, etc.

### Crear un Servicio

```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Disponible en toda la app (singleton)
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  // Inyectar dependencias en el constructor
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
```

### Usar el Servicio en un Componente

```typescript
@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users">
      {{ user.name }}
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  // Inyectar el servicio
  constructor(private userService: UserService) {}

  ngOnInit() {
    // Suscribirse al Observable
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error(err)
    });
  }
}
```

### Comparación con React/Next.js

**React:**
```jsx
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return users.map(user => <div key={user.id}>{user.name}</div>);
}
```

**Angular:**
- Los servicios reemplazan a los custom hooks para lógica compartida
- Dependency Injection es automática (no necesitas Context API)
- Usa Observables (RxJS) en lugar de Promises

---

## Routing

### Configuración de Rutas

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users/:id',
    component: UserDetailComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]  // Proteger ruta (como middleware)
  },
  {
    path: 'lazy',
    loadComponent: () => import('./lazy/lazy.component')
      .then(m => m.LazyComponent)  // Lazy loading
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
```

### Navegación

```typescript
// En el componente
import { Router, ActivatedRoute } from '@angular/router';

@Component({...})
export class MyComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  navigateToUser(id: number) {
    // Navegación programática
    this.router.navigate(['/users', id]);

    // O con ruta relativa
    this.router.navigate(['../detail'], { relativeTo: this.route });

    // Con query params
    this.router.navigate(['/search'], {
      queryParams: { q: 'angular' }
    });
  }

  ngOnInit() {
    // Obtener parámetros de la ruta
    const id = this.route.snapshot.paramMap.get('id');

    // O suscribirse a cambios
    this.route.params.subscribe(params => {
      console.log(params['id']);
    });

    // Query params
    this.route.queryParams.subscribe(params => {
      console.log(params['q']);
    });
  }
}
```

### En el Template

```html
<!-- Navegación declarativa -->
<a routerLink="/home">Home</a>
<a [routerLink]="['/users', userId]">User Profile</a>
<a routerLink="/about" routerLinkActive="active">About</a>

<!-- Outlet donde se renderizan los componentes -->
<router-outlet></router-outlet>
```

### Comparación con Next.js

| Next.js | Angular |
|---------|---------|
| `app/page.tsx` | `{ path: '', component: PageComponent }` |
| `app/users/[id]/page.tsx` | `{ path: 'users/:id', component: UserComponent }` |
| `useRouter()` | `Router` service |
| `useParams()` | `ActivatedRoute.params` |
| `useSearchParams()` | `ActivatedRoute.queryParams` |
| `<Link href="/about">` | `<a routerLink="/about">` |
| `router.push('/page')` | `router.navigate(['/page'])` |

---

## Estado y Manejo de Datos

### 1. Estado Local (en el componente)

```typescript
@Component({...})
export class CounterComponent {
  // Estado simple
  count = 0;

  increment() {
    this.count++;  // No necesitas setState o setCount
  }
}
```

### 2. Estado Compartido (con Servicios)

```typescript
// state.service.ts
@Injectable({ providedIn: 'root' })
export class StateService {
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  increment() {
    this.countSubject.next(this.countSubject.value + 1);
  }
}

// Usar en componente
@Component({...})
export class MyComponent {
  count$ = this.stateService.count$;  // Observable

  constructor(private stateService: StateService) {}

  increment() {
    this.stateService.increment();
  }
}

// En el template
<div>{{ count$ | async }}</div>
```

### 3. Signals (Angular 16+) - Similar a React State

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({...})
export class CounterComponent {
  // Crear signal (similar a useState)
  count = signal(0);

  // Computed signal (similar a useMemo)
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.set(this.count() + 1);
    // O: this.count.update(value => value + 1);
  }
}

// En el template
<div>Count: {{ count() }}</div>
<div>Double: {{ doubleCount() }}</div>
```

### 4. NgRx (Redux para Angular)

Similar a Redux en React, pero no es obligatorio.

---

## Lifecycle Hooks

Los lifecycle hooks son métodos que se ejecutan en momentos específicos del ciclo de vida del componente.

```typescript
import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Component({...})
export class MyComponent implements OnInit, OnChanges, OnDestroy {

  // 1. Se ejecuta cuando cambian los @Input()
  ngOnChanges(changes: SimpleChanges) {
    console.log('Input changed', changes);
  }

  // 2. Se ejecuta una vez después del primer ngOnChanges
  // Similar a componentDidMount o useEffect(() => {}, [])
  ngOnInit() {
    console.log('Component initialized');
    // Inicialización, llamadas a APIs, suscripciones
  }

  // 3. Se ejecuta en cada ciclo de detección de cambios
  // Cuidado: puede ejecutarse muchas veces
  ngDoCheck() {
    console.log('Change detection run');
  }

  // 4. Después de que el contenido proyectado se inicializa
  ngAfterContentInit() {
    console.log('Content initialized');
  }

  // 5. Después de cada check del contenido proyectado
  ngAfterContentChecked() {
    console.log('Content checked');
  }

  // 6. Después de que las vistas del componente se inicializan
  ngAfterViewInit() {
    console.log('View initialized');
    // Acceder a ViewChild aquí
  }

  // 7. Después de cada check de las vistas
  ngAfterViewChecked() {
    console.log('View checked');
  }

  // 8. Antes de destruir el componente
  // Similar a componentWillUnmount o useEffect cleanup
  ngOnDestroy() {
    console.log('Component destroyed');
    // Limpiar suscripciones, timers, etc.
  }
}
```

### Comparación con React Hooks

| React | Angular |
|-------|---------|
| `useEffect(() => {}, [])` | `ngOnInit()` |
| `useEffect(() => { return cleanup })` | `ngOnDestroy()` |
| `useEffect(() => {}, [dep])` | `ngOnChanges()` cuando cambia `@Input()` |
| `useLayoutEffect()` | `ngAfterViewInit()` |
| No hay equivalente directo | `ngDoCheck()` |

---

## Comparación con React/Next.js

### Tabla Comparativa Rápida

| Concepto | React/Next.js | Angular |
|----------|---------------|---------|
| **Sintaxis** | JSX | Templates HTML |
| **Componentes** | Funciones | Clases con `@Component` |
| **Props** | Props | `@Input()` |
| **Eventos** | Callbacks | `@Output()` + EventEmitter |
| **Estado** | `useState()` | Propiedades de clase o `signal()` |
| **Efectos** | `useEffect()` | `ngOnInit()`, `ngOnChanges()` |
| **Refs** | `useRef()` | `@ViewChild()`, `#templateRef` |
| **Contexto** | Context API | Dependency Injection |
| **Routing** | File-based (Next.js) | Configuración de rutas |
| **Fetching** | `fetch()`, SWR, React Query | HttpClient + Observables (RxJS) |
| **Estado Global** | Redux, Zustand, Context | Services, NgRx |
| **Formularios** | Controlled components | Reactive Forms, Template-driven |
| **Estilos** | CSS Modules, Styled Components | CSS encapsulado por componente |
| **Condicionales** | `{condition && <div>}` | `*ngIf="condition"` |
| **Listas** | `.map()` | `*ngFor` |

### Ejemplo Completo: Contador

**React:**
```jsx
// counter.jsx
import { useState } from 'react';

export default function Counter({ initialValue }) {
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

**Angular (Tradicional):**
```typescript
// counter.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
    </div>
  `
})
export class CounterComponent {
  @Input() initialValue = 0;
  count = 0;

  ngOnInit() {
    this.count = this.initialValue;
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

**Angular (Con Signals - Moderno):**
```typescript
// counter.component.ts
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ count() }}</p>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
    </div>
  `
})
export class CounterComponent {
  initialValue = input(0);
  count = signal(0);

  ngOnInit() {
    this.count.set(this.initialValue());
  }

  increment() {
    this.count.update(v => v + 1);
  }

  decrement() {
    this.count.update(v => v - 1);
  }
}
```

---

## Diferencias Clave a Recordar

### 1. TypeScript es Obligatorio
Angular está construido con TypeScript en mente. No es opcional.

### 2. Decoradores en Lugar de Hooks
```typescript
// React
const [value, setValue] = useState(0);

// Angular
@Input() value = 0;
```

### 3. Templates Separados vs JSX
- React mezcla HTML y JS
- Angular separa lógica (TS) de vista (HTML)

### 4. Observables vs Promises
```typescript
// React/Next.js
const data = await fetch('/api').then(r => r.json());

// Angular
this.http.get('/api').subscribe(data => {
  console.log(data);
});
```

### 5. Inyección de Dependencias
Angular maneja dependencias automáticamente en el constructor:
```typescript
constructor(
  private http: HttpClient,
  private router: Router,
  private myService: MyService
) {}
```

### 6. Cambio de Paradigma
- **React:** Funcional, inmutable, unidireccional
- **Angular:** Orientado a objetos, mutable, bidireccional disponible

---

## Estructura Típica de un Proyecto Angular

```
my-angular-app/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── button/
│   │   │   │   ├── button.component.ts
│   │   │   │   ├── button.component.html
│   │   │   │   ├── button.component.css
│   │   │   │   └── button.component.spec.ts
│   │   │
│   │   ├── pages/               # Componentes de página/ruta
│   │   │   ├── home/
│   │   │   └── about/
│   │   │
│   │   ├── services/            # Servicios (lógica de negocio)
│   │   │   ├── user.service.ts
│   │   │   └── api.service.ts
│   │   │
│   │   ├── models/              # Interfaces y tipos
│   │   │   └── user.model.ts
│   │   │
│   │   ├── guards/              # Route guards (protección de rutas)
│   │   │   └── auth.guard.ts
│   │   │
│   │   ├── pipes/               # Pipes (transformación de datos)
│   │   │   └── date-format.pipe.ts
│   │   │
│   │   ├── directives/          # Directivas personalizadas
│   │   │
│   │   ├── app.component.ts     # Componente raíz
│   │   ├── app.component.html
│   │   ├── app.config.ts        # Configuración de la app
│   │   └── app.routes.ts        # Rutas
│   │
│   ├── assets/                  # Imágenes, fonts, etc.
│   ├── environments/            # Variables de entorno
│   ├── index.html
│   ├── main.ts                  # Entry point
│   └── styles.css               # Estilos globales
│
├── angular.json                 # Configuración de Angular CLI
├── tsconfig.json
└── package.json
```

---

## Comandos CLI Útiles

```bash
# Crear nuevo proyecto
ng new my-app

# Generar componente
ng generate component components/my-component
# O abreviado:
ng g c components/my-component

# Generar servicio
ng g s services/my-service

# Generar guard
ng g g guards/auth

# Generar pipe
ng g pipe pipes/my-pipe

# Servidor de desarrollo
ng serve

# Build para producción
ng build

# Ejecutar tests
ng test
```

---

## Consejos para la Migración

1. **Empieza con Standalone Components**: Son más similares a React
2. **Usa Signals**: Son la nueva forma reactiva (similar a hooks)
3. **Aprende RxJS básico**: Es fundamental en Angular
4. **Aprovecha el CLI**: Genera código automáticamente
5. **Piensa en servicios**: Para lógica compartida (no en componentes)
6. **TypeScript estricto**: Aprovecha el sistema de tipos
7. **Dependency Injection**: Es tu amigo, úsalo
8. **Formularios reactivos**: Son poderosos pero complejos

---

## Recursos Adicionales

- [Documentación oficial de Angular](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [Angular University](https://angular-university.io)
- [Angular Signals Guide](https://angular.dev/guide/signals)

---

## Próximos Pasos

1. Crea un proyecto pequeño de prueba
2. Experimenta con componentes y templates
3. Prueba servicios y HTTP
4. Implementa routing básico
5. Aprende RxJS paso a paso
6. Considera usar Signals para estado

¡Buena suerte con tu migración! Angular tiene una curva de aprendizaje, pero una vez que lo dominas, es muy productivo.