import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-star-found-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  template: `
    <p-dialog header="⭐ You found a star! ⭐" [(visible)]="visible" [modal]="true" [closable]="false" [dismissableMask]="false" [style]="{width: '350px'}">
      <p>Congratulations! You discovered a new star!</p>
      <p-button label="Awesome!" (click)="onClose()"></p-button>
    </p-dialog>
  `
})
export class StarFoundDialogComponent {
  @Input() visible = false;
  @Output() closeDialog: EventEmitter<any> = new EventEmitter<any>;

  onClose() {
    this.visible = false;
    this.closeDialog.emit(true);
  }

}
