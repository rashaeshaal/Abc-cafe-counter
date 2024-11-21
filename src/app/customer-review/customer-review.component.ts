import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css']
})
export class CustomerReviewComponent {
  @Input() orderId!: string; 
  @Output() reviewSubmitted = new EventEmitter<void>(); 

  constructor(private feedbackService: FeedbackService) {}

  submitReview(feedback: string): void {
    this.feedbackService.logFeedback(this.orderId, feedback); 
    alert(`Thank you for your feedback: ${feedback}`);
    this.reviewSubmitted.emit(); 
  }
}
