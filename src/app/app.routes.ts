import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./favorites/favorites.page').then((m) => m.FavoritesPage),
      },
      {
        path: 'notifications',
        loadComponent: () => import('./notifications/notifications.page').then((m) => m.NotificationsPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'cart',
        loadComponent: () => import('./cart/cart.page').then((m) => m.CartPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'product-list',
    loadComponent: () => import('./product-list/product-list.page').then((m) => m.ProductListPage),
  },
  {
    path: 'product-detail/:id',
    loadComponent: () => import('./product-detail/product-detail.page').then((m) => m.ProductDetailPage),
  },
];
