import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ConfirmPopup } from '../../../models/confirm-popup.model';
import { ConfirmPopupService } from '../../../services/confirm-popup.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-caller',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="display: flex; gap: 10px; padding: 20px; border: 1px solid #ccc;">
      <button (click)="triggerOk()">Show OK</button>
      <button (click)="triggerConfirm()">Show Confirm</button>
      <button (click)="triggerMaybe()">Show Maybe</button>
      <button (click)="triggerCustom()">Show Custom</button>
    </div>
    `,
  styles: ['button { padding: 10px 15px; cursor: pointer; }']
})
export class CallerComponent implements OnInit {

  constructor(private popupService: ConfirmPopupService) {}
  ngOnInit(): void {
  }

  triggerOk() {
    this.popupService.showOk(
      'Action Complete', 
      'The requested action was successfully executed.',
      'âœ…'
    ).subscribe((result: string) => {
      console.log('OK Alert Closed. Result:', result);
    });
  }

  triggerConfirm() {
    this.popupService.showConfirm(
      'Delete Item', 
      'Are you sure you want to delete this **record**?',
      'âš ï¸',
      'orange'
    ).subscribe((result: string) => {
      console.log('Confirm Closed. Result:', result);
    });
  }

  triggerMaybe() {
    this.popupService.showMaybe(
      'Uncertain Action', 
      'Are you sure about this change? What if you are unsure?'
    ).subscribe((result: string) => {
      console.log('Maybe Closed. Result:', result);
    });
  }

  triggerCustom() {
    const customButtons: ConfirmPopup[] = [
      { text: 'Save', value: 'Saved', bgColor: '#38761d', color: 'white', hoverBgColor: '#6aa84f', hoverColor: 'white', borderColor: '#38761d', showBorder: true },
      { text: 'Discard', value: 'Discarded', bgColor: '#cc0000', color: 'white', hoverBgColor: '#e06666', hoverColor: 'white', borderColor: '#cc0000', showBorder: true },
    ];
    
    this.popupService.showCustomButtons(
      'Unsaved Data', 
      'You have unsaved changes.',
      customButtons
    ).subscribe((result: string) => {
      console.log('Custom Closed. Result:', result);
    });
  }
}