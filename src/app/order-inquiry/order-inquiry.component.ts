import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-inquiry',
  templateUrl: './order-inquiry.component.html',
  styleUrls: ['./order-inquiry.component.css'],
})
export class OrderInquiryComponent implements OnInit {
  customerName: string = '';
  products: { id: number; name: string; price: number }[] = [];
  selectedBeverages: { id: number; name: string; price: number }[] = [];
  orderStarted: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.customerName = localStorage.getItem('customerName') || 'Guest';
    this.http
      .get<{ id: number; name: string; price: number }[]>('http://localhost:3000/products')
      .subscribe((data) => {
        this.products = data;
      });
  }

  startOrder() {
    this.orderStarted = true;
  }

  toggleSelection(beverage: { id: number; name: string; price: number }) {
    const index = this.selectedBeverages.findIndex((b) => b.id === beverage.id);
    if (index === -1) {
      this.selectedBeverages.push(beverage); 
    } else {
      this.selectedBeverages.splice(index, 1); 
    }
  }

  isSelected(beverage: { id: number; name: string; price: number }): boolean {
    return this.selectedBeverages.some((b) => b.id === beverage.id);
  }

  proceedToPlaceOrder(): void {
    if (this.selectedBeverages.length === 0) {
      alert('Please select at least one beverage before proceeding!');
    } else {
      const orders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
      orders.push({
        customerName: this.customerName,
        beverages: this.selectedBeverages,
      });
      localStorage.setItem('customerOrders', JSON.stringify(orders));

      this.router.navigate(['/order-summary']);
    }
  }
}
