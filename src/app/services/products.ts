import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = '/assets/data.json';

  private fallbackProducts: Product[] = [
    {
      id: 1,
      name: 'Book',
      price: 9.99,
      url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
      description: 'You can read it!'
    },
    {
      id: 2,
      name: 'Headphones',
      price: 249.99,
      url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
      description: 'Listen to stuff!'
    },
    {
      id: 3,
      name: 'Backpack',
      price: 79.99,
      url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      description: 'Carry things around town!'
    },
    {
      id: 4,
      name: 'Glasses',
      price: 129.99,
      url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
      description: 'Now you can see!'
    },
    {
      id: 5,
      name: 'Cup',
      price: 4.99,
      url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
      description: 'Drink anything with it!'
    },
    {
      id: 6,
      name: 'Shirt',
      price: 29.99,
      url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
      description: 'Wear it with style!'
    }
  ];

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
