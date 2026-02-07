import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    private favoritesKey = 'gadgetpro_favorites';
    private favoritesSubject = new BehaviorSubject<Product[]>([]);

    favorites$ = this.favoritesSubject.asObservable();

    constructor() {
        this.loadFavorites();
    }

    private loadFavorites() {
        const saved = localStorage.getItem(this.favoritesKey);
        if (saved) {
            this.favoritesSubject.next(JSON.parse(saved));
        }
    }

    isFavorite(product: Product): boolean {
        return this.favoritesSubject.value.some(p => p.id === product.id);
    }

    toggleFavorite(product: Product) {
        const current = this.favoritesSubject.value;
        const index = current.findIndex(p => p.id === product.id);

        if (index > -1) {
            // Remove
            current.splice(index, 1);
        } else {
            // Add
            current.push(product);
        }

        this.favoritesSubject.next([...current]);
        localStorage.setItem(this.favoritesKey, JSON.stringify(current));
    }
}
