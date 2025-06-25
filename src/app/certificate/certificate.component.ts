import { Component, EventEmitter, Output, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [DialogModule, ButtonModule, CommonModule],
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent {
  @Input() visible: boolean = false;
  @Input() completedAt?: Date | undefined;
  @Output() close = new EventEmitter<void>();
  currentDate = new Date().toLocaleDateString();
  username: string;

  constructor() {
    this.username = localStorage.getItem('username') || 'Guest';
  }

  onClose() {
    this.close.emit();
  }

  exportCertificate() {
    this.username = localStorage.getItem('username') || 'Guest';
    const el = document.getElementById('certificate-export');
    if (!el) return;

    // Temporarily show
    el.classList.remove('hidden-export');

    setTimeout(() => {
      html2pdf().from(el).set({
        filename: 'certificate.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
      }).save().then(() => {
        el.classList.add('hidden-export');
      });
    }, 100);
  }

  
}
