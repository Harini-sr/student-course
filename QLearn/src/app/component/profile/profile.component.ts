import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  
   profile= 'assets/images/profile.jpg';
  isLoggedIn!: boolean;
   constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

   name:any;
   email:any;
   role:any;
   
ngOnInit(){
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData); 
    this.name = user.name;
    this.role = user.role;
  }
  this.email = localStorage.getItem('email');
}

  logout() {
    this.authService.logout();       
    this.router.navigate(['/login']); 
   this.isLoggedIn = false;
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userRole'); 
  this.dialog.closeAll()
  }

}
