import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PrincipalDashboardComponent } from './component/principal-dashboard/principal-dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { TrainersComponent } from './component/trainers/trainers.component';
import { CourseComponent } from './component/course/course.component';
import { ListComponent } from './component/list/list.component';
import { ApprovalListComponent } from './component/approval-list/approval-list.component';
import { authGuard } from './auth.guard';
import { MainPageComponent } from './component/main-page/main-page.component';
import { CoursesComponent } from './component/courses/courses.component';
import { CourseDetailComponent } from './component/course-detail/course-detail.component';
import { MyLearningComponent } from './component/mylearning/mylearning.component';
import { StudentDetailComponent } from './component/student-detail/student-detail.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'main-page', component: MainPageComponent }, 
  { path: '', redirectTo: '/main-page', pathMatch: 'full' },
     {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'principal-dashboard',
        component: PrincipalDashboardComponent
    },
    {
        path: 'profile',
        component: ProfileComponent, 
    },
    {
        path: 'trainers',
        component: TrainersComponent,
    },
    {
        path: 'course',
        component:CourseComponent,
    },
    {
        path: 'list/:id',
        component: ListComponent,
    },
    {
        path: 'approval-list',
        component: ApprovalListComponent,
    },
      { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'mylearning', component: MyLearningComponent },
  { path: 'student-detail', component: StudentDetailComponent},
  {
    path:'dashboard', component: DashboardComponent
  }
  
];
