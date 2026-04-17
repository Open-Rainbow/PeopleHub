
import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';


@Component({
    selector: 'ui-notice-banner',
  standalone: true,
    imports: [IconComponent],
    templateUrl: './notice-banner.html',
  styleUrls: ['./notice-banner.scss']
})
export class NoticeBannerComponent {
  @Input() heading: string = 'Important: ';
  @Input() content: string =
    'Changes to leave policies will apply to all employees from the next calendar year. Current year balances will remain unchanged.';
  @Input() headingColor: string = '#1E3A8A'; 
  @Input() contentColor: string = '#374151';
  @Input() contentInNextLine: boolean = false;
  @Input() bannerColor: string = '#DBEAFE'; 
  @Input() highlighterColor: string = '#1E3A8A'; 
  @Input() showIcon: boolean = true;
  @Input() iconColor: string = '#1E3A8A';
  @Input() showBorder: boolean = false;

}
