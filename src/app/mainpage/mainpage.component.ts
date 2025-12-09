import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, Location, CommonModule } from '@angular/common';
import { ActiveSectionService } from '../services/active-section.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { AboutComponent } from '../pages/about/about.component';
import { ProjectsComponent } from '../pages/projects/projects.component';
import { ContactComponent } from '../pages/contact/contact.component';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [CommonModule, HomeComponent, AboutComponent, ProjectsComponent, ContactComponent],
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef<HTMLElement>;
  private observer?: IntersectionObserver;

  constructor(
    private active: ActiveSectionService,
    private router: Router,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // always set home as active initially before setting up observers
    this.active.setActive('home');

    // delay to ensure DOM is fully laid out
      const options = { root: null, threshold: 0.3 };
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const section = entry.target.getAttribute('data-section');
          if (entry.isIntersecting) {
            // broadcast active section
            this.active.setActive(section || 'home');
            // update URL without triggering router navigation
            try {
              this.location.replaceState('/' + (section === 'home' ? '' : section));
            } catch (e) {
              if (typeof window !== 'undefined') {
                history.replaceState({}, '', '/' + (section === 'home' ? '' : section));
              }
            }
          }
        });
      }, options);

      const sections = Array.from(this.scrollContainer.nativeElement.querySelectorAll('[data-section]'));
      sections.forEach(s => this.observer!.observe(s));

      // on initial load, if URL has a section, scroll to it (default to home)
      const path = this.router.url.replace(/^\//, '') || 'home';
      const target = this.scrollContainer.nativeElement.querySelector(`[data-section="${path}"]`);
      if (target && path !== 'home') {
        // only scroll if not home (home is naturally at the top)
        setTimeout(() => {
          (target as HTMLElement).scrollIntoView({ behavior: 'auto' });
        }, 0);
      }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
