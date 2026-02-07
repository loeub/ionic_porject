import { Component, OnInit, inject } from '@angular/core';
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
  IonButtons,

  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, cartOutline } from 'ionicons/icons';
import { FavoritesService } from '../services/favorites.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar style="--background: #fff">
        <ion-title>Favorites</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content style="--background: #fff">
      <div *ngIf="(favorites$ | async)?.length === 0" class="empty-state">
        <p>No favorites yet.</p>
      </div>

      <ion-list>
        <ion-item *ngFor="let p of favorites$ | async" (click)="goToProductDetail(p)" button detail="false">
          <ion-thumbnail slot="start">
            <img [src]="p.thumbnail" alt="product" />
          </ion-thumbnail>
          <ion-label>
            <h2>{{ p.title }}</h2>
            <p>{{ p.price | currency }}</p>
          </ion-label>
          <ion-buttons slot="end">
             <ion-button (click)="addToCart($event, p)" color="primary">
              <ion-icon name="cart-outline" slot="icon-only"></ion-icon>
            </ion-button>
            <ion-button (click)="removeFavorite($event, p)" color="danger">
              <ion-icon name="trash-outline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  styles: [`
    .empty-state {
      text-align: center;
      margin-top: 50px;
      color: #888;
    }
    ion-thumbnail {
      --border-radius: 8px;
    }
  `],
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
    IonButtons,

  ]
})
export class FavoritesPage {
  favoritesService = inject(FavoritesService);
  cartService = inject(CartService);
  favorites$: Observable<Product[]> = this.favoritesService.favorites$;
  private router = inject(Router);
  private toastController = inject(ToastController);

  constructor() {
    addIcons({ trashOutline, cartOutline });
  }

  removeFavorite(event: Event, product: Product) {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(product);
  }

  async addToCart(event: Event, product: Product) {
    event.stopPropagation();
    this.cartService.addToCart(product);

    const toast = await this.toastController.create({
      message: `${product.title} added to bag`,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  goToProductDetail(product: Product) {
    this.router.navigate(['/product-detail', product.id]);
  }
}
