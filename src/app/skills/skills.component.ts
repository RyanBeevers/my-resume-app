import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: string;
  category: string;
  description: string;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule, ButtonModule, BadgeModule, TooltipModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {

  skills: Skill[] = [
    { name: 'Angular', level: 'Advanced', category: 'Frontend', description: 'Reactive SPA framework' },
    { name: 'Java', level: 'Advanced', category: 'Backend', description: 'Strong OOP backend language' },
    { name: 'TypeScript', level: 'Advanced', category: 'Frontend', description: 'Typed superset of JS' },
    { name: 'PostgreSQL', level: 'Intermediate', category: 'Backend', description: 'SQL DB' },
    { name: 'Azure', level: 'Intermediate', category: 'DevOps', description: 'Cloud infrastructure' },
    { name: 'Bootstrap', level: 'Advanced', category: 'Frontend', description: 'CSS framework' },
    { name: 'PrimeNG', level: 'Advanced', category: 'Frontend', description: 'Component UI toolkit' },
    // Add more!
  ];

  displayedSkills: Skill[] = [];
  categories: string[] = ['All', 'Frontend', 'Backend', 'DevOps'];
  selectedCategory = 'All';

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
    }, 300);
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


}
