// typing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypingService {
  displayedLines$ = new BehaviorSubject<string[]>([]);
  currentLine$ = new BehaviorSubject<string>('');

  private currentLine = '';
  private currentCharIndex = 0;
  private currentLineIndex = 0;
  private script: string[] = [];
  private typingSpeed = 20;

  typeScriptLines(script: string[], speed: number = 50): void {
    this.script = script;
    this.typingSpeed = speed;

    // reset state
    this.displayedLines$.next([]);
    this.currentLine$.next('');
    this.currentLine = '';
    this.currentCharIndex = 0;
    this.currentLineIndex = 0;

    this.typeLine();
  }

  private typeLine() {
    if (this.currentLineIndex >= this.script.length) return;

    const fullLine = this.script[this.currentLineIndex];

    if (this.currentCharIndex < fullLine.length) {
      this.currentLine += fullLine[this.currentCharIndex];
      this.currentCharIndex++;
      this.currentLine$.next(this.currentLine);

      setTimeout(() => this.typeLine(), this.typingSpeed);
    } else {
      const updatedLines = [...this.displayedLines$.value, this.currentLine];
      this.displayedLines$.next(updatedLines);

      // reset current line
      this.currentLine = '';
      this.currentCharIndex = 0;
      this.currentLineIndex++;
      this.currentLine$.next('');

      setTimeout(() => this.typeLine(), this.typingSpeed * 3);
    }
  }
}
