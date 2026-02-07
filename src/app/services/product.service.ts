import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, ProductResponse } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = 'https://dummyjson.com/products';

    getProductsByCategory(category: string): Observable<Product[]> {
        return this.http.get<ProductResponse>(`${this.apiUrl}/category/${category}`).pipe(
            map(response => response.products)
        );
    }

    getLaptops(): Observable<Product[]> {
        return this.getProductsByCategory('laptops');
    }

    getTablets(): Observable<Product[]> {
        return this.getProductsByCategory('tablets');
    }

    getSmartphones(): Observable<Product[]> {
        return this.getProductsByCategory('smartphones');
    }

    getAllProducts(): Observable<Product[]> {
        return this.http.get<ProductResponse>(this.apiUrl).pipe(
            map(response => response.products)
        );
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    searchProducts(query: string): Observable<Product[]> {
        return this.http.get<ProductResponse>(`${this.apiUrl}/search?q=${query}`).pipe(
            map(response => response.products)
        );
    }
}
