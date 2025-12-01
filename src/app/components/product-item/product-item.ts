import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css'
})
export class ProductItem {
  @Input() product!: Product;
  @Input() quantity = 1;

  @Output() quantityChange = new EventEmitter<number>();
  @Output() addToCart = new EventEmitter<void>();

  onQuantityChange(value: number | string) {
    const q = Number(value) || 1;
    this.quantityChange.emit(q);
  }

  onAddToCart() {
    this.addToCart.emit();
  }
}
