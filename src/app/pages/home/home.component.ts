import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private route: Router) { }
  navigateTo(pages: string) {
    this.route.navigate([pages]);
    console.log('Navigating to Projects section');
  }
}
