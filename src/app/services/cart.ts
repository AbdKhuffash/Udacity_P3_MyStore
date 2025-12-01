import { Injectable } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];

  private lastOrder:
    | { name: string; address: string; creditCard: string; total: number }
    | null = null;

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeFromCart(productId: number): void {
    this.items = this.items.filter(i => i.product.id !== productId);
  }

  clearCart(): void {
    this.items = [];
  }

  getTotal(): number {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  setLastOrder(order: {
    name: string;
    address: string;
    creditCard: string;
    total: number;
  }) {
    this.lastOrder = order;
  }

  getLastOrder() {
    return this.lastOrder;
  }
}
