import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderInquiryComponent } from './order-inquiry/order-inquiry.component';
import { OrderPlacementComponent } from './order-placement/order-placement.component';
const routes: Routes = [
  { path: '', component: CounterComponent }, 
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: 'order-inquiry', component: OrderInquiryComponent },
  { path: 'place-order', component: OrderPlacementComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
