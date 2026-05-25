import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'feature-flags-root',
  standalone: true,
  imports: [],
  templateUrl: './feature-flags.component.html',
  styleUrls: ['./feature-flags.component.scss'],
})
export class FeatureFlagsComponent {

}

