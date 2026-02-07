import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonSearchbar
} from '@ionic/angular/standalone';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { addIcons } from 'ionicons';
import { heartOutline, heart, star } from 'ionicons/icons';
import { FavoritesService } from '../services/favorites.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.page.html',
    styleUrls: ['./product-list.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonGrid,
        IonRow,
        IonCol,
        IonIcon,
        IonSearchbar
    ],
})
export class ProductListPage implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private productService = inject(ProductService);
    private favoritesService = inject(FavoritesService);

    pageTitle = 'Products';
    products: Product[] = [];
    displayType: 'popular' | 'best-selling' | 'category' = 'popular'; // Default
    favoriteIds: number[] = [];

    constructor() {
        addIcons({ star, heartOutline, heart });
    }

    ngOnInit() {
        this.favoritesService.favorites$.subscribe(favs => {
            this.favoriteIds = favs.map(p => p.id);
        });

        this.route.queryParams.subscribe(params => {
            if (params['title']) {
                this.pageTitle = params['title'];
            }

            if (params['type']) {
                this.displayType = params['type'];
                this.loadProducts(this.displayType, params['category']);
            } else {
                // Default fallbacks if needed
                this.loadProducts('popular');
            }
        });
    }

    loadProducts(type: string, categoryName?: string) {
        if (type === 'popular') {
            // Re-use logic from home page or fetch generic popular items
            // Since Home Page 'popular' depends on selected category, we might want to pass that too, 
            // OR just fetch a default set of popular items (e.g. laptops/smartphones mix).
            // For now, let's fetch laptops as a default "popular" if no category is strictly defined,
            // or if we passed a category in query params, use that.
            const cat = categoryName || 'laptops';
            this.productService.getProductsByCategory(cat).subscribe(res => {
                this.products = res;
            });
        } else if (type === 'best-selling') {
            this.productService.getSmartphones().subscribe(res => {
                this.products = res;
            });
        } else if (type === 'category' && categoryName) {
            this.productService.getProductsByCategory(categoryName).subscribe(res => {
                this.products = res;
            });
        }
    }

    toggleFavorite(event: Event, product: Product) {
        event.stopPropagation();
        this.favoritesService.toggleFavorite(product);
    }

    isFavorite(product: Product): boolean {
        return this.favoriteIds.includes(product.id);
    }

    goToProductDetail(product: Product) {
        this.router.navigate(['/product-detail', product.id]);
    }
}
