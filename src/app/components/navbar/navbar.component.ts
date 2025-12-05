import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActiveSectionService } from '../../services/active-section.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  mobileOpen = false;
  selectedPage: string = 'home';
  private routerSub?: Subscription;
  private activeSub?: Subscription;

  constructor(private route: Router, private activeService: ActiveSectionService) {
    this.activeSub = this.activeService.active$.subscribe(s => this.selectedPage = s || 'home');
  }

  ngOnInit(): void {
    this.routerSub = this.route.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      const url = e.urlAfterRedirects || e.url || '';
      const page = url.replace(/^\//, '') || 'home';
      this.selectedPage = page;
    });
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  navigationPage(pages: string) {
    this.mobileOpen = false;
    this.selectedPage = pages;
    // scroll to the section element instead of navigating
    if (typeof window !== 'undefined') {
      const target = document.querySelector(`[data-section="${pages}"]`) as HTMLElement;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.activeSub?.unsubscribe();
  }
}
