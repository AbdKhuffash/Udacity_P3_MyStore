import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetailsComponent {

  // Product observable for async pipe
  product$!: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.product$ = this.route.paramMap.pipe(
      map(params => {
        const raw = params.get('id');
        const id = raw ? Number(raw) : NaN;
        console.log('ProductDetailsComponent → route id =', raw, 'parsed =', id);
        return id;
      }),
      switchMap(id => this.productsService.getProduct(id).pipe(
        map(product => {
          console.log('ProductDetailsComponent → loaded product =', product);
          return product;
        })
      ))
    );
  }
}
