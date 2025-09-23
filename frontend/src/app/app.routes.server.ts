import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'comidas',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'user',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'cart',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'payment',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'orders',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'admin',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'admin/products',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'admin/users',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'admin/orders',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'admin/email',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'admin/profile',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'product/**',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
