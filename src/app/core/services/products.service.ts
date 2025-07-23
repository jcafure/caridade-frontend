import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, PaginatedResponse } from '../../models/product.model'; 
import { ProductDto } from '../../models/product.dto';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }
  
  findAll(
    page: number,
    size: number,
    sortField: string,
    sortDirection: string,
    name: string
  ): Observable<PaginatedResponse<Product>> {
    
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', `${sortField},${sortDirection}`);
  
    if (name.trim()) {
      params = params.set('name', name.trim());
    }
  
    return this.http.get<PaginatedResponse<Product>>(`${this.apiUrl}/all`, { params });
  }

  findAllDto(
    page: number,
    size: number,
    sortField: string,
    sortDirection: string,
    name: string
  ): Observable<PaginatedResponse<ProductDto>> {
    
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', `${sortField},${sortDirection}`);
  
    if (name.trim()) {
      params = params.set('name', name.trim());
    }
  
    return this.http.get<PaginatedResponse<ProductDto>>(`${this.apiUrl}/all`, { params });
  }

   
  findAllProductDto(
    page: number,
    size: number,
    sortField: string,
    sortDirection: string,
    name: string
  ): Observable<PaginatedResponse<ProductDto>> {
    
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', `${sortField},${sortDirection}`);
  
    if (name.trim()) {
      params = params.set('name', name.trim());
    }
  
    return this.http.get<PaginatedResponse<ProductDto>>(`${this.apiUrl}/all`, { params });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/new-product`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-product/${id}`);
  }
  
  updateProduct(product: any): Observable<any> {
    return this.http.put<Product>(`${this.apiUrl}/update-product`, product)
  }
}
