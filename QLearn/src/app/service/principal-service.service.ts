import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrincipalServiceService {

  constructor(private http:HttpClient) { }

/*   ApiUrl = 'http://localhost:3700/api/dashboard/metrics'; */
ApiUrl = 'https://backend-0x10.onrender.com/api/dashboard/metrics'; 

loginUrl = 'https://backend-0x10.onrender.com/api/login';

loginGetUrl = 'http://localhost:3700/api/users';

  getAll(){
    return this.http.get(this.ApiUrl);
  }
   
  login(data:any){
    return this.http.post(this.loginUrl, data);
  }
  getLoginData(){
    return this.http.get(this.loginGetUrl);
  }
}
