import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar style="--background: #fff">
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" style="--background: #fff">
      <div class="profile-header">
        <ion-avatar>
          <img src="https://i.pravatar.cc/150?img=12" alt="User" />
        </ion-avatar>
        <h2>John Doe</h2>
        <p>john.doe@example.com</p>
      </div>

      <ion-list>
        <ion-item button>
          <ion-icon slot="start" name="person-circle-outline"></ion-icon>
          <ion-label>Edit Profile</ion-label>
        </ion-item>
        <ion-item button>
          <ion-icon slot="start" name="settings-outline"></ion-icon>
          <ion-label>Settings</ion-label>
        </ion-item>

      </ion-list>
    </ion-content>
  `,
  styles: [`
    .profile-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      
      ion-avatar {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
      }
      
      h2 {
        margin: 5px 0;
        font-weight: bold;
      }
      
      p {
        color: #666;
        margin: 0;
      }
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonAvatar,
    IonItem,
    IonLabel,
    IonList,
    IonIcon,

  ]
})
export class ProfilePage {
  constructor() {
    addIcons({ personCircleOutline, settingsOutline });
  }
}
