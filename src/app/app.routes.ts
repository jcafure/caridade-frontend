import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login/login.component';
import { NewRegisterComponent } from './features/register/new-register/new-register/new-register.component';
import { HomeComponent } from './features/home/home.component';
import { ProdutosComponent } from './features/products/products.component';
import { NewProductComponent } from './features/products/new-product/new-product.component';
import { NewDonorComponent } from './features/donors/new-donor/new-donor.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'donor/new-profile', component: NewDonorComponent },
  { path: 'register', component: NewRegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'produtos/new', component: NewProductComponent },
  { path: '**', redirectTo: '' }
];