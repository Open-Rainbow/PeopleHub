import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'documents-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      documents works!
    </p>
  `,
  styles: ``
})
export class DocumentsComponent {

}

