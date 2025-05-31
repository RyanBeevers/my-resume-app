import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';


interface Skill {
  name: string;
  level: string;
  category: string;
  description: string;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule, ButtonModule, BadgeModule, TooltipModule, DialogModule, CardModule],
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
    { name: 'Angular', level: 'Advanced', category: 'Frontend', description: 'Built enterprise SPAs using Angular.' },
    { name: 'Java', level: 'Advanced', category: 'Backend', description: 'Developed backend services with Spring Boot.' },
    { name: 'TypeScript', level: 'Advanced', category: 'Frontend', description: 'Typed JavaScript for large-scale apps.' },
    { name: 'PostgreSQL', level: 'Intermediate', category: 'Backend', description: 'Created complex queries and optimizations.' },
    { name: 'Azure', level: 'Intermediate', category: 'DevOps', description: 'Deployed microservices and monitored uptime.' },
    { name: 'PrimeNG', level: 'Advanced', category: 'Frontend', description: 'Used extensively for UI component building.' },
  ];

  displayedSkills: Skill[] = [];
  categories: string[] = ['All', 'Frontend', 'Backend', 'DevOps'];
  selectedCategory = 'All';
  showDialog = false;
  isMobile = window.innerWidth <= 768;
  selectedSkill: Skill | null = null;
  pendingSkill: Skill | null = null;
  showDetails = false;
  isAnimating = false;
  private animationTimeout: any;

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
      case 'Frontend': return 'info';
      case 'Backend': return 'success';
      case 'DevOps': return 'warn';
      default: return 'secondary';
    }
  }

  selectSkill(skill: Skill) {
    if (this.isAnimating || skill === this.selectedSkill) return;

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

}
