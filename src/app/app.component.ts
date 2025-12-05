import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [`:host { display: flex; flex-direction: column; height: 100vh; }`]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-19';
  private routerSub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('AppComponent initialized');
    this.routerSub = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      if (typeof window === 'undefined') return; // skip during server-side rendering
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        // fallback if smooth behavior not supported
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
