import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonIcon,
    IonButton,
    IonFooter,
    IonSpinner,
    ToastController
} from '@ionic/angular/standalone';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { FavoritesService } from '../services/favorites.service';
import { CartService } from '../services/cart.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline, star, cart } from 'ionicons/icons';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.page.html',
    styleUrls: ['./product-detail.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonContent,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonIcon,
        IonButton,
        IonFooter,
        IonSpinner
    ],
})
export class ProductDetailPage implements OnInit {
    private route = inject(ActivatedRoute);
    private productService = inject(ProductService);
    private favoritesService = inject(FavoritesService);
    private cartService = inject(CartService);
    private toastController = inject(ToastController);

    product: Product | null = null;
    isLoading = true;
    isProductFavorite = false;

    constructor() {
        addIcons({ heart, heartOutline, star, cart });
    }

    ngOnInit() {
        this.favoritesService.favorites$.subscribe(favs => {
            if (this.product) {
                this.isProductFavorite = favs.some(p => p.id === this.product!.id);
            }
        });

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.loadProduct(+id);
            }
        });
    }

    loadProduct(id: number) {
        this.isLoading = true;
        this.productService.getProductById(id).subscribe({
            next: (res) => {
                this.product = res;
                this.isLoading = false;
                // Check favorite status once loaded
                this.isProductFavorite = this.favoritesService.isFavorite(res);
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    toggleFavorite() {
        if (this.product) {
            this.favoritesService.toggleFavorite(this.product);
        }
    }

    isFavorite(): boolean {
        return this.isProductFavorite;
    }

    async addToCart() {
        if (this.product) {
            this.cartService.addToCart(this.product);

            const toast = await this.toastController.create({
                message: `${this.product.title} added to bag`,
                duration: 2000,
                position: 'bottom',
                color: 'success'
            });
            await toast.present();
        }
    }
}
