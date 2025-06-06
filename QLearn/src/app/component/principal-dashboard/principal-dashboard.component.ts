import { Component } from '@angular/core';
import * as AOS from 'aos';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsCoreOption } from 'echarts';
import { ProfileComponent } from '../profile/profile.component';
import { Router, RouterModule } from '@angular/router';
echarts.use([BarChart, GridComponent, CanvasRenderer]);

import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-principal-dashboard',
  imports: [NgxEchartsDirective, CommonModule, MatDialogModule],
  templateUrl: './principal-dashboard.component.html',
  styleUrl: './principal-dashboard.component.css'
})
export class PrincipalDashboardComponent {


    totalCourses = 25;
  totalInstructors = 10;
  totalStudents = 120;
  approvedCourses = 15;



chartOption: EChartsCoreOption = {
    title: {
      text: 'Enrollment Summary by Course',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // Use axis to trigger tooltip
        type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {
      data: ['Students'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Biology']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Students',
        type: 'bar',
        data: [120, 90, 60, 150, 70],
        itemStyle: {
          color: '#5470C6'
        }
      }
    ]
  };

   constructor(private dialog:MatDialog, private router:Router){}



 chartOptions: any;


courseChart: any;
  ratingChart: any;
  completionChart: any;

  ngOnInit() {
        AOS.init();
       this.chartOptions = {
      title: {
        text: 'Popular Courses',
        left: 'center'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['Angular', 'Node.js', 'Python', 'Java', 'React']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Enrollments',
          type: 'bar',
          data: [120, 90, 150, 70, 110],
          itemStyle: {
            color: '#4CAF50'
          }
        }
      ]
    };
    this.courseChart = {
      title: { text: 'Courses Created per Instructor', left: 'center' },
      xAxis: { type: 'category', data: ['Alice', 'Bob', 'Charlie', 'David'] },
      yAxis: { type: 'value' },
      series: [{
        type: 'bar',
        data: [5, 8, 3, 6],
        itemStyle: { color: '#42A5F5' }
      }]
    };

    this.ratingChart = {
      title: { text: 'Average Ratings per Instructor', left: 'center' },
      xAxis: { type: 'category', data: ['Alice', 'Bob', 'Charlie', 'David'] },
      yAxis: { type: 'value', min: 0, max: 5 },
      series: [{
        type: 'line',
        data: [4.5, 4.0, 3.8, 4.7],
        itemStyle: { color: '#66BB6A' },
        smooth: true
      }]
    };

    this.completionChart = {
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
    };
  }


  courses = [
  { title: 'Angular Basics', rating: 4.8, status: 'Approved',department: 'cse',  },
  { title: 'Node.js Fundamentals', rating: 4.2, status: 'Approved',  },
  { title: 'MongoDB Mastery', rating: 4.9, status: 'Approved',  },

]

// Filter recommended ones
recommendedCourses = this.courses.filter(c => c.rating >= 4.5 && c.status === 'Approved');

}
