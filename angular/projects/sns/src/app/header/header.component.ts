import { Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  themeService: ThemeService = inject(ThemeService);
  constructor() { }  

  toggleDarkTheme() {
    this.themeService.toggleTheme();
  }
}