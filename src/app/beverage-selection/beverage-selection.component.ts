import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../order.service'; 

@Component({
  selector: 'app-beverage-selection',
  templateUrl: './beverage-selection.component.html',
  styleUrls: ['./beverage-selection.component.css']
})
export class BeverageSelectionComponent {
  @Input() products: Product[] = [];
  selectedBeverages: Product[] = [];


  selectBeverage(product: Product): void {
    this.selectedBeverages.push(product);
    console.log('Selected Beverages:', this.selectedBeverages);
  }
}