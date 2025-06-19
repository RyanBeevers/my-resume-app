import { asNativeElements, Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TypingService } from '../service/typing.service';
import emailjs from 'emailjs-com';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ThemeService } from '../service/theme.service';
import { StarFoundDialogComponent } from "../start-found-dialog/start-found-dialog.component";
import { StarService } from '../service/star.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ToastModule,
    TextareaModule, ButtonModule, CardModule, InputMaskModule, StarFoundDialogComponent],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  typedHeader = '';
  displayedLines: string[] = [];
  done = false;
  typedContactMeHeader = '';
  displayedContactMeLines: string[] = [];
  contactInfoDone = false;
  contactForm: UntypedFormGroup;
  isDarkMode: any;
  private headerSub?: Subscription;
  private headerLinesSub?: Subscription;
  private contactSub?: Subscription;
  private contactLinesSub?: Subscription;
  private darkModeSub?: Subscription;

  contact = {
    name: "Ryan Beevers",
    email: "beeversryan@gmail.com",
    phone: "(813) 860-4976",
    location: "Cincinnati, Ohio",
    linkedin: "https://www.linkedin.com/in/ryan-beevers/",
    github: "https://github.com/RyanBeevers",
    resume: "Download PDF"
  }
  foundStar: any;

  constructor(
    private fb: FormBuilder, 
    private typingService: TypingService, 
    private messageService: MessageService,
    private themeService: ThemeService,
    private starService: StarService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      phone: ['']
    });
  }

  ngOnInit(): void {
    this.typeContactMeSection();
    this.darkModeSub = this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  ngOnDestroy(): void {
    this.headerSub?.unsubscribe();
    this.headerLinesSub?.unsubscribe();
    this.contactSub?.unsubscribe();
    this.contactLinesSub?.unsubscribe();
    this.darkModeSub?.unsubscribe();
  }

  
  typeContactMeSection() {
    this.typingService.displayedLines$.next([]);
    this.typingService.currentLine$.next('');

    this.contactSub = this.typingService.currentLine$.subscribe(line => {
      this.typedContactMeHeader = line;
    });

    this.contactLinesSub = this.typingService.displayedLines$.subscribe(lines => {
      this.displayedContactMeLines = lines;
      if (lines.length === 1) {
        this.contactInfoDone = true;
      }
    });

    this.typingService.typeScriptLines(["my info"]);

     // After a delay, type the second section
    setTimeout(() => {
      this.contactSub?.unsubscribe();
      this.contactLinesSub?.unsubscribe();
      this.typeContactSection();
    }, 2000);
  }

  typeContactSection() {
    this.typingService.displayedLines$.next([]);
    this.typingService.currentLine$.next('');

    this.headerSub = this.typingService.currentLine$.subscribe(line => {
      this.typedHeader = line;
    });

    this.headerLinesSub = this.typingService.displayedLines$.subscribe(lines => {
      this.displayedLines = lines;
      if (lines.length === 1) {
        this.done = true;
      }
    });

    this.typingService.typeScriptLines(["let's connect"]);
   
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const { name, email, message, phone } = this.contactForm.value;

      const toMeParams = { name, email, message, phone };
      const toThemParams = { name, email, title: 'Thanks for reaching out!' };

      // Send to you
      emailjs.send('service_7217r1f', 'template_70zy4dr', toMeParams, 'C5XUp0bcAKBFqdSO3')
        .then(() => {
          // Send to them
          return emailjs.send('service_7217r1f', 'template_7s4brij', toThemParams, 'C5XUp0bcAKBFqdSO3');
        })
        .then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Message Sent',
            detail: 'Thanks for reaching out. I’ll get back to you soon!',
            life: 30000
          });
          this.contactForm.reset();
          this.foundStar = true;
          this.starService.findStar('star2');
        })
        .catch((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong. Please try again later.',
            life: 30000
          });
          console.error('Email send error:', error);
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill out all fields!',
        life: 30000
      });
    }
  }

  downloadResume() {
      const link = document.createElement('a');
      link.href = this.isDarkMode ? 'public/resume-dark.pdf' : 'public/resume-light.pdf';
      link.download = 'Ryan Beevers Resume.pdf';
      link.click();
      return;
  }

  closeFoundStarDialog(event: boolean) {
    this.foundStar = false;
  }

}
