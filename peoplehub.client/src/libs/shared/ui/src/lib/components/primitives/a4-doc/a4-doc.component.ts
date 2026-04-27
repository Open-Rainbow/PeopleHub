import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-a4-doc',
  standalone: true,
  imports: [],
  templateUrl: './a4-doc.component.html',
  styleUrls: ['./a4-doc.component.scss'],
})
export class A4DocComponent {
  @Input() docType: string = '';
}
