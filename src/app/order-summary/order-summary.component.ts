import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FeedbackService } from '../feedback.service'; 

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
  providers: [UpperCasePipe],
})
export class OrderSummaryComponent implements OnInit {
  currentCustomerOrders: { 
    customerName: string; 
    beverages: { name: string; price: number }[]; 
    reviewed: boolean; 
  }[] = [];
  grandTotal: number = 0; 
  customerName: string = ''; 
  showPerformance: boolean = false; 

  constructor(
    private feedbackService: FeedbackService,
    private upperCasePipe: UpperCasePipe 
  ) {}

  ngOnInit(): void {
   
    this.customerName = localStorage.getItem('customerName') || 'Guest';

    const orders = this.getOrdersFromLocalStorage();


    this.currentCustomerOrders = orders
      .filter((order) => order.customerName === this.customerName)
      .map((order) => ({ ...order, reviewed: false })); 

   
    this.calculateGrandTotal();
  }

 
  getOrdersFromLocalStorage(): any[] {
    const orders = localStorage.getItem('customerOrders');
    try {
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error('Error parsing customerOrders from localStorage:', error);
      return [];
    }
  }

  formatBeverages(beverages: { name: string }[]): string {

    return beverages.map((b) => this.upperCasePipe.transform(b.name)).join(', ');
  }

  calculateTotal(beverages: { price: number }[]): number {
    return beverages.reduce((sum, beverage) => sum + beverage.price, 0);
  }

  calculateGrandTotal(): void {
    this.grandTotal = this.currentCustomerOrders.reduce((sum, order) => {
      const orderTotal = order.beverages.reduce((subtotal, beverage) => subtotal + beverage.price, 0);
      return sum + orderTotal;
    }, 0);
  }

  submitFeedback(order: { customerName: string; beverages: { name: string; price: number }[], reviewed: boolean }, feedback: string): void {
    const orderId = `Order #${this.currentCustomerOrders.indexOf(order) + 1}`;
    this.feedbackService.logFeedback(orderId, feedback); 
    alert(`Thank you for your feedback on ${orderId}: ${feedback}`);
    order.reviewed = true; 
  }

  togglePerformance(): void {
    this.showPerformance = !this.showPerformance;
  }
}
