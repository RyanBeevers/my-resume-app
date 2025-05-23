import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import { TypingService } from '../service/typing.service';

@Component({
  selector: 'app-not-found',
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit {

  fullScript: string[] = [
    "Searching for " + window.location.pathname + '...',
    "Fetching...",
    "Analyzing Headers...",
    "404 Error: Page not found.",
    "Initializing fallback options..."
  ];
  displayedLines: string[] = [];
  done = false;
  currentLine = '';

  constructor(private typingService: TypingService) {}

  ngOnInit(): void {
    this.typingService.displayedLines$.next([]);
    this.typingService.currentLine$.next('');
    
    this.typingService.displayedLines$.subscribe((lines) => {
      this.displayedLines = lines;
      if(this.displayedLines.length === this.fullScript.length) {
        this.done = true;
      }
    });

    this.typingService.currentLine$.subscribe((line) => {
      this.currentLine = line;
    });

    this.typingService.typeScriptLines(this.fullScript);
  }

}
