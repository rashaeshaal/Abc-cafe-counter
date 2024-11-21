import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-placement',
  templateUrl: './order-placement.component.html',
  styleUrls: ['./order-placement.component.css'],
})
export class OrderPlacementComponent implements OnInit {
  selectedBeverages: { id: number; name: string; price: number }[] = [];
  customerName: string = '';
  totalAmount: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['selectedBeverages']) {
      this.selectedBeverages = navigation.extras.state['selectedBeverages'];
      this.calculateTotal();
    }
    this.customerName = localStorage.getItem('customerName') || 'Guest';
  }

  calculateTotal(): void {
    this.totalAmount = this.selectedBeverages.reduce((sum, beverage) => sum + beverage.price, 0);
  }

  placeOrder(): void {
    const orders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
    orders.push({
      customerName: this.customerName,
      beverages: this.selectedBeverages,
    });
    localStorage.setItem('customerOrders', JSON.stringify(orders));

    this.router.navigate(['/order-summary']);
  }
}
