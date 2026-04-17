import { Component, Input } from '@angular/core';


@Component({
  selector: 'ui-a4-doc',
  standalone: true,
  imports: [],
  templateUrl: './a4-doc.component.html',
  styleUrls: ['./a4-doc.component.scss'],
})
export class A4DocComponent {
  @Input() docType: string = '';
}
