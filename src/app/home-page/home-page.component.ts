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
  contact = {
    email: 'beeversryan@gmail.com',
    phone: '(813) 860-4976',
    website: 'https://ryanbeevers.github.io/my-resume-app/',
    linkedin: "https://www.linkedin.com/in/ryan-beevers/",
    github: "https://github.com/RyanBeevers",
  };
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
    jobTitle: 'Full Stack Developer – Revature',
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
    });
  }


  exportToPdf() {
    this.downloading = true;
    const isSmallScreen = window.innerWidth <= 768;
    if (isSmallScreen) {
      // Static download for smaller screens
      const link = document.createElement('a');
      link.href = this.isDarkMode ? 'resume-dark.pdf' : 'resume-light.pdf';
      link.download = 'Ryan Beevers Resume.pdf';
      link.click();
      this.downloading = false;
      return;
    }
    
    const pdfWrapper = this.contentToConvert.nativeElement;
    const bgColor = this.isDarkMode ? '#121212' : '#ffffff';

    html2canvas(pdfWrapper, {
      scale: 4,
      backgroundColor: bgColor,
      useCORS: true,
    }).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = 210;
      const pageHeight = 297;
      const sidePadding = 5;  // Reduce padding to get bigger content

      // Calculate image width and height to fit the page width minus padding
      const imgWidth = pageWidth - sidePadding * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Calculate Y offset to center the image vertically if smaller than page
      const yOffset = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      // Set background fill color for whole page
      const rgb = bgColor.match(/\d+/g)?.map(Number) || [255, 255, 255];
      pdf.setFillColor(rgb[0], rgb[1], rgb[2]);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Add the image at (sidePadding, yOffset) with calculated size
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
      // Load correct QR code based on theme
      const qrImagePath = this.isDarkMode
        ? 'qr-code-dark.png'
        : 'qr-code-light.png';

      const qrSize = 25; // in mm
      const qrX = pageWidth - qrSize - 10; // 5mm from right edge
      const qrY = 10; // 5mm from top

      const qrImg = new Image();
      qrImg.src = qrImagePath;

      qrImg.onload = () => {
        const canvasQr = document.createElement('canvas');
        canvasQr.width = qrImg.width;
        canvasQr.height = qrImg.height;
        const ctx = canvasQr.getContext('2d');
        if (ctx) {
          ctx.drawImage(qrImg, 0, 0);
          const qrDataUrl = canvasQr.toDataURL('image/png');
          pdf.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
        }

        pdf.save('Ryan Beevers Resume.pdf');
        this.downloading = false;
      };

      qrImg.onerror = () => {
        console.error('QR image failed to load.');
        pdf.save('Ryan Beevers Resume.pdf');
        this.downloading = false;
      };
    });
  }


}
