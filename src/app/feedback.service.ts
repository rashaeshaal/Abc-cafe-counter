import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private feedbackStats = { good: 0, average: 0, poor: 0 };

  logFeedback(orderId: string, feedback: string): void {
    if (feedback === 'Good') {
      this.feedbackStats.good++;
    } else if (feedback === 'Average') {
      this.feedbackStats.average++;
    } else if (feedback === 'Poor') {
      this.feedbackStats.poor++;
    }
    localStorage.setItem('feedbackStats', JSON.stringify(this.feedbackStats)); 
  }


  getFeedbackStats(): { good: number, average: number, poor: number } {
    const storedStats = JSON.parse(localStorage.getItem('feedbackStats') || '{}');
    return storedStats || this.feedbackStats;
  }

  
  getPerformanceMessage(): string {
    const stats = this.getFeedbackStats();
    if (stats.good > stats.average && stats.good > stats.poor) {
      return 'Great performance! Keep it up!';
    } else if (stats.average > stats.good && stats.average > stats.poor) {
      return 'Good job, but there is room for improvement.';
    } else {
      return 'Performance is low, try to improve.';
    }
  }
}
