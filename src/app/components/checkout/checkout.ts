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
export class CheckoutComponent {

  name = '';
  address = '';
  creditCard = '';
  submitted = false;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (form.invalid) return;

    const total = this.cartService.getTotal();
    this.cartService.clearCart();

    this.router.navigate(['/confirmation'], {
      state: { name: this.name, total }
    });
  }
}
