import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';

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
  currentLineIndex = 0;
  currentCharIndex = 0;
  typingSpeed = 20;

  ngOnInit(): void {
    this.typeLine();
  }

  typeLine() {
    if (this.currentLineIndex >= this.fullScript.length) {
      this.done = true;
      return;
    }

    const fullLine = this.fullScript[this.currentLineIndex];
    if(this.currentCharIndex < fullLine.length) {
      this.currentLine += fullLine[this.currentCharIndex];
      this.currentCharIndex++;
      setTimeout(() => this.typeLine(), this.typingSpeed);
    } else {
      this.displayedLines.push(this.currentLine);
      this.currentLine = '';
      this.currentCharIndex = 0;
      this.currentLineIndex++;

      setTimeout(() => this.typeLine(), this.typingSpeed * 3);
    }
  }

}
