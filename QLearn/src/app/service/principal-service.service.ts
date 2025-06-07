import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrincipalServiceService {

  constructor(private http:HttpClient) { }

  ApiUrl = 'http://localhost:3700/api/dashboard/metrics';

  getAll(){
    return this.http.get(this.ApiUrl);
  }

}
