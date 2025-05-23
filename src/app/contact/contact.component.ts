import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TypingService } from '../service/typing.service';
import emailjs from 'emailjs-com';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, TextareaModule, ButtonModule, CardModule],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  typedHeader = '';
  displayedLines: string[] = [];
  done = false;
  contactForm: UntypedFormGroup;

  constructor(private fb: FormBuilder, private typingService: TypingService, private messageService: MessageService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.typingService.displayedLines$.next([]);
    this.typingService.currentLine$.next('');
    this.typingService.currentLine$.subscribe(line => {
      this.typedHeader = line;
    })

    this.typingService.displayedLines$.subscribe((lines) => {
      this.displayedLines = lines;
      if (this.displayedLines.length === 1) {
        this.done = true;
      }
    });;

    this.typingService.typeScriptLines(["let's connect"]);
  }

  // onSubmit(): void {
  //   if(this.contactForm.valid){
  //     const { name, email, message } = this.contactForm.value;

  //     // 1. Send email to YOU
  //     const toMeParams = {
  //       name,
  //       email,
  //       message
  //     };

  //     // 2. Send confirmation email to THEM
  //     const toThemParams = {
  //       name,
  //       email,
  //       title: 'Thanks for reaching out!' // You can customize this
  //     };

  //     // Send to you
  //     emailjs.send(
  //       'service_7217r1f',
  //       'template_70zy4dr',
  //       toMeParams,
  //       'C5XUp0bcAKBFqdSO3'
  //     ).then((res) => {
  //       console.log('Sent to me:', res.status);
  //     }).catch((err) => {
  //       console.error('Failed to send to me:', err);
  //     });

  //     // Send to them
  //     emailjs.send(
  //       'service_7217r1f',
  //       'template_7s4brij',
  //       toThemParams,
  //       'C5XUp0bcAKBFqdSO3'
  //     ).then((res) => {
  //       console.log('Sent to them:', res.status);
  //     }).catch((err) => {
  //       console.error('Failed to send to them:', err);
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const { name, email, message } = this.contactForm.value;

      const toMeParams = { name, email, message };
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
            life: 4000
          });
          this.contactForm.reset();
        })
        .catch((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong. Please try again later.',
            life: 4000
          });
          console.error('Email send error:', error);
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill out all fields!',
        life: 4000
      });
    }
  }


}
