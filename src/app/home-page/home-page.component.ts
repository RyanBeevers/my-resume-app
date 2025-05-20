import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../service/theme.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    PanelModule,
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

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
      'Built internal apps using Java, Angular, Spring Boot, and JPA. Developed REST APIs with OAuth integration (Spring Security, Okta), ' +
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
    ['Auth & Security:', 'OAuth, Spring Security, Okta, Azure App Registrations'],
    ['Tools & Platforms:', 'Postman, Hoppscotch, Pivotal Cloud Foundry, Jira, Rally, PrimeNG, Bootstrap'],
    ['Databases:', 'SQL Server, PostgreSQL, NoSQL']
  ]);
  education: any = {
    school: 'Colorado Technical University',
    degree: 'BSIT Computer Science (2018)'
  }

  @ViewChild('contentToConvert', { static: false }) contentToConvert!: ElementRef;
  isDarkMode: any;
  downloading: boolean = false;
  constructor(
    private themeService: ThemeService
  ) {
    this.jobs.push(this.job1, this.job2);
  }

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
      // You can react to dark mode changes here
    });
  }

  exportToPdf() {
    this.downloading = true;
    const container = this.contentToConvert.nativeElement;
    const pdfWrapper = container.querySelector('.pdf-wrapper');

    pdfWrapper.classList.add('pdf-export-scale');

    setTimeout(() => {
      const bgColor = window.getComputedStyle(pdfWrapper).backgroundColor || '#fff';

      html2canvas(pdfWrapper, {
        backgroundColor: bgColor,
        scale: 3,
        useCORS: true,
      }).then(canvas => {
        pdfWrapper.classList.remove('pdf-export-scale');

        const sidePadding = 10; // mm
        const imgWidth = 208 - sidePadding * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const yOffset = (297 - imgHeight) / 2 > 0 ? (297 - imgHeight) / 2 : 0;

        const contentDataURL = canvas.toDataURL('image/jpeg', 0.8);
        const pdf = new jsPDF('p', 'mm', 'a4');

        const rgb = bgColor.match(/\d+/g)?.map(Number) || [255, 255, 255];
        pdf.setFillColor(rgb[0], rgb[1], rgb[2]);
        pdf.rect(0, 0, 210, 297, 'F');

        pdf.addImage(contentDataURL, 'JPEG', sidePadding, yOffset, imgWidth, imgHeight);

        pdf.save('resume.pdf');
        this.downloading = false;
      });
    }, 50);
  }

}
