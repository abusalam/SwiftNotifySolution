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

  constructor(private router: Router, private authService: AuthService){
    authService.getUserInfo().subscribe((res:InfoResponse) => {
      if(this.authService.isAuthenticated()) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }
}
