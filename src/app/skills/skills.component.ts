import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { StarService } from '../service/star.service';
import { StarFoundDialogComponent } from "../star-found-dialog/star-found-dialog.component";

interface Skill {
  name: string;
  level: string;
  category: string;
  description: string;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule, ButtonModule, BadgeModule, TooltipModule, DialogModule, CardModule, StarFoundDialogComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  animations: [
    trigger('detailAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(50%)' }))
      ])
    ])
  ]
})
export class SkillsComponent implements OnInit, OnDestroy {
  skills: Skill[] = [
    // Frontend
    { name: 'Angular', level: 'Advanced', category: 'Frontend', description: 'Built scalable, enterprise-grade SPAs using Angular 8–16 with reactive forms, RxJS, and modular design patterns.' },
    { name: 'AngularJS', level: 'Intermediate', category: 'Frontend', description: 'Migrated legacy AngularJS applications to modern Angular, improving performance and maintainability.' },
    { name: 'TypeScript', level: 'Advanced', category: 'Frontend', description: 'Used strong typing to build robust, maintainable UI components in Angular apps.' },
    { name: 'React', level: 'Beginner', category: 'Frontend', description: 'Developed UI features and dashboards using React in cloud-based internal tools.' },
    { name: 'PrimeNG', level: 'Advanced', category: 'Frontend', description: 'Designed polished UIs with PrimeNG components, enhancing user interaction and visual clarity.' },
    { name: 'Bootstrap', level: 'Advanced', category: 'Frontend', description: 'Applied responsive design principles to ensure consistency across devices.' },

    // Backend
    { name: 'Java', level: 'Advanced', category: 'Backend', description: 'Engineered RESTful APIs and microservices using Spring Boot and Java 8–20 in secure, enterprise-grade systems.' },
    { name: 'Spring Boot', level: 'Advanced', category: 'Backend', description: 'Built scalable backend services with Spring Data, Spring Security, and actuator endpoints.' },
    { name: 'JPA / Hibernate', level: 'Advanced', category: 'Backend', description: 'Designed entity relationships and optimized database interactions using JPA and Hibernate.' },
    { name: 'Node.js', level: 'Intermediate', category: 'Backend', description: 'Explored lightweight backend solutions and scripting tasks using Node.js.' },

    // Database
    { name: 'SQL Server', level: 'Advanced', category: 'Backend', description: 'Wrote performant SQL queries, stored procedures, and indexes for large-scale enterprise apps.' },
    { name: 'PostgreSQL', level: 'Intermediate', category: 'Backend', description: 'Handled schema migrations, JSONB operations, and query optimization for GCP-hosted apps.' },
    { name: 'NoSQL', level: 'Beginner', category: 'Backend', description: 'Familiar with flexible document-based data modeling in NoSQL environments.' },

    // DevOps & Cloud
    { name: 'GCP', level: 'Beginner', category: 'DevOps', description: 'Managed deployments and service accounts in GCP-hosted enterprise tools.' },
    { name: 'GitHub Actions', level: 'Intermediate', category: 'DevOps', description: 'Automated builds, tests, and deployments for Angular and Java projects.' },
    { name: 'TeamCity', level: 'Intermediate', category: 'DevOps', description: 'Configured CI/CD pipelines for full stack application deployments.' },
    { name: 'Firebase', level: 'Beginner', category: 'DevOps', description: 'Experimented with real-time database features and lightweight app hosting.' },
    { name: 'Heroku', level: 'Intermediate', category: 'DevOps', description: 'Used for quick application prototyping and hosting.' },

    // Auth & Security
    { name: 'Spring Security', level: 'Intermediate', category: 'Security', description: 'Implemented OAuth2 flows and role-based access control in secure backend services.' },
    { name: 'Okta', level: 'Intermediate', category: 'Security', description: 'Integrated SSO and secure API access using Okta for corporate identity management tools.' },
    { name: 'Azure App Registrations', level: 'Intermediate', category: 'Security', description: 'Handled secure identity integration using Azure AD and Managed Identity features.' },

    // Tools & Platforms
    { name: 'Postman / Hoppscotch', level: 'Advanced', category: 'Tooling', description: 'Extensively used for API development, testing, and debugging across projects.' },
    { name: 'Jira / Rally', level: 'Intermediate', category: 'Tooling', description: 'Participated in Agile ceremonies and tracked user stories and sprints in distributed teams.' },
    { name: 'PCF (Pivotal Cloud Foundry)', level: 'Intermediate', category: 'Platform', description: 'Handled legacy app deployments and environment configuration in PCF-based systems.' },
    { name: 'Azure', level: 'Intermediate', category: 'Platform', description: 'Deployed microservices via App Services, integrated with Managed Identity, Key Vault, and Azure SQL.' },
  ];

  displayedSkills: Skill[] = [];
  categories: string[] = ['All', 'Frontend', 'Backend', 'DevOps', 'Security', 'Tooling', 'Platform'];
  selectedCategory = 'All';
  showDialog = false;
  isMobile = window.innerWidth <= 768;
  selectedSkill: Skill | null = null;
  pendingSkill: Skill | null = null;
  showDetails = false;
  isAnimating = false;
  private animationTimeout: any;
  done = false;
  foundStar: any = false;

  constructor(private starService: StarService) { }

  @HostListener('window:resize')

  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.animateSkills();
  }

  animateSkills(): void {
    this.displayedSkills = [];
    let index = 0;
    const filtered = this.getFilteredSkills();

    const interval = setInterval(() => {
      if (index < filtered.length) {
        this.displayedSkills.push(filtered[index]);
        index++;
      } else {
        this.done = true;
        clearInterval(interval);
      }
    }, 200);
  }

  getFilteredSkills(): Skill[] {
    if (this.selectedCategory === 'All') return [...this.skills];
    return this.skills.filter(s => s.category === this.selectedCategory);
  }

  filterCategory(category: string) {
    this.selectedCategory = category;
    this.animateSkills();
  }

  getBadgeColor(cat: string): 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (cat) {
      case 'Frontend': return 'info';        // Cool blue for UI
      case 'Backend': return 'success';      // Green for reliability
      case 'DevOps': return 'warn';          // Amber for deployment flow
      case 'Security': return 'danger';      // Red for caution/alerts
      case 'Tooling': return 'contrast';     // Dark theme to imply versatility
      case 'Platform': return 'secondary';   // Neutral for infrastructure
      default: return 'secondary';
    }
  }

  selectSkill(skill: Skill) {
    if (this.isAnimating || skill === this.selectedSkill) return;
    if (skill === this.skills[3]) {
      this.starService.findStar('star3').subscribe(response => {
        if (response === `Star star3 added!`) {
          this.foundStar = true;
        }
      });
    }

    if (this.isMobile) {
      this.selectedSkill = skill;
      this.showDialog = true;
    } else {
      if (this.selectedSkill) {
        this.isAnimating = true;
        this.showDetails = false;
        this.pendingSkill = skill;

        this.animationTimeout = setTimeout(() => {
          this.selectedSkill = this.pendingSkill;
          this.pendingSkill = null;
          this.showDetails = true;
          this.isAnimating = false;
        }, 300);
      } else {
        this.selectedSkill = skill;
        this.showDetails = true;
      }
    }
  }

  ngOnDestroy() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  closeDialog() {
    this.showDialog = false;
    this.selectedSkill = null;
  }

  closeFoundStarDialog(event: boolean) {
    this.foundStar = false;
  }

}
