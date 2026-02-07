import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonNote,

} from '@ionic/angular/standalone';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notifications',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar style="--background: #fff">
        <ion-title>Notifications</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content style="--background: #fff">
      <ion-list>
        <ion-item *ngFor="let notif of notifications">
          <ion-label>
            <h2>{{ notif.title }}</h2>
            <p>{{ notif.message }}</p>
          </ion-label>
          <ion-note slot="end">{{ notif.date }}</ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonNote,

  ]
})
export class NotificationsPage {
  notificationService = inject(NotificationService);
  notifications = this.notificationService.getNotifications();
}
