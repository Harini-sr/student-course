import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
@Component({
  selector: 'app-course',
  imports: [CommonModule, RouterLink, RouterModule, RouterOutlet],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
courses = [
    {
      id:1,
      title: 'Angular Frontend Development',
      instructor: 'Alice Kumar',
      category: 'Web Development',
      duration: '8 Weeks',
      rating: 4.6
    },
    {
      id:2,
      title: 'Full Stack with MERN',
      instructor: 'Rajesh Sharma',
      category: 'Full Stack',
      duration: '10 Weeks',
      rating: 4.8
    },
    {
      id:3,
      title: 'Python for Beginners',
      instructor: 'Meena Thomas',
      category: 'Programming',
      duration: '6 Weeks',
      rating: 4.4
    },
    {
      id:4,
      title: 'Java Spring Boot Essentials',
      instructor: 'John David',
      category: 'Backend Development',
      duration: '9 Weeks',
      rating: 4.7
    }
  ];

  ngOnInit(): void {
    AOS.init();
  }




  
  
}
