import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product';
import productsJson from '../../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = '/assets/data.json';

  private fallbackProducts: Product[] = productsJson as Product[];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(products => console.log('Loaded products from HTTP:', products)),
      catchError(err => {
        console.error('HTTP error loading products, using fallback data.', err);
        return of(this.fallbackProducts);
      })
    );
  }

  getProduct(id: number): Observable<Product | undefined> {
    return new Observable(observer => {
      this.getProducts().subscribe(products => {
        const product = products.find(p => p.id === id);
        observer.next(product);
        observer.complete();
      });
    });
  }
}
