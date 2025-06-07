import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean | undefined;

 login() {
  this.isLoggedIn = true;
  localStorage.setItem('isLoggedIn', 'true'); 
  
}


logout() {
  this.isLoggedIn = false;
  localStorage.removeItem('isLoggedIn'); 
  localStorage.removeItem('userRole');  
}



isAuthenticated(): boolean {
  return localStorage.getItem('isLoggedIn') === 'true';
}

}

