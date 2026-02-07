import { Injectable } from '@angular/core';

export interface Notification {
    id: number;
    title: string;
    message: string;
    date: string;
    read: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private notifications: Notification[] = [
        { id: 1, title: 'Order Shipped', message: 'Your order #12345 has been shipped!', date: '2 hrs ago', read: false },
        { id: 2, title: 'New Arrival', message: 'Check out the new iPhone 16 Pro Max.', date: '5 hrs ago', read: false },
        { id: 3, title: 'Promo Code', message: 'Use code SAVE20 for 20% off.', date: '1 day ago', read: true },
    ];

    getNotifications() {
        return this.notifications;
    }
}
