import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InfoResponse } from '../services/interfaces/auth.resp';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService){

    if(this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
      this.isLoggedIn=true;
    }
  }
}
