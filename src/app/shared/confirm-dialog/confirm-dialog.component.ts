import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

declare var bootstrap: any;

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  @ViewChild('confirmModal', { static: true }) modalElement!: ElementRef;
  @Output() confirmed = new EventEmitter<void>();

  title: string = '';
  message: string = '';

  private modal: any;

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      import('bootstrap').then(({ Modal }) => {
        this.modal = new Modal(this.modalElement.nativeElement);
      });
    }
  }

  open(title: string, message: string): void {
    this.title = title;
    this.message = message;
    this.modal.show();
  }

  confirm(): void {
    this.modal.hide();
    this.confirmed.emit();
  }
}
