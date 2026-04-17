import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ConfirmPopup, PopupOptions } from '../../../models/confirm-popup.model';
import { ConfirmPopupService } from '../../../services/confirm-popup.service';
import { ButtonComponent } from '../../controls/button/button.component';

@Component({
  selector: 'ui-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonComponent],
})
export class ConfirmPopupComponent implements OnInit, OnDestroy {
  title: string = '';
  changeIcon: string = '';
  borderColor: string = 'red';
  data: ConfirmPopup[] = [];
 
  showPopup: boolean = false;
  isClosing = false;
  safeLabel: SafeHtml = '';
  private popupSubscription!: Subscription;
 
  private _label: string = '';
 
  constructor(
    private sanitizer: DomSanitizer,
    private popupService: ConfirmPopupService
  ) {}
 
  ngOnInit(): void {
    this.popupSubscription = this.popupService.showPopup$.subscribe((options: PopupOptions | null) => {
      if (options) {
        this.title = options.title;
        this.changeIcon = options.changeIcon || '';
        this.borderColor = options.borderColor || 'red';
        this.data = options.buttons;
        this.label = options.label;
 
        this.isClosing = false;
        this.showPopup = true;
      } else {
        this.showPopup = false;
      }
    });
  }
 
  set label(value: string) {
    this._label = value;
    this.safeLabel = this.sanitizer.bypassSecurityTrustHtml(value);
  }
 
  handleButtonClick(buttonValue: string) {
    this.popupService.buttonClicked(buttonValue);
    this.closePopup();
  }
 
  closePopup() {
    this.isClosing = true;
    setTimeout(() => {
      this.showPopup = false;
      this.isClosing = false;
      this.popupService.hide();
    }, 300);
  }
 
  @HostListener('document:keydown.enter', ['$event'])
handleEnterKey(event: Event) {
  if (!this.showPopup || this.isClosing) return;
  const okButton = this.data?.[0];
  if (okButton) {
    event.preventDefault();
    this.handleButtonClick(okButton.value);
  }
}
 
 
  ngOnDestroy(): void {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }
}