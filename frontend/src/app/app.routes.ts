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
import { AdminProductsComponent } from './pages/admin/products/admin-products.component';
import { AdminUsersComponent } from './pages/admin/users/admin-users.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comidas', component: ComidasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: '**', redirectTo: '' }
];
