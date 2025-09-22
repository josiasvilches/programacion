import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ComidasComponent } from './pages/comidas/comidas.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './components/user/user.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrdersComponent } from './components/orders/orders.component';

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
  { path: '**', redirectTo: '' }
];
