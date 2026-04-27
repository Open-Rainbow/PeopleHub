import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'recruitment-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      recruitment works!
    </p>
  `,
  styles: ``
})
export class RecruitmentComponent {

}

