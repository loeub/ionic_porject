import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonFooter,
    IonButton,
    AlertController,
    LoadingController
} from '@ionic/angular/standalone';
import { CartService } from '../services/cart.service';
import { NotificationService } from '../services/notification.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.page.html',
    styleUrls: ['./checkout.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonList,
        IonListHeader,
        IonItem,
        IonLabel,
        IonInput, // Ensure these are imported from standalone
        IonSelect,
        IonSelectOption,
        IonFooter,
        IonButton
    ]
})
export class CheckoutPage {
    cartService = inject(CartService);
    notificationService = inject(NotificationService);
    router = inject(Router);
    alertCtrl = inject(AlertController);
    loadingCtrl = inject(LoadingController);
    fb = inject(FormBuilder);

    checkoutForm: FormGroup;

    constructor() {
        this.checkoutForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(3)]],
            address: ['', [Validators.required, Validators.minLength(5)]],
            city: ['', Validators.required],
            zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{4,6}$')]],
            cardType: ['', Validators.required],
            cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
            expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/[0-9]{2}$')]],
            cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
        });
    }

    getSubtotal() {
        return this.cartService.getTotalPrice();
    }

    getTotal() {
        return this.cartService.getTotalPrice();
    }

    async placeOrder() {
        if (this.checkoutForm.invalid) {
            this.checkoutForm.markAllAsTouched();
            return;
        }

        const loading = await this.loadingCtrl.create({
            message: 'Processing payment...',
            duration: 2000,
            spinner: 'crescent'
        });
        await loading.present();

        await loading.onDidDismiss();

        this.cartService.clearCart();

        this.notificationService.addNotification({
            title: 'Order Successful',
            message: 'Your order has been placed successfully. Thank you for shopping with us!'
        });

        const alert = await this.alertCtrl.create({
            header: 'Order Confirmed!',
            message: 'Your order has been placed successfully.',
            buttons: [
                {
                    text: 'Continue Shopping',
                    handler: () => {
                        this.router.navigate(['/']);
                    }
                }
            ]
        });
        await alert.present();
    }
}
