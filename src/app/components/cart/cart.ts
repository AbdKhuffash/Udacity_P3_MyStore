import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CartService, CartItem } from '../../services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  items: CartItem[] = [];
  total = 0;
  message = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.product.id);
    this.loadItems();
    this.message = `${item.product.name} removed from cart.`;
    setTimeout(() => (this.message = ''), 2000);
  }

  updateQuantity(item: CartItem, value: number | string) {
    const qty = Number(value) || 1;
    item.quantity = qty;
    this.total = this.cartService.getTotal();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadItems();
  }
}
