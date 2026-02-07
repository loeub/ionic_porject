import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonIcon, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
    home,
    heartOutline,
    bagHandleOutline,
    notificationsOutline,
    personOutline
} from 'ionicons/icons';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        IonIcon,
        IonRouterOutlet
    ]
})
export class TabsPage {
    constructor() {
        addIcons({
            home,
            heartOutline,
            bagHandleOutline,
            notificationsOutline,
            personOutline
        });
    }
}
