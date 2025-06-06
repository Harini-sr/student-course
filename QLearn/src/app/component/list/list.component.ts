import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
 courseId: number = 0;
  course: any;

    constructor(private route: ActivatedRoute) {}
  // Temporary hardcoded course list (ideally should come from a service)
  courses = [
    {
        id: 1,
      title: 'Angular Frontend Development',
      instructor: 'Alice Kumar',
      category: 'Web Development',
      duration: '6 Hours',
      rating: 4.6,
      description: 'Learn Angular fundamentals, components, routing, and services.',
      videoUrl: 'https://www.youtube.com/watch?v=2OHbjep_WjQ'
    },
    {
      id: 2,
      title: 'Full Stack with MERN',
      instructor: 'Rajesh Sharma',
      category: 'Full Stack',
      duration: '10 Weeks',
      rating: 4.8,
      description: 'Master MongoDB, Express.js, React, and Node.js.'
    },
    {
      id: 3,
      title: 'Python for Beginners',
      instructor: 'Meena Thomas',
      category: 'Programming',
      duration: '6 Weeks',
      rating: 4.4,
      description: 'Start coding with Python: syntax, loops, and functions.'
    },
    {
      id: 4,
      title: 'Java Spring Boot Essentials',
      instructor: 'John David',
      category: 'Backend Development',
      duration: '9 Weeks',
      rating: 4.7,
      description: 'Learn to build RESTful APIs with Spring Boot.'
    }
  ];



  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.courseId = +idParam;
      this.course = this.courses.find(c => c.id === this.courseId);
    }
  }
}
