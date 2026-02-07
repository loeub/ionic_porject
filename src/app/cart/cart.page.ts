import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,

    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonButton,
    IonIcon,
    IonFooter,
    AlertController,
    LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

import { CartService, CartItem } from '../services/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,

        IonList,
        IonItem,
        IonThumbnail,
        IonLabel,
        IonButton,
        IonIcon,
        IonFooter
    ]
})
export class CartPage {
    cartService = inject(CartService);
    alertCtrl = inject(AlertController);
    loadingCtrl = inject(LoadingController);
    router = inject(Router);
    cartItems: CartItem[] = [];

    constructor() {
        addIcons({ trashOutline });
        this.cartService.cart$.subscribe(items => {
            this.cartItems = items;
        });
    }

    removeItem(item: CartItem) {
        this.cartService.removeFromCart(item.id);
    }

    checkout() {
        this.router.navigate(['/checkout']);
    }

    getTotal(): number {
        return this.cartService.getTotalPrice();
    }
}
