import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, filter, find } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl: string = 'api/products/products.json';

  constructor(private http: HttpClient) {

  }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => { }),
      catchError((HttpErrorResponse) => {
        console.log(`Server returned code: ${HttpErrorResponse.status}, error message is: ${HttpErrorResponse.message}`)
        return throwError(HttpErrorResponse.message)
      })
    )
  }

  getProductsById(id): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      map((data) => data.filter((item => item.productId === id))),
      catchError((HttpErrorResponse) => {
        console.log(`Server returned code: ${HttpErrorResponse.status}, error message is: ${HttpErrorResponse.message}`)
        return throwError(HttpErrorResponse.message)
      })
    )
  }
}