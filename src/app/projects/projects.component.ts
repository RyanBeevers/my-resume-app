import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  template: `
    <div class="projects-container">
      <h2>Projects</h2>
      <p>Portfolio coming soon. Stay tuned!</p>
    </div>
  `,
  styles: [`
    .projects-container {
      max-width: 700px;
      margin: 2rem auto;
      text-align: center;
      color: var(--text, #eee);
    }
  `]
})
export class ProjectsComponent {}
