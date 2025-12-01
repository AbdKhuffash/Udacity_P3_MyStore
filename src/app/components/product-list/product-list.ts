import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ProductsService } from '../../services/products';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  products: Product[] = [];
  quantities: { [id: number]: number } = {};
  message = '';

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(data => {
      console.log('ProductList loaded products:', data);
      this.products = data;
      this.quantities = {};
      this.products.forEach(p => (this.quantities[p.id] = 1));
    });
  }

  addToCart(product: Product): void {
    const quantity = this.quantities[product.id] || 1;
    this.cartService.addToCart(product, quantity);
    this.message = `${product.name} (x${quantity}) added to cart!`;
    setTimeout(() => (this.message = ''), 2000);
  }
}

