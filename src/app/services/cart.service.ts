import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem extends Product {
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartKey = 'gadgetpro_cart';
    private cartSubject = new BehaviorSubject<CartItem[]>([]);

    cart$ = this.cartSubject.asObservable();

    constructor() {
        this.loadCart();
    }

    private loadCart() {
        const saved = localStorage.getItem(this.cartKey);
        if (saved) {
            this.cartSubject.next(JSON.parse(saved));
        }
    }

    private saveCart(items: CartItem[]) {
        this.cartSubject.next(items);
        localStorage.setItem(this.cartKey, JSON.stringify(items));
    }

    getCartItems(): CartItem[] {
        return this.cartSubject.value;
    }

    addToCart(product: Product) {
        const currentItems = this.getCartItems();
        const existingItem = currentItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
            this.saveCart([...currentItems]);
        } else {
            const newItem: CartItem = { ...product, quantity: 1 };
            this.saveCart([...currentItems, newItem]);
        }
    }

    removeFromCart(productId: number) {
        const currentItems = this.getCartItems();
        const updatedItems = currentItems.filter(item => item.id !== productId);
        this.saveCart(updatedItems);
    }

    decreaseQuantity(productId: number) {
        const currentItems = this.getCartItems();
        const item = currentItems.find(i => i.id === productId);

        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
                this.saveCart([...currentItems]);
            } else {
                this.removeFromCart(productId);
            }
        }
    }

    clearCart() {
        this.saveCart([]);
    }

    getTotalPrice(): number {
        return this.cartSubject.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartCount(): number {
        return this.cartSubject.value.reduce((count, item) => count + item.quantity, 0);
    }
}
