import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  // Track which projects are expanded
  expandedProjects: { [key: number]: boolean } = {
    0: false,
    1: false
  };

  toggleDescription(projectIndex: number): void {
    this.expandedProjects[projectIndex] = !this.expandedProjects[projectIndex];
  }

  isExpanded(projectIndex: number): boolean {
    return this.expandedProjects[projectIndex] || false;
  }
}
