import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { Product } from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:3000/api';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`)
      .pipe(
        // tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.baseUrl}/product/${id}`;
    return this.http.get<Product>(url).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/product`, product, this.httpOptions).pipe(
      // tap((newProduct: Hero) => this.log(`added hero w/ id=${newProduct.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(`${this.baseUrl}/product/${product.id}`, product, this.httpOptions).pipe(
      // tap(_ => this.log(`updated hero id=${Product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct(id: number): Observable<Product> {
    const url = `${this.baseUrl}/product/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      // tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

}
