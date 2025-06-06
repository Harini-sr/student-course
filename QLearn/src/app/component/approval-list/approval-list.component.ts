import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-approval-list',
  imports: [CommonModule],
  templateUrl: './approval-list.component.html',
  styleUrl: './approval-list.component.css'
})
export class ApprovalListComponent {
   course = {
    title: 'Advanced Database Systems',
    status: 'Pending', // 'Approved' or 'Pending'
    code: 'CS402',
    department: 'Computer Science',
    priority: 'Normal',
    credits: 4,
    submitted: '2024-05-28',
    reviewed: '2024-05-30',
    daysAgo: 374,
    reviewMessage: 'Course submission received. Under review by academic committee.'
  };

  approveCourse() {
    this.course.status = 'Approved';
    this.course.reviewMessage = 'Course approved by academic committee.';
  }
}
