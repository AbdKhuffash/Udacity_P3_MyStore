import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  name = '';
  address = '';
  creditCard = '';

  nameError = '';
  addressError = '';
  creditCardError = '';

  constructor(private cartService: CartService, private router: Router) {}

  validateName() {
    this.nameError =
      this.name.trim().length < 3 ? 'Name must be at least 3 characters.' : '';
  }

  validateAddress() {
    this.addressError =
      this.address.trim().length < 5 ? 'Address must be at least 5 characters.' : '';
  }

  validateCreditCard() {
    const digits = this.creditCard.replace(/\D/g, '');
    this.creditCardError =
      digits.length !== 16 ? 'Credit card must be exactly 16 digits.' : '';
  }

  onSubmit(form: NgForm) {
    this.validateName();
    this.validateAddress();
    this.validateCreditCard();

    if (form.invalid || this.nameError || this.addressError || this.creditCardError) {
      return;
    }

    const total = this.cartService.getTotal();

    this.cartService.setLastOrder({
      name: this.name,
      address: this.address,
      creditCard: this.creditCard,
      total
    });

    this.cartService.clearCart();

    this.router.navigate(['/confirmation']);
  }
}
