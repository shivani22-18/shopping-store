import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminNewProductComponent } from './components/admin/admin-new-product/admin-new-product.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
// import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FilterComponent } from './components/filter/filter.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SignupComponent } from './components/signup/signup.component';
import { StoreComponent } from './components/store/store.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'admin', component: AdminHomeComponent,
    children:[
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        component: AdminOrdersComponent
      },
      {
        path: 'products',
        component: AdminProductsComponent
      },
      {
        path:'new-product',
        component: AdminNewProductComponent
      },
      {
        path: 'customers',
        component: AdminCustomersComponent
      }
    ]
  },
  {
    path: 'filter', component: FilterComponent
  },
  {
    path: 'store', component: StoreComponent
  },
  {
    path: 'product-card', component: ProductCardComponent
  },
  {
    path: 'user-orders', component: UserOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
