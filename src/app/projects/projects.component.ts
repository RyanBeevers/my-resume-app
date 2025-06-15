import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

export interface Job {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  projects: Project[];
}

export interface Project {
  name: string,
  team: string,
  role: string,
  techstack: string[],
  details: string[]
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  imports: [CommonModule, RouterModule, CardModule, TimelineModule, AvatarModule, ButtonModule, TagModule, DialogModule]
})
export class ProjectsComponent {

  name: string = 'Ryan Beevers';
  tagline: string = 'Building scalable, high-performance applications that drive impact.\n' + 
                    'From front to back, crafting seamless user experiences with precision.\n' +
                    'Turning ideas into powerful, user-centric web solutions.\n' +
                    'Elegant code. Efficient solutions. Exceptional experiences.\n' +
                    'Solving problems through technology, one optimized system at a time.';

  projects: Project[] = [
    {
      name: 'IAM (Identity Access Management)',
      team: 'CIS (Corporate Information Security)',
      role: 'Full Stack Developer',
      techstack: ['Java 8', 'Spring Boot', 'Hibernate', 'JPA', 'Angular 8', 'SQL Server', 'PCF', 'Rest API', 'Github', 'TeamCity'],
      details: [
        'Led modernization efforts by migrating from AngularJS to Angular 8, enhancing security and maintainability.',
        'Refactored legacy Java 7 backend to Java 8, improving performance and developer efficiency.',
        'Implemented Lazy Loading Modules to optimize load times, resulting in a 30% faster user experience.',
        'Developed a scalable system used by thousands of Kroger associates for password management, account unlocks, and access role requests.'
      ]
    },
    {
      name: 'IMT (Identity Management Tool)',
      team: 'CIS (Corporate Information Security)',
      role: 'Full Stack Developer',
      techstack: ['Java 8', 'Spring Boot', 'Hibernate', 'JPA', 'Angular 8', 'SQL Server', 'PCF', 'Rest API', 'Github', 'TeamCity'],
      details: [
        'Designed and developed a full-stack web application from scratch to centralize identity management.',
        'Implemented Lazy Loading for high-performance UI, reducing initial load times by 40%.',
        'Enabled managers to efficiently manage associate roles, compare discrepancies, and facilitate role requests across departments.',
        'Built a dynamic role lookup system, allowing users to search by name or description.',
        'Revamped the outdated Employee Lookup tool, improving usability and modernizing its interface.',
        'Developed a contractor management system to extend or terminate contracts seamlessly.'
      ]
    },
    {
      name: 'FAST Alerts',
      team: 'Facilities',
      role: 'Full Stack Developer',
      techstack: ['Java 8', 'Spring', 'JDBC', 'WebSphere', 'ExtJS', 'SQL Server', 'Rest API', 'Github', 'Azure', 'TeamCity', 'Github Actions'],
      details: [
        'Enhanced refrigeration monitoring system by integrating new stakeholder-requested features.',
        'Migrated on-premise infrastructure to Azure, reducing maintenance overhead and improving scalability.',
        'Built alert mechanisms using Managed Identities, Key Vaults, and RBAC roles to deliver real-time temperature anomaly notifications via mobile alerts.',
        'Empowered store and warehouse managers to proactively prevent refrigeration failures, ensuring food safety compliance.'
      ]
    },
    {
      name: 'RPM (Offers)',
      team: 'Merchandising Experience',
      role: 'Full Stack Developer',
      techstack: ['Java 8', 'Spring Boot', 'Hibernate', 'JPA', 'Angular 8', 'SQL Server', 'PCF', 'Rest API', 'Github', 'Github Actions'],
      details: [
        'Developed and maintained a core merchandising tool for managing internal and external offers, discounts, and promotions.',
        'Implemented feature enhancements that improved offer management workflows across multiple departments.',
        'Contributed to a scalable system utilized across Kroger’s merchandising teams to manage weekly sales and promotions.'
      ]
    },
    {
      name: 'Internal Application',
      team: 'Development Team',
      role: 'Full Stack Developer Trainee',
      techstack: ['Java 8', 'Spring Boot', 'Hibernate', 'JPA', 'Angular 8', 'SQL Server', 'PCF', 'Rest API', 'Github'],
      details: [
        'Completed an intensive 40-hour-per-week training program focused on industry-relevant technologies.',
        'Worked closely with a small team under the guidance of an experienced mentor to master full-stack development.',
        'Designed and developed a real-world application used by Revature employees.',
        'Built a tool that connects to GitHub, reads repositories, and compiles class projects into deployable applications for client demos.',
        'Gained hands-on experience in version control, CI/CD pipelines, and cloud deployment.',
        'Successfully transitioned from training to professional full-stack development roles in enterprise environments.'
      ]
    }

  ];

  jobs: Job[] = [
    {
      company: 'Kroger (via Infosys)',
      title: 'Full Stack Developer',
      startDate: 'Feb 2019',
      endDate: 'Present',
      location: 'Cincinnati, OH',
      description: [
        'Modernized temperature monitoring system using Azure, React, Java 20.',
        'Built scalable APIs and optimized SQL queries for high performance.',
        'Collaborated with cross-functional teams to deliver critical features.'
      ],
      projects: [this.projects[0], this.projects[1], this.projects[2], this.projects[3]]
    },
    {
      company: 'Revature',
      title: 'Java Developer Trainee',
      startDate: 'Oct 2018',
      endDate: 'Feb 2019',
      location: 'Tampa, FL',
      description: [
        'Completed intensive Java and web development training.',
        'Built small apps to reinforce object-oriented programming skills.'
      ],
      projects: [this.projects[4]]
    }
  ];

  selectedProject: Project | null = null;
  showDialog = false;

  showMoreDetails(project: Project) {
    this.showDialog = true;
    this.selectedProject = project;
  }

  hideMoreDetails() {
    this.showDialog = false;
    this.selectedProject = null;
  }

  joinTechstack(techstack: string[]) {
    return techstack.join(', ')
  }

}
