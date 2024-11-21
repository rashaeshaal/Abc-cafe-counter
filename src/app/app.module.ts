import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CounterComponent } from './counter/counter.component';
import { OrderInquiryComponent } from './order-inquiry/order-inquiry.component';
import { BeverageSelectionComponent } from './beverage-selection/beverage-selection.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { FormsModule } from '@angular/forms'; 
import { OrderService } from './order.service';
import { OrderPlacementComponent } from './order-placement/order-placement.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerReviewComponent } from './customer-review/customer-review.component';
import { PerformanceComponent } from './performance/performance.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    OrderInquiryComponent,
    BeverageSelectionComponent,
    OrderSummaryComponent,
    OrderPlacementComponent,
    CustomerReviewComponent,
    PerformanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
