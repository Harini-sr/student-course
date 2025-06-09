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

loginGetUrl = 'https://backend-0x10.onrender.com/api/users';   /* http://localhost:3700/api/users */
insUrl = 'http://localhost:3700/instructors';
 private baseUrl = 'http://localhost:3700/api/courses';

  getAll(){
    return this.http.get(this.ApiUrl);
  }
   
  login(data:any){
    return this.http.post(this.loginUrl, data);
  }
  getLoginData(){
    return this.http.get(this.loginGetUrl);
  }
  getInstructor(){
    return this.http.get(this.insUrl)
  }
  /* all course */
    getCourses() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getCourse(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addCourse(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  updateCourse(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteCourse(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
