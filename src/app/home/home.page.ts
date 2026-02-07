import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonAvatar,
  IonTitle,
  IonButton,
  IonIcon,
  IonContent,
  IonSearchbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  laptopOutline,
  desktopOutline,
  headsetOutline,
  phonePortraitOutline,
  add,
  star,
  home,
  heartOutline,
  notificationsOutline,
  personOutline,
  bagHandleOutline,
  heart
} from 'ionicons/icons';
import { ProductService } from '../services/product.service';
import { FavoritesService } from '../services/favorites.service';
import { Product } from '../models/product.model';
import { ProductCardComponent } from '../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonAvatar,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    IonSearchbar,
    ProductCardComponent
  ],
})
export class HomePage implements OnInit {
  private productService = inject(ProductService);
  private favoritesService = inject(FavoritesService);
  private router = inject(Router);

  categories = [
    { name: 'Laptop', icon: 'laptop-outline', active: true },
    { name: 'Tablet', icon: 'desktop-outline', active: false },
    { name: 'Headset', icon: 'headset-outline', active: false },
    { name: 'Phone', icon: 'phone-portrait-outline', active: false },
  ];

  popularProducts: Product[] = [];
  searchResults: Product[] = [];
  bestSelling: Product[] = [];
  favoriteIds: number[] = [];
  isSearching = false;
  searchQuery = '';

  constructor() {
    addIcons({
      searchOutline,
      laptopOutline,
      desktopOutline,
      headsetOutline,
      phonePortraitOutline,
      add,
      star,
      home,
      heartOutline,
      heart,
      notificationsOutline,
      personOutline,
      bagHandleOutline
    });
  }

  toggleFavorite(event: Event, product: Product) {
    event.stopPropagation(); // Prevent navigating to product details if we had that logic
    this.favoritesService.toggleFavorite(product);
  }

  isFavorite(product: Product): boolean {
    return this.favoriteIds.includes(product.id);
  }

  ngOnInit() {
    this.favoritesService.favorites$.subscribe(favs => {
      this.favoriteIds = favs.map(p => p.id);
    });

    this.selectCategory(this.categories[0]); // Load first category by default

    // Fetch Smartphones for "Best Selling" (Keep this separate or dynamic?)
    // For now, let's keep Best Selling as a fixed "Smartphones" section or make it random?
    // User wants "function working", usually implies the main list updates.
    // The previous code had "Popular Product" and "Best Selling".
    // Let's make "Popular Product" respond to the category selection.

    this.productService.getSmartphones().subscribe((products) => {
      this.bestSelling = products;
    });
  }

  selectCategory(category: any) {
    // Update active state
    this.categories.forEach(c => c.active = false);
    category.active = true;

    // Fetch products based on category name
    const categoryQuery = category.name.toLowerCase();

    // API categories mapping
    let apiCategory = '';
    switch (categoryQuery) {
      case 'laptop': apiCategory = 'laptops'; break;
      case 'tablet': apiCategory = 'tablets'; break;
      case 'headset': apiCategory = 'mobile-accessories'; break; // DummyJSON doesn't have headsets exactly, maybe mobile-accessories or something? Checking docs... 'mobile-accessories' or 'sunglasses'? Let's fallback to 'smartphones' for Phone.
      // actually 'mobile-accessories' is valid in some APIs, but dummyjson has 'laptops', 'smartphones', 'tablets', 'mobile-accessories'.
      // Let's stick to safe defaults.
      case 'phone': apiCategory = 'smartphones'; break;
      default: apiCategory = 'laptops';
    }

    if (categoryQuery === 'headset') {
      // DummyJSON fallback for now
      apiCategory = 'mobile-accessories';
    }

    // Call service
    this.productService.getProductsByCategory(apiCategory).subscribe(products => {
      this.popularProducts = products;
    });
  }

  goToPopular() {
    this.router.navigate(['/product-list'], {
      queryParams: {
        title: 'Popular Products',
        type: 'popular'
      }
    });
  }

  goToBestSelling() {
    this.router.navigate(['/product-list'], {
      queryParams: {
        title: 'Best Selling',
        type: 'best-selling'
      }
    });
  }

  goToProductDetail(product: Product) {
    this.router.navigate(['/product-detail', product.id]);
  }

  goToProfile() {
    this.router.navigate(['/tabs/profile']);
  }

  toggleSearch() {
    this.isSearching = !this.isSearching;
    if (!this.isSearching) {
      this.clearSearch();
    }
  }

  handleSearch(event: any) {
    const query = event.target.value;
    this.searchQuery = query;

    if (query && query.trim() !== '') {
      this.productService.searchProducts(query).subscribe(products => {
        this.searchResults = products;
      });
    } else {
      this.searchResults = [];
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    this.isSearching = false;
  }
}