import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login/login.component';
import { NewRegisterComponent } from './features/register/new-register/new-register/new-register.component';
import { HomeComponent } from './features/home/home.component';
import { ProdutosComponent } from './features/products/products.component';
import { NewProductComponent } from './features/products/new-product/new-product.component';
import { NewDonorComponent } from './features/donors/new-donor/new-donor.component';
import { authGuard } from './auth/auth.guard';
import { CreateMenuCampaignComponent } from './features/menu-campaigns/create-menu-campaign.component';
import { ListMenusComponent } from './features/menu-campaigns/list/list-menus/list-menus.component';
import { UpdateMenuComponent } from './features/menu-campaigns/update/update-menu/update-menu.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'donor/new-profile', component: NewDonorComponent },
  { path: 'register', component: NewRegisterComponent },


  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'produtos', component: ProdutosComponent, canActivate: [authGuard] },
  { path: 'produtos/new', component: NewProductComponent , canActivate: [authGuard]},
  { path: 'menu-campaigns/new', component: CreateMenuCampaignComponent, canActivate: [authGuard] },
  { path: 'menu-campaigns/menus', component: ListMenusComponent, canActivate: [authGuard] },
  { path: 'menu-campaigns/edit/:id', component: UpdateMenuComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];