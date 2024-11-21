import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  providers: [DatePipe]
})
export class CounterComponent {
  customerName: string = '';
  currentDate: string;

  constructor(private router: Router) {
    const datePipe = new DatePipe('en-US');
    this.currentDate = datePipe.transform(new Date(), 'fullDate') || ''; 
  }

  askOrder() {
    if (this.customerName.trim()) {
      localStorage.setItem('customerName', this.customerName);
      this.router.navigate(['/order-inquiry']);
    } else {
      alert('Please enter your name to proceed.');
    }
  }
}
