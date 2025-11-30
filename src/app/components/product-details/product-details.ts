import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductsService } from '../../services/products';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetailsComponent implements OnInit {

  product?: Product;
  quantity = 1;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    if (!isNaN(id)) {
      this.productsService.getProduct(id).subscribe(p => {
        this.product = p;
      });
    }
  }

  addToCart(): void {
    if (!this.product) return;

    this.cartService.addToCart(this.product, this.quantity);
    this.message = `${this.product.name} (x${this.quantity}) added to cart!`;
    setTimeout(() => this.message = '', 2000);
  }
}
