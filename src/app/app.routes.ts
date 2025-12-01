import { Routes } from '@angular/router';

import { ProductList } from './components/product-list/product-list';
import { ProductDetailsComponent } from './components/product-details/product-details';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';
import { Confirmation } from './components/confirmation/confirmation';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  // Product list
  { path: 'products', component: ProductList },

  // Product details 
  { path: 'products/:id', component: ProductDetailsComponent },

  // Cart + checkout + confirmation
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'confirmation', component: Confirmation },

  // Fallback
  { path: '**', redirectTo: 'products' }
];
