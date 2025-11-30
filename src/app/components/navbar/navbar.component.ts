import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  mobileOpen = false;
  selectedPage: string = 'home';
  constructor(private route: Router) { }
  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  navigationPage(pages: string) {
    this.mobileOpen = false;
    this.selectedPage = pages;
    this.route.navigate([pages]);
  }
}
