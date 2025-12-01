import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css'
})
export class Confirmation {
  name = '';
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const order = this.cartService.getLastOrder();
    if (order) {
      this.name = order.name;
      this.total = order.total;
    }
  }
}
