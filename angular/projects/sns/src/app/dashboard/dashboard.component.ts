import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InfoResponse } from '../services/interfaces/auth.resp';
import { ThemeService } from '../services/theme.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule, MatSlideToggleModule, MatSidenavModule, MatCardModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isLoggedIn = false;

  themeService: ThemeService = inject(ThemeService);

  constructor(private router: Router, private authService: AuthService){
    if(!this.isLoggedIn) {
      console.log('checkAccessTokenValidity: subscribed')
      authService.checkAccessTokenValidity().subscribe();
    }
    this.isLoggedIn = authService.isAuthenticated();
  }

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigateByUrl('/');
  }
  
}
