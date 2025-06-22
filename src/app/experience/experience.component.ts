// experience.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

interface Job {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  imports: [CommonModule, CardModule]
})
export class ExperienceComponent {
  jobs: Job[] = [
    {
      company: 'Kroger (via Infosys)',
      title: 'Full Stack Developer',
      startDate: 'Feb 2019',
      endDate: 'Present',
      location: 'Cincinnati, OH',
      description: [
        'Architected and deployed scalable full-stack applications supporting thousands of internal users across security, facilities, and merchandising domains.',
        'Delivered key initiatives including modernizing identity access systems, migrating legacy Java/Angular apps to modern stacks, and building feature-rich dashboards for internal tools.',
        'Drove cloud adoption by leading migrations from PCF to Azure and GCP, incorporating RBAC, Key Vaults, and CI/CD automation with GitHub Actions and TeamCity.',
        'Collaborated cross-functionally with stakeholders to deliver robust RESTful APIs, optimized SQL queries, and UI enhancements that improved platform performance by over 30%.',
        'Mentored junior developers and contributed to knowledge sharing across engineering teams to support large-scale modernization efforts.'
      ],
    },
    {
      company: 'Revature',
      title: 'Java Developer Trainee',
      startDate: 'Oct 2018',
      endDate: 'Feb 2019',
      location: 'Tampa, FL',
      description: [
        'Completed an intensive 12-week training program with a focus on full-stack Java development using Spring Boot, Angular, and SQL Server.',
        'Built an internal GitHub integration app from concept to deployment, gaining practical experience with version control, cloud platforms, and CI/CD workflows.',
        'Strengthened object-oriented design principles and API development by working on client-facing mock applications under the guidance of senior engineers.'
      ],
    }
  ];
}
