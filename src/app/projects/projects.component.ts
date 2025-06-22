import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { StarService } from '../service/star.service';
import { StarFoundDialogComponent } from "../star-found-dialog/star-found-dialog.component";

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
  subtitle: string,
  team: string,
  role: string,
  techstack: string[],
  details: string[]
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  imports: [CommonModule, RouterModule, CardModule, TimelineModule, AvatarModule, ButtonModule, TagModule, DialogModule, StarFoundDialogComponent]
})
export class ProjectsComponent {

  contact = {
    name: "Ryan Beevers",
    email: "beeversryan@gmail.com",
    phone: "(813) 860-4976",
    location: "Cincinnati, Ohio",
    linkedin: "https://www.linkedin.com/in/ryan-beevers/",
    github: "https://github.com/RyanBeevers",
    resume: "Download PDF"
  }

  name: string = 'Ryan Beevers';
  tagline: string = 'Full stack developer building scalable, high-performance applications with precision.\n' +
    'From backend systems to polished UI, I turn complex challenges into intuitive, impactful web solutions.\n' +
    'Clean code. Seamless experiences. Real-world results.';


  projects: Project[] = [
  {
    name: 'IAM (Identity Access Management)',
    subtitle: 'Self-service account access portal for Kroger associates',
    team: 'Corporate Information Security (CIS)',
    role: 'Full Stack Developer',
    techstack: ['Java 8', 'Spring Boot', 'Hibernate', 'JPA', 'Angular 8', 'SQL Server', 'PCF', 'REST API', 'GitHub', 'TeamCity'],
    details: [
      'Migrated legacy AngularJS frontend to Angular 8 with lazy-loaded modules, cutting load times by 30%.',
      'Refactored backend codebase from Java 7 to Java 8, improving stability and easing future maintenance.',
      'Developed secure, scalable components for password resets, account unlocks, and access role requests.',
      'Collaborated with security architects to harden the authentication layer using Spring Security and Okta.'
    ]
  },
  {
    name: 'IMT (Identity Management Tool)',
    subtitle: 'Admin dashboard for role auditing and contractor access workflows',
    team: 'Corporate Information Security (CIS)',
    role: 'Full Stack Developer',
    techstack: ['Java 8', 'Spring Boot', 'Hibernate', 'JPA', 'Angular 8', 'SQL Server', 'PCF', 'REST API', 'GitHub', 'TeamCity'],
    details: [
      'Architected and built a full-stack application from scratch to streamline associate role management.',
      'Enabled real-time auditing and discrepancy detection across departments through a dynamic role lookup tool.',
      'Redesigned and modernized legacy employee search UI to align with Kroger’s UX standards.',
      'Built contractor management workflows to support seamless onboarding, renewal, and offboarding.'
    ]
  },
  {
    name: 'FAST Alerts',
    subtitle: 'Facility monitoring system for refrigeration compliance and alerting',
    team: 'Facilities Engineering',
    role: 'Full Stack Developer',
    techstack: ['Java 8', 'Spring', 'JDBC', 'WebSphere', 'ExtJS', 'SQL Server', 'REST API', 'GitHub', 'Azure', 'TeamCity', 'GitHub Actions'],
    details: [
      'Modernized backend alert logic and front-end features to support stakeholder-requested workflows.',
      'Led cloud migration efforts from on-prem to Azure using Key Vault, Managed Identity, and RBAC.',
      'Developed real-time anomaly alerts integrated with store manager mobile devices to prevent temperature excursions.',
      'Improved food safety compliance by enabling proactive refrigeration issue resolution across warehouses.'
    ]
  },
  {
    name: 'RPM (Offers)',
    subtitle: 'Internal merchandising platform for weekly sales and promotions',
    team: 'Merchandising Experience',
    role: 'Full Stack Developer',
    techstack: ['Java 8', 'Spring Boot', 'Hibernate', 'JPA', 'Angular 8', 'SQL Server', 'PCF', 'REST API', 'GitHub', 'GitHub Actions'],
    details: [
      'Maintained and extended a merchandising platform used to manage internal and external promotions.',
      'Built UI and backend features to support pricing logic, approvals, and campaign publishing workflows.',
      'Optimized promotion data ingestion pipelines and contributed to team-wide performance tuning initiatives.'
    ]
  },
  {
    name: 'Internal Application',
    subtitle: 'Training capstone project for GitHub integration and CI/CD pipelines',
    team: 'Revature Training Program',
    role: 'Full Stack Developer Trainee',
    techstack: ['Java 8', 'Spring Boot', 'Hibernate', 'JPA', 'Angular 8', 'SQL Server', 'PCF', 'REST API', 'GitHub'],
    details: [
      'Designed and developed a full-stack application to compile and deploy training projects from GitHub repositories.',
      'Integrated CI/CD pipelines and automated deployment workflows in a cloud-hosted environment.',
      'Collaborated with a small team under mentor guidance to simulate enterprise development practices.',
      'Successfully transitioned from trainee to client-facing full-stack developer on enterprise projects.'
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
  foundStar: boolean = false;
  starAlreadyFound: boolean = false;
  githubStarAlreadyFound: boolean = false;
  pendingLink: string | null = null;
  pendingAction: 'github' | 'project' | null = null;

  constructor(private starService: StarService) { }

  showMoreDetails(project: Project) {
    this.selectedProject = project;

    // If it's the first project and we haven't checked star4 yet
    if (project === this.projects[0] && !this.starAlreadyFound) {
      this.starService.findStar('star4').subscribe(response => {
        if (response === `Star star4 added!`) {
          this.foundStar = true;
          this.pendingAction = 'project';

          // Delay showing project details until the star dialog closes
          // Save intent to show it later
          this.starAlreadyFound = true;
        } else {
          this.starAlreadyFound = true;
          this.showDialog = true; // show immediately if already found
        }
      });
    } else {
      this.showDialog = true;
    }
  }

  onStarDialogClosed() {
    this.foundStar = false;

    if (this.pendingAction === 'github') {
      this.openLink(this.contact.github);
    } else if (this.pendingAction === 'project' && this.selectedProject) {
      this.showMoreDetails(this.selectedProject);
    }

    this.pendingAction = null;
  }

  hideMoreDetails() {
    this.showDialog = false;
    this.selectedProject = null;
  }

  joinTechstack(techstack: string[]) {
    return techstack.join(', ')
  }

  openLink(link: string) {
    if (link === this.contact.github && !this.githubStarAlreadyFound) {
      this.showFoundStarGithubLink();
      return;
    }
    window.open(link, '_blank');
  }

  showFoundStarGithubLink() {
    this.starService.findStar('star5').subscribe(response => {
      if (response === `Star star5 added!`) {
        this.foundStar = true;
        this.pendingLink = this.contact.github; // wait to open until dialog closes
        this.pendingAction = 'github';

      } else {
        this.githubStarAlreadyFound = true;
        this.openLink(this.contact.github); // already found, open immediately
      }
    });
  }

}
