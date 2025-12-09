import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
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
  isMobile = false;
  private routerSub?: Subscription;
  private activeSub?: Subscription;
  private resizeListener?: () => void;

  constructor(
    private route: Router,
    private activeService: ActiveSectionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.activeSub = this.activeService.active$.subscribe(s => this.selectedPage = s || 'home');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobileView();
      this.resizeListener = () => this.checkMobileView();
      window.addEventListener('resize', this.resizeListener);
    }

    this.routerSub = this.route.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      const url = e.urlAfterRedirects || e.url || '';
      const page = url.replace(/^\//, '') || 'home';
      this.selectedPage = page;
    });
  }

  private checkMobileView(): void {
    this.isMobile = window.innerWidth <= 800;
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
        // For mobile, ensure navbar stays visible by scrolling to top first
        if (this.isMobile) {
          window.scrollTo({ top: 0, behavior: 'auto' });
          // Then scroll to target after a brief delay
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.activeSub?.unsubscribe();
    if (isPlatformBrowser(this.platformId) && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }
}
