import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ComidasComponent } from './pages/comidas/comidas.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductComponent } from './pages/product/product.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './pages/admin/products/admin-products.component';
import { AdminUsersComponent } from './pages/admin/users/admin-users.component';
import { AdminOrdersComponent } from './pages/admin/orders/admin-orders.component';
import { AdminEmailComponent } from './pages/admin/email/admin-email.component';
import { AdminProfileComponent } from './pages/admin/profile/admin-profile.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comidas/:id', component: ProductComponent },
  { path: 'comidas', component: ComidasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'payment', component: PaymentComponent,canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'product/:id', component: ProductComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [adminGuard] },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [adminGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [adminGuard] },
  { path: 'admin/email', component: AdminEmailComponent, canActivate: [adminGuard] },
  { path: 'admin/profile', component: AdminProfileComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
