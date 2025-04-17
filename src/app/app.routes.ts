import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProdutosComponent } from './features/products/products.component';
import { NewProductComponent } from './features/products/new-product/new-product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'produtos/new', component: NewProductComponent },
  { path: '**', redirectTo: '' }
];