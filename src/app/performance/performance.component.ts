import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
 
  reviewStats = { good: 0, average: 0, poor: 0 }; 
  performanceMessage: string = ''; 
  showPerformance: boolean = false; 

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.reviewStats = this.feedbackService.getFeedbackStats(); 
    this.performanceMessage = this.feedbackService.getPerformanceMessage(); 
  }


  calculatePerformance(): string {
    const totalReviews = this.reviewStats.good + this.reviewStats.average + this.reviewStats.poor;
    if (totalReviews === 0) {
      return 'No reviews yet.';
    }

    const goodPercentage = (this.reviewStats.good / totalReviews) * 100;
    if (goodPercentage >= 80) {
      return 'Excellent';
    } else if (goodPercentage >= 50) {
      return 'Good';
    } else {
      return 'Needs Improvement';
    }
  }

 
  showReviewStats(): void {
    alert(`Good: ${this.reviewStats.good}, Average: ${this.reviewStats.average}, Poor: ${this.reviewStats.poor}`);
  }

  togglePerformance(): void {
    this.showPerformance = !this.showPerformance;
  }
}
