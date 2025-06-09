import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ProfileComponent } from "../profile/profile.component";
import { StudentService } from '../../services/student.service';
import { Student } from '../../model/student.model';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterLinkActive, CommonModule, ProfileComponent, NgxEchartsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  roles:any;
/* ngOnInit(){
   this.roles = localStorage.getItem('role');
  console.log('User Role:', this.roles);
  
} */
  
  dropdownOpen = false;
  studentNameFirstLetter = 'J'; // Replace with actual first letter of logged-in student

  constructor(private router: Router, private studentService: StudentService) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-menu')) {
      this.dropdownOpen = false;
    }
  }

  logout() {
    // Add your logout logic here
    this.router.navigate(['/login']);
  }





   student!: Student;
    avatarUrl!: string;
  
    courseCompletionOptions: any;
    dailyLearningOptions: any;
    departmentChartOptions: any;
    topCoursesOptions: any;
 
  
    ngOnInit(): void {
         this.roles = localStorage.getItem('role');
  console.log('User Role:', this.roles);
  
    this.studentService.getStudent().subscribe({
      next: (data) => {
        if (data) {
          this.student = data;
          this.avatarUrl = this.generateAvatarUrl(this.student?.name ?? 'Student');
          this.initCharts();
        }
      },
      error: (err) => {
        console.error('Error fetching student data:', err);
      }
    });
  }
  
  generateAvatarUrl(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&size=100&rounded=true`;
  }
  
    initCharts(): void {
      const completedCourses = this.student.progress.length;
      const totalCourses = this.student.enrolledCourses.length;
  
      this.courseCompletionOptions = {
        title: { text: 'Course Completion' },
        tooltip: {},
        xAxis: { data: ['Completed', 'Remaining'] },
        yAxis: {},
        series: [{
          name: 'Courses',
          type: 'bar',
          data: [completedCourses, totalCourses - completedCourses],
          itemStyle: {
            color: (params: any) =>
              params.name === 'Completed' ? '#28a745' : '#dc3545',
          }
        }]
      };
  
      this.dailyLearningOptions = {
        title: { text: 'Daily Learning Progress', left: 'center' },
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
        yAxis: { type: 'value', max: 100 },
        series: [{
          data: [10, 30, 60, 80, 90],
          type: 'line',
          areaStyle: {},
          smooth: true
        }]
      };
  
      this.departmentChartOptions = {
        title: { text: 'Department Distribution', left: 'center' },
        series: [{
          name: 'Department',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1, name: this.student.department },
            { value: 3, name: 'Others' }
          ]
        }]
      };
  
      this.topCoursesOptions = {
        title: { text: 'My Enrolled Courses' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.student.enrolledCourses
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: this.student.enrolledCourses.map(() => Math.floor(Math.random() * 100)),
          type: 'bar',
          itemStyle: {
            color: '#007bff'
          }
        }]
      };
    }
}
