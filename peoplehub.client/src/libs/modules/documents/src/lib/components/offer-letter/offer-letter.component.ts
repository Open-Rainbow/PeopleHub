import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextButtonComponent } from 'ui';

@Component({
  selector: 'offer-letter-root',
  standalone: true,
  imports: [CommonModule, TextButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './offer-letter.component.html',
})
export class OfferLetterComponent {}


