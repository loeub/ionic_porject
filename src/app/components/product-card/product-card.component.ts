import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline, star } from 'ionicons/icons';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    standalone: true,
    imports: [CommonModule, IonIcon]
})
export class ProductCardComponent {
    @Input() product!: Product;
    @Input() isFavorite: boolean = false;
    @Output() toggleFavorite = new EventEmitter<Event>();

    constructor() {
        addIcons({ heart, heartOutline, star });
    }

    onToggleFavorite(event: Event) {
        this.toggleFavorite.emit(event);
    }
}
