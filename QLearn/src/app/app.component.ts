import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProfileComponent } from './component/profile/profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
constructor(private dialog: MatDialog) {}
  email= 'studentportal@gmail.com';
  url='/assets/images/profile.jpg';

  
    profile(){
      this.dialog.open(ProfileComponent,{
      height: '400px',
      width: '400px',
      })
    }
  
}
