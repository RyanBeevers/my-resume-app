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
        'Modernized temperature monitoring system using Azure, React, Java 20.',
        'Built scalable APIs and optimized SQL queries for high performance.',
        'Collaborated with cross-functional teams to deliver critical features.'
      ]
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
      ]
    }
  ];
}
