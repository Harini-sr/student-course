import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PrincipalServiceService } from '../../service/principal-service.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  
   profile= 'assets/images/profile.jpg';
  isLoggedIn!: boolean;
   constructor(private authService: AuthService, private router: Router, private dialog: MatDialog, private service: PrincipalServiceService) {}

   name:any;
   email:any;
   role:any;


   
ngOnInit(){
/*   const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData); 
    this.name = user.name;
    this.role = user.role;
  }
  this.email = localStorage.getItem('email'); */
 
   this.service.getLoginData().subscribe((data:any) => {
    this.name = data[0].name;
    console.log("data",data);
    
    this.email = data[0].email;  
    this.role = data[0].role;
    this.isLoggedIn = data.isLoggedIn; 
})
}

  logout() {
    /* this.authService.logout();     */   
       this.name = '';
      this.email = '';
      this.role = '';
    this.router.navigate(['/login']); 
  

  this.dialog.closeAll()
  }

}
