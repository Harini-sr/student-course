import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProfileComponent } from './component/profile/profile.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { NavbarComponent } from "./component/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
constructor(private dialog: MatDialog, public authService: AuthService, private router: Router) {
  
}
  email= 'studentportal@gmail.com';
  url='/assets/images/profile.jpg';

role: string = '';
roles:any;
ngOnInit() {

   this.roles = localStorage.getItem('role');
  console.log('User Role:', this.roles);
  
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    this.role = user.role;
  }
}

    profile(){
   /*    this.dialog.open(ProfileComponent,{
      height: '400px',
      width: '400px',
      })  */
        this.router.navigate(['/main-page']); 
    }
  isLoginPage(): boolean {
    return this.router.url === '/main-page' || this.router.url === '/login';
  }

  login() {
    this.authService.login();
    this.router.navigate(['/principal-dashboard']); 
  }
}
