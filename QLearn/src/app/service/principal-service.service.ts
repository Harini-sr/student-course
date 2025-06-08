import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrincipalServiceService {

  constructor(private http:HttpClient) { }

/*   ApiUrl = 'http://localhost:3700/api/dashboard/metrics'; */
ApiUrl = 'https://backend-0x10.onrender.com/api/dashboard/metrics'; 

  getAll(){
    return this.http.get(this.ApiUrl);
  }

}
