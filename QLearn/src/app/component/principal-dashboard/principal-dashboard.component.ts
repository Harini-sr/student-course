// principal-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { NgxEchartsDirective } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart, LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsCoreOption } from 'echarts';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PrincipalServiceService } from '../../service/principal-service.service';
import { HttpClientModule } from '@angular/common/http';

echarts.use([
  BarChart,
  PieChart,
  LineChart,
  GridComponent,
  CanvasRenderer,
  TooltipComponent,
  TitleComponent,
  LegendComponent
]);

@Component({
  selector: 'app-principal-dashboard',
  standalone: true,
  imports: [NgxEchartsDirective, CommonModule, MatDialogModule, HttpClientModule],
templateUrl: './principal-dashboard.component.html',
  styleUrl: './principal-dashboard.component.css'
})
export class PrincipalDashboardComponent implements OnInit {
  chartOption!: EChartsCoreOption;
  popularCourseChart!: EChartsCoreOption;
  courseChart!: EChartsCoreOption;
  ratingChart!: EChartsCoreOption;
  completionChart!: EChartsCoreOption;

  roles: string | null = '';
  totalCourses: number = 0;
  totalInstructors: number = 0;
  totalStudents: number = 0;
  allDepartments: number = 0;

  titles: string[] = [];
  ratings: number[] = [];
  recommendedCourses: any[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private service: PrincipalServiceService
  ) {}
couName:any;
  ngOnInit(): void {
    this.roles = localStorage.getItem('role');
    console.log('User Role:', this.roles);

    this.service.getInstructor().subscribe((data: any) => {
      this.totalInstructors = data.length;
    });

    this.service.getStudents().subscribe((data: any) => {
      this.totalStudents = data.length;
    });

    this.service.getCourses().subscribe((data: any[]) => {
      this.couName = data.map(c => c.courseName);
      console.log(this.couName);
      
      this.totalCourses = data.length;
      this.ratings = data.map(c => c.rating);
      this.titles = data.map(c => c.title || 'Untitled');
      this.recommendedCourses = data.filter(c => c.rating >= 3);
      this.allDepartments = new Set(data.map(c => c.department)).size;

      // Enrollment Summary
      const courseNames = data.map(c => c.title || 'Untitled');
      const seatsData = data.map(c => c.numberOfSeats || 0);

      this.chartOption = {
        title: { text: 'Enrollment Summary by Course', left: 'center' },
        tooltip: { trigger: 'axis' },
        legend: { data: ['Seats'], top: 30 },
        xAxis: { type: 'category', data: this.couName },
        yAxis: { type: 'value' },
        series: [{
          name: 'Seats',
          type: 'line',
          data: seatsData,
          itemStyle: { color: '#5470C6' }
        }]
      };

      // Popular Course Chart (least available seats)
      const sortedBySeats = [...data].sort((a, b) => a.numberOfSeats - b.numberOfSeats);
      const topPopularCourses = sortedBySeats.slice(0, 5); // top 5 with least seats

      this.popularCourseChart = {
        title: { text: 'Most Popular Courses (Least Seats)', left: 'center' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.couName
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: 'Remaining Seats',
          type: 'line',
          data: topPopularCourses.map(c => c.numberOfSeats),
          itemStyle: { color: '#FF7043' }
        }]
      };

      // Courses per Instructor
 /*      const instructorCountMap: { [key: string]: number } = {};
      data.forEach(course => {
        const instructor = course.instructor || 'Unknown';
        instructorCountMap[instructor] = (instructorCountMap[instructor] || 0) + 1;
      });
      this.courseChart = {
        title: { text: 'Courses per Instructor', left: 'center' },
        xAxis: { type: 'category', data: Object.keys(instructorCountMap) },
        yAxis: { type: 'value' },
        series: [{
          type: 'bar',
          data: Object.values(instructorCountMap),
          itemStyle: { color: '#42A5F5' }
        }]
      };

      // Ratings per Instructor
      const instructorRatings: { [key: string]: number[] } = {};
      data.forEach(course => {
        const instructor = course.instructor || 'Unknown';
        if (!instructorRatings[instructor]) instructorRatings[instructor] = [];
        instructorRatings[instructor].push(course.rating);
      });
      const avgInstructorNames = Object.keys(instructorRatings);
      const avgRatings = avgInstructorNames.map(name => {
        const total = instructorRatings[name].reduce((a, b) => a + b, 0);
        return parseFloat((total / instructorRatings[name].length).toFixed(2));
      });

      this.ratingChart = {
        title: { text: 'Avg Ratings per Instructor', left: 'center' },
        xAxis: { type: 'category', data: avgInstructorNames },
        yAxis: { type: 'value', min: 0, max: 5 },
        series: [{
          type: 'line',
          data: avgRatings,
          smooth: true,
          itemStyle: { color: '#66BB6A' }
        }]
      }; */
    });

    // Static Completion Chart
  /*   this.completionChart = {
      title: { text: 'Course Completion Rate (%)', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { bottom: 0 },
      series: [{
        name: 'Completion Rate',
        type: 'pie',
        radius: '55%',
        data: [
          { value: 85, name: 'Alice' },
          { value: 70, name: 'Bob' },
          { value: 60, name: 'Charlie' },
          { value: 90, name: 'David' }
        ]
      }]
    }; */

    AOS.init();
  }
}
