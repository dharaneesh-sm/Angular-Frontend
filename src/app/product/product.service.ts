import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private baseUrl = 'http://localhost:3000/api/e-commerce';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addProduct`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/removeProduct/${id}`);
  }

  updateProduct(product: any,id:string): Observable<any> {
    console.log(product.id);
    
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }
}
