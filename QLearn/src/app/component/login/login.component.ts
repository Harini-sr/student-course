import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PrincipalServiceService } from '../../service/principal-service.service';


/* function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password')?.value;
  const confirmPass = control.get('confirmPass')?.value;
  return password === confirmPass ? null : { passwordMismatch: true };
} */
@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})



export class LoginComponent {
signUpForm!: FormGroup;

constructor(public router: Router, private authService:AuthService, private http:HttpClient, private service:PrincipalServiceService){
  this.signUpForm = new FormGroup({
    name : new FormControl("", [Validators.required,   Validators.pattern("^[a-zA-Z ]+$")]),
      email : new FormControl("", [Validators.required,   Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]),
        password : new FormControl("", [Validators.required,  Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
      role: new FormControl('', Validators.required)
        /*   confirmPass : new FormControl("", [Validators.required]), */
           /*  role : new FormControl("", [Validators.required]) */
  },/*  { validators: passwordMatchValidator } */
)
}


/* show = false;
selectRole(event:any){
   const value = event.target.value;
   if(value === 'Instructor'){
    this.show = true;
   }
   if(value === 'User'){
    this.show = false;
   }
} */

   logo = 'assets/images/logo.jpeg';
/* submit() {

if (this.signUpForm.valid) {
 localStorage.setItem('user', JSON.stringify(this.signUpForm.value));
  this.router.navigate(['/principal-dashboard']);
}

} */
submit() {
  console.log("sdhv");
  
  if (this.signUpForm.valid) {
    const data = this.signUpForm.value;

    /* http://localhost:3700/api/login */

    this.service.login(data).subscribe({
      next: (res: any) => {
        alert(res.message);
    if (res.role === 'Admin') {
          this.router.navigate(['/principal-dashboard']);
          
        } else if (res.role === 'Student') {
          this.router.navigate(['/dashboard']);
        } 
         localStorage.setItem('role', res.role);
           localStorage.setItem('name', this.signUpForm.value.name);
        localStorage.setItem('email', this.signUpForm.value.email);
           this.router.navigate(['/principal-dashboard']);
      },
      error: err => {
        alert(err.error.message);
      }
    });
  }
}

  

}
