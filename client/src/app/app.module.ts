import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductService } from './services/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { OrderService } from './services/order.service';
// import { AdminComponent } from './components/admin/admin.component';
import { AdminService } from './services/admin.service';
import { FileUploadModule } from 'ng2-file-upload';
import { CartService } from './services/cart.service';
import { FilterComponent } from './components/filter/filter.component';
import { StoreComponent } from './components/store/store.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';
import { SignupComponent } from './components/signup/signup.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserOrdersComponent } from './components/user-orders/user-orders.component'
import {NgxPaginationModule} from 'ngx-pagination';
// import { CustomersComponent } from './components/admin/customers/customers.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminNewProductComponent } from './components/admin/admin-new-product/admin-new-product.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    HomeComponent,
    FooterComponent,
    CheckoutComponent,
    LoginComponent,
    // AdminComponent,
    FilterComponent,
    StoreComponent,
    ProductCardComponent,
    SignupComponent,
    ProductQuantityComponent,
    UserOrdersComponent,
    // CustomersComponent,
    AdminHomeComponent,
    AdminCustomersComponent,
    AdminNewProductComponent,
    AdminOrdersComponent,
    AdminProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ModalModule.forRoot(),
    NgxPaginationModule
    
    ],
  providers: [ProductService, OrderService, AdminService, CartService, CategoryService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
