import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InfoResponse } from '../services/interfaces/auth.resp';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, MatSlideToggleModule, MatSidenavModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userInfo: InfoResponse = {
    "email": "",
    "isEmailConfirmed": false
  };

  constructor(private router: Router, private authService: AuthService){
    authService.getUserInfo().subscribe((res:InfoResponse) => {
      this.userInfo = res;
    });
  }

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigateByUrl('/');
  }
  
}
