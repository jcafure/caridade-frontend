import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from './shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'caridade-frontend';

  constructor(private router: Router) {
    
  }

  shouldShowLayout(): boolean {
    const hiddenPrefixes = ['/login', '/register', '/doador'];
    return !hiddenPrefixes.some(prefix => this.router.url.startsWith(prefix));
  }
}
