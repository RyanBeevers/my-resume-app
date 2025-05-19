import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    PanelModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  name: string = 'Ryan Beevers';
  title: string = '(Full Stack Developer – Java / Angular / SQL Specialist)';
  summary1: string = 'I\'m a passionate full stack developer who thrives on solving tough technical challenges. ' +
    'With over six years of experience working across multiple departments in a Fortune 100 environment, ' +
    'I’ve modernized legacy systems, built applications from scratch, and helped drive secure, scalable, ' +
    'cloud-based solutions. I take pride in my ability to quickly understand new tools, adapt to evolving ' +
    'tech stacks, and deliver clean, maintainable code.';
  summary2: string = 'Currently looking to transition from a contract position to a full-time role where I can continue\n' +
    'solving meaningful problems, contribute to impactful projects, and grow with a team that values ownership and innovation.';
  jobs: any[] = [];
  job1: any = {
    jobTitle: 'Full Stack Developer – Infosys @ Kroger',
      jobDates: 'Feb 2019 – Present',
      jobDescription: 'Contributed to enterprise-wide application modernization across security, facilities, and merchandising teams. ' +
    'Migrated systems from AngularJS to Angular, Java 7 to Java 8+, PCF to GCP, and SQL Server to PostgreSQL. ' +
    'Built internal apps using Java, Angular, Spring Boot, and JPA. Developed REST APIs with OAuth integration (Okta), ' +
    'implemented unit testing, and managed cloud deployments using GitHub Actions, TeamCity, Firebase, and GCP.'
  }
  job2: any = {
    jobTitle: 'Java Developer – Revature',
    jobDates: 'Oct 2018 – Feb 2019',
    jobDescription: 'Completed intensive training on enterprise technologies including Java, Spring, SQL, Git, and web development. ' +
      'Worked on full stack applications while preparing for placement with enterprise clients.'
  }
  skillsMap: Map<any, string> = new Map([
    ['Languages & Frameworks:', 'Java, JavaScript, TypeScript, Angular, AngularJS, React, Spring, Hibernate, JPA, Node.js, Maven, SQL, HTML, CSS'],
    ['Cloud & DevOps:', 'Azure (App Services, Managed Identity, Blob Storage, Azure SQL), GCP (App Hosting, Service Accounts), Firebase, Heroku, GitHub Actions, TeamCity'],
    ['Auth & Security:', 'OAuth, Okta, Azure App Registrations'],
    ['Tools & Platforms:', 'Postman, Hoppscotch, Pivotal Cloud Foundry, Jira, Rally, PrimeNG, Bootstrap'],
    ['Databases:', 'SQL Server, PostgreSQL, NoSQL']
  ]);
  education: string = 'Colorado Technical University — BSIT Computer Science (2018)';

  @ViewChild('contentToConvert') contentToConvert!: ElementRef;

  constructor() {
    this.jobs.push(this.job1, this.job2)
  }

  exportToPdf() {
    const data = this.contentToConvert.nativeElement;
    html2canvas(data).then(canvas => {
      const imgWidth = 208;  // A4 width in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('my-component.pdf'); // Generated PDF
    });
  }



}
